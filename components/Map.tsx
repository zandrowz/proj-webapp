import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Base, Typography } from "../styles";
import * as Location from 'expo-location';

// import Delay from '../interfaces/Delay';
// import Station from '../interfaces/Station';

import MapView from 'react-native-maps';
import { Circle, Marker } from "react-native-maps";
import { base } from "../styles/base";


export default function Map({ delays, stations }) {
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [circleMarker, setCircleMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
    
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    function drawCircle(advertised, estimated, circleCoordsCenter) {
        const oldTime = new Date(advertised);
        const newTime = new Date(estimated);
        const calculatedTime = newTime.getTime() - oldTime.getTime();
        //console.log(calculatedTime)
        const delayedTime = Math.floor(calculatedTime / 1000 / 60);
        //console.log(delayedTime)

    setCircleMarker(<Circle
        center={{
            latitude: parseFloat(circleCoordsCenter[1]),
            longitude: parseFloat(circleCoordsCenter[0])
        }}
        fillColor="#fed42855"
        strokeColor="#fed42855"
        radius={ delayedTime * 45 }
        />);
    }

    function getCoordinates(coordinates: string) {
        let myCoordinates = coordinates.split(" ")
        for (let i = 0; i < myCoordinates.length; i++) {
            myCoordinates[i] = myCoordinates[i].replace(/[^\d.-]/g, '');
        }
        return [myCoordinates[1], myCoordinates[2]]
    };

    const list = delays
    .filter(delay => delay.hasOwnProperty("FromLocation"))
    .map((delayedTrain, index) => {
        let stationName = stations.filter(station => station.LocationSignature === delayedTrain.FromLocation[0].LocationName);

        const results = getCoordinates(stationName[0].Geometry.WGS84);

        return (<Marker
            coordinate={{ 
            latitude: parseFloat(results[1]), 
            longitude: parseFloat(results[0]) 
        }}
        key = {index}
        title={ stationName[0].AdvertisedLocationName }
        pinColor="red"
        description = { " Tåg: " + delayedTrain.AdvertisedTrainIdent + 
            " Avgång: " + delayedTrain.AdvertisedTimeAtLocation.slice(11,16) +
            " Ny tid: " + delayedTrain.EstimatedTimeAtLocation.slice(11,16) }
            onPress={() => 
                drawCircle(delayedTrain.AdvertisedTimeAtLocation, delayedTrain.EstimatedTimeAtLocation, results)}
        />
        );
    })

    return (
        <View style={Base.base}>
        <Text style={Typography.headerDelays}>Försenade tåg</Text>
        <Text style={Typography.normalDelays}>Röd marker: försenade tåg. {"\n"}
        Blå marker: din position. {"\n"}{"\n"}
        Tryck på en röd marker för att se det område du hinner utforska innan tåget avgår.</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 8,
                        longitudeDelta: 10,
                    }}>
                    {list}
                </MapView>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 8,
                        longitudeDelta: 10,
                    }}>
                    {list}
                    {locationMarker}
                    {circleMarker}
                </MapView>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
