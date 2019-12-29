import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Appbar, IconButton} from 'react-native-paper';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class MapScreen extends Component {
      render() {
        return (
          <View style={styles.absoluteFillView}>

            <MapView
              style={styles.absoluteFillView}
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
            <Appbar.Header
              dark = {true}
              style={{backgroundColor:'#bfbfbf'}}
            >
            <Appbar.Action 
            icon = 'arrow-left'
            size = {24}
                onPress={() =>{
                   this.props.navigation.navigate('Home');
                }}
            />
            </Appbar.Header>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    top: screenHeight*0.059,
    left:0,
    right:0,
    bottom:0,
    backgroundColor: '#0a007e',
},
  absoluteFillView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});