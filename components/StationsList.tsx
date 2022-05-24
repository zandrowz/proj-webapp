import config from "../config/config.json";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from "react-native";
import { Base, Typography } from '../styles';
import { DataTable } from "react-native-paper";
import trainModel from "../models/train";
import Station from '../interfaces/station';

export default function StationsList({ stations, delays }) {



    let list = delays
    .filter(delay => delay.hasOwnProperty("FromLocation"))
    .map((train, index) => {
        let stationName = stations.filter(station => station.LocationSignature === train.FromLocation[0].LocationName);
        let stationNameEnd = stations.filter(station => station.LocationSignature === train.ToLocation[0].LocationName);

        return <Text key={index} style={Base.container}>
            <Text style={Typography.header3}>{ stationName[0].AdvertisedLocationName } - { stationNameEnd[0].AdvertisedLocationName }</Text>{"\n"}
            <Text style={{ fontWeight: "bold", fontSize: 20, color: 'white'}}>Tåg: </Text><Text style={Typography.normal}> { train.AdvertisedTrainIdent } </Text>{"\n"}
            <Text style={{ fontWeight: "bold", fontSize: 20, color: 'white'}}>Avgång: </Text><Text style={{textDecorationLine: 'line-through', fontSize: 20, color: 'white'}}>
                { train.AdvertisedTimeAtLocation.slice(11,16) }</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20, color: 'white'}}> {""} Ny tid: </Text>
                <Text style={Typography.normal}>{ train.EstimatedTimeAtLocation.slice(11,16) }</Text>
               </Text>
  });

    return (
        <SafeAreaView style={Base.base}>
        <ScrollView style={Base.base}>
            <Text style={Typography.headerDelays}>Aktuella förseningar</Text>
            <Text style={Typography.normalDelays}>(Listan sorteras på ordinarie avgångstid)</Text>
                {list}
        </ScrollView>

        </SafeAreaView>
    )

}

