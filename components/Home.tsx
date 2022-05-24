import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, Image, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../styles';

//@ts-ignore
import background from '../assets/train.jpg';

export default function Home({ stations, delays, navigation }) {
    return (
        <View style={Base.container3}>
        <ImageBackground source={background} resizeMode="cover" style={Base.image}>
        {/* {list} */}
        <Pressable style={Base.button} onPress={() => {
                navigation.navigate('Karta');
                    }}>
                    <Text style={Typography.text}>Tågförseningar</Text>
            </Pressable>
        <StatusBar style="auto" />
        </ImageBackground>
        </View>
    );
}
// const styles = StyleSheet.create({
//     container2: {
//         flex: 1,
//     },
//     image: {
//         flex: 1,
//         justifyContent: "center"
//     },
//     text: {
//         // color: "#dba530",
//         color: "white",
//         fontSize: 30,
//         padding: 10,
//         fontWeight: "bold",
//         textAlign: "center",
//         borderWidth: 1,
//         borderColor: "white",
//         borderRadius: 10,
//         backgroundColor: "#252529"
//     }
// });
