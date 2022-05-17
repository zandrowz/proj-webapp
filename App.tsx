import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import FlashMessage from "react-native-flash-message";



import Home from "./components/Home";
import Delays from "./components/Delays";

import trainModel from "./models/train";

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Home": "home",
    "Delays": "train",
};

export default function App() {
    const [stations, setStations] = useState([]);
    const [delays, setDelays] = useState([]);

    const getStationFunction = async () => {
        setStations(await trainModel.getStations());
        setDelays(await trainModel.getDelays());
    }
    
    useEffect(() => {
        getStationFunction();
      })


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";


            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#DF406A',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}
        >
          <Tab.Screen name="Home">
            {() => <Home stations={stations} delays={delays} />}
            </Tab.Screen>
            <Tab.Screen name="Delays">
            {() => <Delays stations={stations} delays={delays} />}
            </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      {/* <FlashMessage position="top" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#eee',
      // paddingLeft: 12,
      // paddingRight: 12,
      // marginBottom: 20,
      // color: '#fff',
    },
  });