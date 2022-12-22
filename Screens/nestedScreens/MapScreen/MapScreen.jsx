import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native"

import MapView, {Marker} from 'react-native-maps';

const MapScreen = ({ route }) => {
  console.log("map route:", route.params.coordinate)
  return (
    <View style = {styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >

      <Marker
        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        title="travel photo"
      />
        
      </MapView>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  map: {
    flex:1,
  }
})

export default MapScreen