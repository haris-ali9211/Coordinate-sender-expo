import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NativeBaseProvider } from "native-base";
import LocationUI from './Component/LocationUI'
import Login from './Component/Login';
import SignIn from './Component/SignI';





export default function App() {

  return (
    <NativeBaseProvider>
      {/* <LocationUI /> */}
      <Login/>
      {/* <SignIn/> */}
    </NativeBaseProvider>

  );
}



