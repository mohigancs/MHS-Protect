import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'
import { Appbar } from 'react-native-paper'

import Database from './components/Database'
const db = new Database()

export default class MapScreen extends Component {

  state = {
    emergencies: [],
  };

  componentDidMount() {
    db.mapOn(emergencies => {
        this.setState(previousState => ({
            emergencies: previousState.emergencies.concat(emergencies),
        }))
    })
  }

  render() {
    k = 0
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
          {this.state.emergencies.map(emergency => {
            if(k + 1 == this.state.emergencies.length){
              color = 'red';
            }
            else {
              color = 'orange';
            }
            return (
              <MapView.Marker 
                key = {k++}
                title={emergency.title}
                description={emergency.description}
                coordinate={{
                  latitude: emergency.latitude,
                  longitude: emergency.longitude,
                }}
                pinColor={color}
              />
            );
          })}
        </MapView>
        <Appbar.Header
          dark = {true}
          style={{backgroundColor:'#bfbfbf'}}
        >
        <Appbar.Action 
          icon = 'arrow-left'
          size = {24}
            onPress={() =>{
              this.props.navigation.navigate('Home')
            }}
        />
        </Appbar.Header>
      </View>
    );
  }
  componentWillUnmount(){
    db.mapOff();
  }
}

const styles = StyleSheet.create({
  absoluteFillView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})