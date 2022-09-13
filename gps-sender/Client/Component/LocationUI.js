import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as Location from "expo-location";
import * as Application from "expo-application";
import io from 'socket.io-client';
import { ref, set, get, child } from "firebase/database"
import firebaseStack from '../firebase/Firebase';
import * as Device from 'expo-device';


const LocationUI= ()=> {
  const db = firebaseStack();
  const dbRef = ref(firebaseStack());

  const [errorMsg, setErrorMsg] = React.useState(null);
  const [isTracking, setIsTracking] = React.useState(false);
  const [permission, setPermission] = React.useState(false);
  const [location, setLocation] = useState(null);
  const [counter, setCounter] = useState(0)






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
    set(ref(db, `Location/${Device.brand}`), {
      'latitude': location.coords.latitude,
      'longitude': location.coords.longitude,
    });
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



  const getPastLocation = () => {
    setCounter(counter + 1)
    set(ref(db, `PastLocation/${Device.brand}/` + counter), {
      'latitude': location.coords.latitude,
      'longitude': location.coords.longitude,
    });
  }

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

  React.useEffect(() => {
    let int = null;
    if (isTracking && location) {
      int = setInterval(() => {
        console.log("🚀 ~ file: App.js ~ line 62 ~ getPastLocation ~ counter", counter)
        getPastLocation();
      }, 10000);
    } else {
      clearInterval(int);
    }
    return () => {
      clearInterval(int);
    };
  }, [location, isTracking]);



  return (
    <View style={styles.container}>

      <Text style={styles.titleBrand}>Device: {Device.brand}</Text>

      {
        isTracking
          ?
          <View>
            <Text style={styles.titleText}>Latitude: {location ? location.coords.latitude : 'getting Location'}</Text>
            <Text style={styles.titleText}>Latitude: {location ? location.coords.longitude : 'getting Location'}</Text>
          </View>
          :
          <Text style={styles.titleText}>Press Start Tracking to get Location</Text>
      }


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

export default LocationUI;

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

  titleBrand: {
    fontSize: 20,
    // fontWeight: "bold"
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


