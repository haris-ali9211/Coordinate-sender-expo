import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { NativeBaseProvider } from "native-base";

import LocationUI from './Component/LocationUI'
import Login from './Component/Login';
import SignIn from './Component/SignI';
import StudentLocation from './Component/StudentLocation';

import { NavigationContainer } from '@react-navigation/native';
// import SplashScreen from 'react-native-splash-screen'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();





export default function App() {


  return (

    <StudentLocation/>
    // <NativeBaseProvider>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    //       <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    //       <Stack.Screen name="LocationUI" component={LocationUI} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </NativeBaseProvider>
  );
}



