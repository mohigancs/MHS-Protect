import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Database from './components/Database';
const db = new Database()

/*firebase.database().ref('alerts/').on('child_added', ()=>{
  console.log('aaaa');
});*/

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
            this.props.navigation.navigate('Messages')
          }}
        >
          <Text>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('ChatScreen')
          }}
        >
          <Text>Chat</Text>
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