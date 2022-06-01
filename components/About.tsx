import { StatusBar } from 'expo-status-bar';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../styles';

//@ts-ignore
import react from '../assets/react.jpg';

export default function About () {

    return (
        <SafeAreaView style={Base.base}>
        <View style={Base.container2}>
            <Text style={Typography.headerAbout}>Built with React Native</Text>
            <Image source={react} style={{ width: 100, height: 100 }} />
            <Text style={Typography.normalAbout}>Created by Sandra Karlsson for the course 'Webbapplikationer för mobila enheter' at Blekinge Tekniska Högskola.</Text>
            <Text style={Typography.normalAbout}>Copyright © 2022</Text>
          <StatusBar style="auto" />
          </View>
        </SafeAreaView>
    );
}
