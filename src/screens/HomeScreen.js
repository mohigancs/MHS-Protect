import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Database from './components/Database';
const db = new Database()

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
          style={styles.button}
          onPress={() => {
            db.reportEmergency('foo', 'bar')
          }}
        >
          <Text>EMERGENCY ALERT</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            console.log('request for help')
          }}
        >
          <Text>REQUEST HELP</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            console.log('principal push')
          }}
        >
          <Text>PRINCIPAL PUSH</Text>
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
      fontSize: 22,
      position: 'relative',
      bottom: 100,
  },
  logOut: {
    fontSize: 14,
    marginLeft: 310,
    marginTop: 10,
  },
  image: {
    height: 200,
    width: 200,
    bottom: 120,
    position: 'relative',
    resizeMode: 'cover',
  },

  button: {
      width: 200,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom: 10
  },
});