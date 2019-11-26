import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import Database from './components/Database';
const db = new Database()

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.contentContainer}>

        <View style = {styles.horizontalContainer}>
          <TouchableOpacity 
              onPress={() => {
                db.logOutUser().then(() => {
                  console.log("logged out");
                    db.getUserState().then((snapshot) => {
                        console.log(snapshot);
                      });
                    this.props.navigation.navigate('Login')
                  });
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
            style={styles.emergency}
            onPress={() => {
              db.reportEmergency('description')
            }}
            >
            <Text style = {styles.buttonText}>EMERGENCY ALERT</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.help}
            onPress={() => {
              console.log('request for help')
            }}
          >
            <Text style = {styles.buttonText}>REQUEST HELP</Text>
          </TouchableOpacity>
        </View>

        <View style = {styles.horizontalContainer}>
          <IconButton
            icon = 'google-maps'
            color = 'green'
            size={screenWidth*0.15}
            onPress={() => {
              this.props.navigation.navigate('Map')
            }}
          />
          <IconButton
            icon = 'message-processing'
            color = '#57c9fa'
            size={screenWidth*0.15}
            onPress={() => {
              db.getUserState().then(uid => {
                db.fetchUser(uid).then(user => {
                  this.props.navigation.navigate('Chat', {user: [user, uid]})
                })
              })
          }}
          />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flex: 1,
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
      position: 'relative',
      marginBottom: screenHeight*0.02,
  },
  logOut: {
    fontSize: 20,
    marginLeft: screenWidth*0.7786,
    top: screenHeight*0.066,
  },
  image: {
    height: screenHeight*0.267,
    width: screenWidth*0.487,
    bottom: screenHeight*0.035,
    marginBottom: screenHeight*0.05,
    position: 'relative',
    resizeMode: 'cover',
  },
  help: {
    width: screenWidth*0.62,
    height: screenHeight*0.0534,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: screenHeight*0.0333,
},
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emergency: {
    width: screenWidth*0.62,
    height: screenHeight*0.0534,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c80d00',
    borderWidth: 2.5,
    borderRadius: 5,
    marginBottom: screenHeight*0.0333,
  },
});