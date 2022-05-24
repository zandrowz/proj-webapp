import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import trainModel from "../models/train";

import { Base, Typography } from '../styles';

export default function DelaysList({ route, navigation, setDelays, delays, stations }) {

    // const { reload } = route.params || false;
    // const [delaysList, setDelaysLists] = useState([]);

    // if (reload) {
    //     reloadProducts();
    //     route.params = false;
    // }

    // async function reloadProducts() {
    //     setDelaysLists(await trainModel.getDelays());
    // }

    // useEffect(() => {
    //     reloadProducts();
    // }, []);

    let onlyValid = delays
    .filter(delay => delay.hasOwnProperty("FromLocation"))
    .map((train, index) => {
        let stationName = stations.filter(station => station.LocationSignature === train.FromLocation[0].LocationName);

        return (<Marker
            coordinate={{ 
            latitude: parseFloat(results[1]), 
            longitude: parseFloat(results[0]) 
        }}
        key = {index}
        title={ stationName[0].AdvertisedLocationName }
        pinColor="red"
        description = {"Ny ank: " + new Date(train.EstimatedTimeAtLocation).toLocaleString("se-SV") }
        />
        );
    })

    return (
        <View style={Base.base}>
            <Text style={{ fontSize: 24, color: "black", marginBottom: 10 }}>Station:</Text>
            <Text style={Typography.normal}>{station.AdvertisedLocationName}</Text>

            <Text style={Typography.normal2}>Detaljer</Text>

            <Text style={Typography.normal}> {orderItemsList} </Text>
        </View>
    )
};