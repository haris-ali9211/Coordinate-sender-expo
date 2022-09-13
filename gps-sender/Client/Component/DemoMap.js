import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function App() {
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 134.6503,
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
        initialRegion={tokyoRegion}>
        <Marker coordinate={tokyoRegion} />
        <Marker coordinate={tokyoRegion1} />
      </MapView>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
