import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, Image, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../styles';


import Station from '../interfaces/Station';

//@ts-ignore
import background from '../assets/proj.jpg';

export default function Home({ stations, delays }) {

        // const list = stations.map((station: Station, index: number) => 
        // <Text key={index}>{ station.AdvertisedLocationName } - { station.LocationSignature }</Text>);



return (
    <View style={styles.container}>
    <ImageBackground source={background} resizeMode="cover" style={styles.image}>
      {/* {list} */}
      <Text style={styles.text}>Inside</Text>
      <StatusBar style="auto" />
      </ImageBackground>
      </View>
);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
});
