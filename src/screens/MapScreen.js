import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class MapScreen extends Component {


      render() {
        return (
          <MapView
            style={styles.map}
            mapType={"satellite"}
            region={{
                latitude: 39.625083,
                longitude:  -79.956796,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0025,
            }}
          />
        );
      }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: 'center',
    },
});