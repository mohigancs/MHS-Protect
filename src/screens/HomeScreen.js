import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Database from './components/Database';
const db = new Database()

db.getUserState().then((uid) => {
  db.fetchUser(uid).then((usr) => {
    if (usr.role == 'Teacher') {
      text = 'boring'
    } else {
      text = 'special'
    }
  });
});

export default class HomeScreen extends Component {


  render() {
    return (
      <View style={styles.container}>
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
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            db.logOutUser();
            this.props.navigation.navigate('Login')
          }}
        >
          <Text>LOG OUT</Text>
        </TouchableOpacity>
        <Text>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  title: {
      fontSize: 22,
      marginBottom: 20
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