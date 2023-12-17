import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState({coords: {latitude: 49.026283, longitude: 2.364114}});

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })()
  }, [])

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
      >
        <Marker
          key={0}
          coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          title={'Moi'}
          description={'Ma position'}
        />
        <Marker
          key={1}
          coordinate={{
              latitude: 49.026283,
              longitude: 2.364114,
            }}
          title={'ASAP - Omogen'}
          description={'Ca bosse dur ici'}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});