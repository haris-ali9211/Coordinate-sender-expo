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





  // const [data, setData] = useState(null)
  // console.log("🚀 ~ file: App.js ~ line 64 ~ App ~ data", data)

  // useEffect(() => {
  //   const socket = io('http://localhost:5000', {
  //     transports: ['websocket']
  //   });
  //   socket.on("ping", (data: any) => {
  //     setData(data)
  //   })

  // }, [])


export default function App() {


  return (

    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="LocationUI" component={LocationUI} />
          <Stack.Screen name="Van-Tracker" component={StudentLocation}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}



