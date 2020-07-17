import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { Appbar } from 'react-native-paper'

import Database from './components/Database'
const db = new Database()

import styles from './components/allStyles'

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
          initialRegion={{
            latitude: 39.625083,
            longitude:  -79.956796,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
          }}
          provider = {PROVIDER_GOOGLE}
        >
          {this.state.emergencies.map(emergency => {
            if(k + 1 == this.state.emergencies.length){
              color = 'red';
            }
            else {
              color = 'orange';
            }
            return (
              <Marker 
                key = {k++}
                title= {emergency.title}
                description= {emergency.description}
                coordinate={{
                  latitude: emergency.latitude,
                  longitude: emergency.longitude
                }}
                pinColor={color}
              />
            );
          })}
        </MapView>
        <Appbar.Header
          dark = {true}
          style={{backgroundColor:'#bdbdbd'}}
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
    db.mapOff()
  }
}