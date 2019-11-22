import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Database from './components/Database';
const db = new Database()
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class HomeScreen extends Component {


  render() {
    return (
      <View style={styles.contentContainer}>
        <View style = {styles.logOutContainer}>
          <TouchableOpacity 
            onPress={() => {
              db.logOutUser();
              this.props.navigation.navigate('Login')
            }}
          >
          <Text style = {styles.logOut}>LOG OUT</Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.container}>
          <Image
            style={styles.image}
            source={require('../images/logo.jpg')} 
          />
        <Text style={styles.title}>MHS-Protect</Text>
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => {
            db.reportEmergency('foo', 'bar')
          }}
        >
          <Text style = {{fontFamily: 'Roboto', fontWeight: 'bold'}}>EMERGENCY ALERT</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            console.log('request for help')
          }}
        >
          <Text style = {{fontFamily: 'Roboto', fontWeight: 'bold'}}>REQUEST HELP</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            console.log('principal push')
          }}
        >
          <Text style = {{fontFamily: 'Roboto', fontWeight: 'bold'}}>PRINCIPAL PUSH</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logOutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
      flex: 7,
      justifyContent: 'center',
      alignItems: 'center',
  },
  title: {
      fontSize: 26,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      position: 'relative',
      bottom: screenHeight*0.1335,
  },
  logOut: {
    fontSize: 16,
    marginLeft: screenWidth*0.7786,
    marginTop: screenHeight*0.0267,
  },
  image: {
    height: 200,
    width: 200,
    bottom: screenHeight*0.1602,
    position: 'relative',
    resizeMode: 'cover',
  },

  button: {
      width: screenWidth*0.487,
      height: screenHeight*0.0534,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: screenHeight*0.0333,
  },
  emergencyButton: {
    width: screenWidth*0.487,
    height: screenHeight*0.0534,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c80d00',
    borderWidth: 2.5,
    borderRadius: 5,
    marginBottom: screenHeight*0.0333,
},
});