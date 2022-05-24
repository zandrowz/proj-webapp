import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Base, Typography } from "../styles";
import * as Location from 'expo-location';

import Delay from '../interfaces/Delay';
import Station from '../interfaces/Station';

import MapView from 'react-native-maps';
import { Circle, Marker } from "react-native-maps";

import getCoordinates from "../models/nominatim";

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
        const metersPerMinute = Math.abs((newTime.getTime() - oldTime.getTime()) / 1000 / 60);

    setCircleMarker(<Circle
        center={{
            latitude: parseFloat(circleCoordsCenter[1]),
            longitude: parseFloat(circleCoordsCenter[0])
        }}
        fillColor="#fed42855"
        strokeColor="#fed42855"
        radius={ metersPerMinute * 45 }
        />);
    }

    
    let list = delays
    .filter(delay => delay.hasOwnProperty("FromLocation"))
    .map((train, index) => {
        let stationName = stations.filter(station => station.LocationSignature === train.FromLocation[0].LocationName);

        const results = getCoordinates(stationName[0].Geometry.WGS84);

        return (<Marker
            coordinate={{ 
            latitude: parseFloat(results[1]), 
            longitude: parseFloat(results[0]) 
        }}
        key = {index}
        title={ stationName[0].AdvertisedLocationName }
        pinColor="red"
        description = { "Avgång: " + train.AdvertisedTimeAtLocation.slice(11,16) +
            " Ny tid: " + train.EstimatedTimeAtLocation.slice(11,16) }
            onPress={() => 
                drawCircle(train.AdvertisedTimeAtLocation, train.EstimatedTimeAtLocation, results)}
        />
        );
    })

    return (
        <View style={styles.container}>
        <Text style={Typography.header3}>Försenade tåg</Text>
        <Text style={Typography.normal}>Den blå markern visar din position.</Text>
        {/* {list} */}
            {/* <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 8,
                        longitudeDelta: 10,
                    }}>
                    {list}
                </MapView> */}
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
