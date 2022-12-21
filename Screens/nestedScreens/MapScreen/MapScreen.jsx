import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native"

import MapView, {Marker} from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style = {styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <Marker
        coordinate={{ latitude: 50.516339, longitude: 30.602185 }}
        title="travel photo"
      />
      
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