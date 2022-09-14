import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';

import { ref, set, get, child } from "firebase/database"
import firebaseStack from '../firebase/Firebase';



export default function App() {

    const defaultOptions = {
        strokeOpacity: 0.5,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
    };
    const closeOptions = {
        ...defaultOptions,
        zIndex: 3,
        fillOpacity: 0.05,
        strokeColor: "#8BC34A",
        fillColor: "#8BC34A",
    };
    const middleOptions = {
        ...defaultOptions,
        zIndex: 2,
        fillOpacity: 0.05,
        strokeColor: "#FBC02D",
        fillColor: "#FBC02D",
    };
    const farOptions = {
        ...defaultOptions,
        zIndex: 1,
        fillOpacity: 0.05,
        strokeColor: "#FF5252",
        fillColor: "#FF5252",
    };


    const db = firebaseStack();
    const dbRef = ref(firebaseStack());

    const [location, setLocation] = useState([]);



    const getLocationOfDriver = async () => {
        get(child(dbRef, `Location/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setLocation(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    useEffect(() => {
        getLocationOfDriver()
    }, [])


    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const tokyoRegion = {
        latitude: 24.8687345,
        longitude: 67.0822358,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const tokyoRegion1 = {
        latitude: 35.6762,
        longitude: 139.6503,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={tokyoRegion}
                onRegionChangeComplete={(region) => setRegion(region)}
                // customMapStyle={ab486c4a82f56e5d}
            >
                <Marker coordinate={tokyoRegion} />
                {/* <Marker
                    coordinate={region}
                    pinColor="green"
                // image={require("../image/bean.png")}
                /> */}
                {/* <Circle center={region} radius={1500} options={closeOptions} />
                <Circle center={region} radius={3000} options={middleOptions} />
                <Circle center={region} radius={4500} options={farOptions} /> */}
            </MapView>
            <Text style={styles.text}>Current latitude: {region.latitude}</Text>
            <Text style={styles.text}>Current longitude: {region.longitude}</Text>

            <TouchableOpacity>
                <View>
                    <Text style={{ borderBottomWidth: 1, borderColor: "grey", marginVertical: 10, backgroundColor:'red' }}>Current Location</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    marker: {
        width: 3,
        height: 3,
    }
});