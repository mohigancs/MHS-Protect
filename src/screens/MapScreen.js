import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class MapScreen extends Component {



      render() {
        return (
          <View style={styles.container}> 
            <MapView
              style={styles.map}
              mapType={"satellite"}
              showsUserLocation={true}
              region={{
                  latitude: 39.625083,
                  longitude:  -79.956796,
                  latitudeDelta: 0.0025,
                  longitudeDelta: 0.0025,
              }}
            >

              <MapView.Marker
            key={0}
            coordinate={{latitude: 39.66233946313295,
            longitude: -79.97040309453479}}
            title={"title"}
            description={"description"}

         />


            </MapView>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});