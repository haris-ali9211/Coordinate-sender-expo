import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '@env'


import { ref, set, get, child } from "firebase/database"
import firebaseStack from '../firebase/Firebase';

import * as Location from "expo-location";


import { Avatar, Actionsheet, useDisclose, Center, NativeBaseProvider } from "native-base";




//! style for map

const mapStyle = [
    {
        "elementType": "geometry.fill",
        "stylers": [
            { "visibility": "on" },
            { "color": "#324447" }
        ]
    }, {
        "elementType": "geometry.stroke",
        "stylers": [
            { "visibility": "on" },
            { "color": "#263538" }
        ]
    }, {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            { "visibility": "on" },
            { "color": "#324447" }
        ]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            { "color": "#152022" },
            { "visibility": "on" },
            { "weight": 1 }
        ]
    }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            { "visibility": "on" },
            { "color": "#2d4a5a" }
        ]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [
            { "visibility": "on" },
            { "color": "#cccccc" }
        ]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [
            { "visibility": "on" },
            { "weight": 0.1 },
            { "color": "#152022" }
        ]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            { "visibility": "on" },
            { "color": "#473d40" }
        ]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            { "visibility": "on" },
            { "color": "#2f4e43" }
        ]
    }, {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            { "visibility": "on" },
            { "color": "#473d40" }
        ]
    }, {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            { "visibility": "simplified" },
            { "lightness": -24 }
        ]
    }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            { "visibility": "on" },
            { "color": "#263538" }
        ]
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            { "visibility": "off" }
        ]
    }, {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            { "visibility": "on" },
            { "color": "#243942" }
        ]
    }, {
        "featureType": "transit.line",
        "elementType": "geometry.stroke",
        "stylers": [
            { "visibility": "on" },
            { "color": "#263538" }
        ]
    }
]

const origin = { latitude: 24.9547844, longitude: 67.067563 };
const destination = { latitude: 24.9283654, longitude: 67.0755405 };


const GOOGLE_MAPS_APIKEY = GOOGLE_API_KEY;

export default function App() {



    const coordinates = [
        {
            latitude: 24.9545444,
            longitude: 67.067543
        },
        {
            latitude: 24.9277844,
            longitude: 67.022563
        }
    ]

    const [currentLocation, setCurrentLocation] = useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [isTracking, setIsTracking] = React.useState(true);
    const [permission, setPermission] = React.useState(false);
    const [location, setLocation] = useState(null);
    const [LocationOfDriver, setLocationOfDriver] = useState([]);

    const [directionStatus, setDirectionStatus] = useState(false)
    const [destinationLocation, setDestinationLocation] = useState([])

    const [distance, setDistance] = useState(null)
    const [duration, setDuration] = useState(null)

    const origin = {
        latitude: location ? location.coords.latitude : 21.8687345,
        longitude: location ? location.coords.longitude : 67.0677422,
    };
    var destinationFinal = {
        latitude: destinationLocation ? destinationLocation.latitude : null,
        longitude: destinationLocation ? destinationLocation.longitude : null,
    };


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

    //! firebase setup

    const db = firebaseStack();
    const dbRef = ref(firebaseStack());

    //! function calling data for current location

    const getLocationOfDriver = async () => {
        get(child(dbRef, `Location/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setLocationOfDriver(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    // React.useEffect(() => {
    //     let int = null;
    //     if (isTracking) {
    //         int = setInterval(() => {
    //             getLocationOfDriver();
    //         }, 10000);
    //     } else {
    //         clearInterval(int);
    //     }
    //     return () => {
    //         clearInterval(int);
    //     };
    // }, [isTracking]);


    //! hardcode location  

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

    const markerTest = {
        latitude: 24.9583324,
        longitude: 67.0673979,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const tokyoRegion1 = {
        latitude: location ? location.coords.latitude : 24.8687345,
        longitude: location ? location.coords.longitude : 67.0677422,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const mapRef = useRef(null);

    const goToTokyo = () => {
        //complete this animation in 3 seconds
        mapRef.current.animateToRegion(tokyoRegion1, 3 * 1000);
    };


    var arrayLocation = [
        {
            latitude: 24.946060,
            longitude: 67.111917
        },
        {
            latitude: 24.948346,
            longitude: 67.116884
        },
        {
            latitude: 24.943036,
            longitude: 67.115753
        },
        {
            latitude: 24.942046,
            longitude: 67.119559
        }

    ]

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={tokyoRegion}
                onRegionChangeComplete={(region) => setRegion(region)}
            // customMapStyle={mapStyle}
            >
                {/* <Marker coordinate={tokyoRegion} /> */}

                {
                    location != null ? arrayLocation.map((obj, key) => {
                        const destination = {
                            latitude: location ? obj.latitude : 24.8687345,
                            longitude: location ? obj.longitude : 67.0677422,
                        };
                        return (
                            <Marker
                                onPress={() => {
                                    setDestinationLocation(destination)
                                }}
                                key={key}
                                coordinate={
                                    {
                                        latitude: obj.latitude,
                                        longitude: obj.longitude,
                                    }
                                }>
                                <Image source={require("../image/van01.png")} style={{ height: 35, width: 35 }} />
                            </Marker>
                        )

                    })
                        :
                        null
                }



                {
                    location != null && mapRef != null
                        ?
                        <View>
                            <Marker
                                coordinate={tokyoRegion1}
                            // image={require("../image/bean.png")}
                            // width={8}
                            // height={8}
                            >
                                <Image source={require("../image/deadpool.png")} style={{ height: 35, width: 35 }} />

                            </Marker>

                            <Circle
                                zIndex={3}
                                center={tokyoRegion1}
                                radius={800}
                                strokeWidth={1}
                                strokeColor={'#8BC34A'}
                                fillColor={'rgba(139,195,74,0.2)'} />
                            <Circle
                                zIndex={2}
                                center={tokyoRegion1}
                                radius={2700}
                                strokeWidth={1}
                                strokeColor={'#FFFF00'}
                                fillColor={'rgba(255,255,0,0.2)'} />
                            <Circle
                                zIndex={0}
                                center={tokyoRegion1}
                                radius={4200}
                                strokeWidth={1}
                                strokeColor={'#FF5252'}
                                fillColor={'rgba(255,82,82,0.2)'} />
                        </View>


                        :
                        null

                }
                {
                    destinationLocation != null && location != null ?
                        <MapViewDirections
                            origin={origin}
                            // waypoints={[
                            //     {
                            //         latitude: 24.9545444,
                            //         longitude: 67.067543
                            //     },
                            //     {
                            //         latitude: 24.9277844,
                            //         longitude: 67.022563
                            //     }
                            // ]
                            // }
                            destination={destinationFinal}
                            // destination={{
                            //     latitude: destinationLocation ? destinationLocation.latitude : null,
                            //     longitude: destinationLocation ? destinationLocation.longitude : null,
                            // }}
                            mode={'DRIVING'}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor={'#000000'}
                            onStart={(params) => {
                                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                            }}
                            onReady={result => {
                                setDistance(result.distance)
                                setDuration(result.duration)
                            }}
                            onError={(errorMessage) => {
                                console.log('GOT AN ERROR', errorMessage)
                            }}
                        />
                        : null
                }

                {/* {
                    location != null ? arrayLocation.map((obj, key) => {
                        const destination = { 
                            latitude: location ? obj.latitude : 24.8687345, 
                            longitude: location ? obj.latitude : 67.0677422, 
                        };


                        return (
                            <Marker
                                onPress={() => {
                                    () => {
                                        setDestinationLocation(true),
                                        setDestinationLocation(destination)
                                        console.log("🚀 ~ file: StudentLocation.js ~ line 404 ~ location!=null?arrayLocation.map ~ destination", destination)
                                    }
                                }}
                                key={key}
                                coordinate={
                                    {
                                        latitude: obj.latitude,
                                        longitude: obj.longitude,
                                    }
                                }>
                                <Image source={require("../image/van01.png")} style={{ height: 35, width: 35 }} />
                            </Marker>
                        )

                    })
                        :
                        null
                } */}

            </MapView>

            {/* <Text style={styles.text}>Current latitude: {region.latitude}</Text>
            <Text style={styles.text}>Current longitude: {region.longitude}</Text> */}

            {
                location != null ? <Text>location hai</Text> : <Text>location nahi hai</Text>
            }

            {
                location != null
                    ?
                    <View>
                        <TouchableOpacity onPress={goToTokyo}>
                            <View>
                                <Text style={{ borderBottomWidth: 1, borderColor: "grey", marginVertical: 10, backgroundColor: 'red', textAlign: 'center' }}>Current Location</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onOpen}>
                            <View>
                                <Text style={{ borderBottomWidth: 1, borderColor: "grey", marginVertical: 10, backgroundColor: 'red' }}>Distance Calculator</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View>
                            <Avatar bg="green.500" alignSelf="center" size="lg" source={{
                                uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            }}>
                                AJ
                            </Avatar>
                        </View>

                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ marginLeft: 22, fontSize: 15 }}>Driver: Ali Jones</Text>
                            <Text style={{ marginLeft: 22, fontSize: 15 }}>Car: Mercedes </Text>
                            <Text style={{ marginLeft: 22, fontSize: 15 }}>Cnic: 42101-221-321 </Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <View>
                            <Text style={{ marginTop: 22, fontSize: 15 }}>This car is
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>
                                    {` ${distance} `}
                                </Text>
                                km away form you Location
                            </Text>
                        </View>

                        <View>
                            <Text style={{ marginTop: 5, fontSize: 15 }}>That would take
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>
                                    {duration ? ` ${duration.toFixed(2)} ` : null}
                                </Text>
                                mins each direction
                            </Text>
                        </View>

                    </View>

                </Actionsheet.Content>
            </Actionsheet>

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