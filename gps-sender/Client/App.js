import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as Location from "expo-location";
import * as Application from "expo-application";
import io from 'socket.io-client';
// const socket = io.connect("http://localhost:3001"); 

export default function App() {

  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isTracking, setIsTracking] = React.useState(false);
  const [permission, setPermission] = React.useState(false);
  const [location, setLocation] = useState(null);
  const [sendData, setSendData] = useState(null);


  const getLocation = async () => {
    if (!permission) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsTracking(false);
        return;
      }
      setPermission(true);
      setErrorMsg("");
    } else setIsTracking(true);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setSendData(location)
  };

  const handleClick = () => {
    setErrorMsg("");
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setLocation(null);
    setErrorMsg("");
  };

  React.useEffect(() => {
    let int = null;
    if (isTracking) {
      int = setInterval(() => {
        getLocation();
      }, 10000);
    } else {
      clearInterval(int);
    }
    return () => {
      clearInterval(int);
    };
  }, [isTracking]);

  const [data, setData] = useState(null)

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      // const socket = io('https://coordinate-sender-expo.herokuapp.com', {
      transports: ['websocket']
    });
    socket.on("ping", (data: any) => {
      setData(data)
      console.log("🚀 ~ file: App.js ~ line 74 ~ socket.on ~ data", data)
    })
    if (isTracking) {
      setInterval(() => {
        socket.emit("send_message", { location: location });
      }, 10000);
    }
  }, [isTracking, location])


  return (
    <View style={styles.container}>

      <Text
        style={styles.titleText}
      >Latitude: {location?.coords.latitude}
      </Text>
      <Text
        style={styles.titleText}
      >Longitude: {location?.coords.longitude}</Text>
      <Text style={{ color: "red" }}>{errorMsg}</Text>

      <Button
        color={isTracking ? "#C70039" : "#138D75"}
        title={isTracking ? "Stop Tracking" : "Start Tracking"}
        onPress={isTracking ? stopTracking : handleClick}
      />

      {/* <View>
        <TextInput
          placeholder='hello'
          style={styles.input}
        />
        <Button
          title='click'
          onPress={sentMenages}
          color={"#138D75"}
        />
      </View> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    marginHorizontal: 22,
    borderRadius: 12
  }

});
