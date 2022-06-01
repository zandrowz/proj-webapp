import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//@ts-ignore
import Home from "./components/Home.tsx";
//@ts-ignore
import Delays from "./components/Map.tsx";
//@ts-ignore
import Stations from "./components/DelayedStationsList.tsx";
//@ts-ignore
import About from "./components/About.tsx";

import trainModel from "./models/train";

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Hem": "home",
    "Trafikinfo": "train",
    "Karta": "map",
    "Om": "information-circle",
};

export default function App() {
    const [stations, setStations] = useState([]);
    const [delays, setDelays] = useState([]);

    useEffect(() => {
        (async () => {
            setStations(await trainModel.getStations());
            setDelays(await trainModel.getDelays());
        })();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}
        >
            <Tab.Screen name="Hem" component={Home} />
            <Tab.Screen name="Trafikinfo">
                {() => <Stations stations={stations} delays={delays} />}
            </Tab.Screen>
            <Tab.Screen name="Karta">
            {() => <Delays stations={stations} delays={delays} />}
            </Tab.Screen>
            <Tab.Screen name="Om" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
