import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, Image, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../styles';
import { Ionicons } from '@expo/vector-icons';

//@ts-ignore
import background from '../assets/train.jpg';
//@ts-ignore
import icon from '../assets/train-icon.png';

export default function Home({ navigation }) {
    return (
        <View style={Base.container3}>
            <ImageBackground source={background} resizeMode="cover" style={Base.image}>
            {/* <Ionicons name="train" size={32} color="white" style={{ textAlign: "center"}} /> */}
            <Pressable style={Base.button} onPress={() => {
                    navigation.navigate('Karta');
                        }}>
                        <Text style={Typography.text}><Ionicons name="train" size={32} color="white" />Tågförseningar</Text>
                        
                </Pressable>
            <StatusBar style="auto" />
            </ImageBackground>
        </View>
    );
}
