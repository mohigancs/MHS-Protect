import React, { Component } from 'react'
import { Text, Alert, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import { IconButton, Paragraph } from 'react-native-paper'
import { Notifications } from 'expo'
import AlertAsync from "react-native-alert-async"
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import FlashMessage from 'react-native-flash-message'
import Database from './components/Database'
const db = new Database()
const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

export default class AdminScreen extends React.Component {

    entered_id = -1
    state = {
        assetsLoaded: false,
    }

    async componentDidMount(){
        await Font.loadAsync({
          'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
          'Lato-Regular' : require('../../assets/fonts/Lato-Regular.ttf'),
        })
        this.setState({ assetsLoaded: true })
    
        db.getUserState().then(uid => {
          this.currentUser = uid
        })
        db.mNotifOn()
        db.cNotifOn()
        await this.registerForPushNotificationsAsync()
    }

      
    render() {
        return (
        <Swiper style = {styles.wrapper} showsButtons={false}>
           <View style = {styles.contentContainer}>
              <View style = {styles.horizontalContainer}>
                <IconButton style = {styles.topRightIcon}
                  icon = 'close-box-outline'
                  color = 'black'
                  size = {screenWidth*0.08}
                  onPress={() => {
                    this.props.navigation.navigate('Home')
                  }}
                />
                </View>
              <View style = {styles.slide1}>
                <Image
                  style={styles.image}
                  source={require('../images/logo.png')} 
                />
                <Paragraph style = {styles.text}>
                  Welcome to MHS-Protect, an app dedicated to keeping our school safe.
                  Swipe for the tutorial.
                </Paragraph>
              </View>
            </View>

            <View style = {styles.contentContainer}>
              <View style = {styles.horizontalContainer}>
                <IconButton style = {styles.topRightIcon}
                  icon = 'close-box-outline'
                  color = 'black'
                  size = {screenWidth*0.08}
                  onPress={() => {
                    this.props.navigation.navigate('Home')
                  }}
                />
                </View>
              <View style = {styles.slide2}>
              <TouchableOpacity 
                style={styles.help}
                >
              <Text style = {styles.buttonText}>REQUEST HELP</Text>
              </TouchableOpacity>
                <Paragraph style = {styles.text}>
                  This is the REQUEST HELP button. Press this for medical emergencies, fights, etc.
                  This will notify the nurse, administrators, and nearby teachers.
                </Paragraph>
              </View>
            </View>
  
  
            <View style={styles.slide3}>
              <Text style={styles.text}>emergency</Text>
            </View>
            <View style={styles.slide4}>
              <Text style={styles.text}>map and chat</Text>
            </View>
            <View style={styles.slide5}>
              <Text style={styles.text}>creds</Text>
            </View>
        </Swiper>
        )
    }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  slide3: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  slide4: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  slide5: {
    flex:10, 
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'gray',
  },
  horizontalContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: screenWidth*0.0633,
    marginBottom: screenHeight*0.02,
  },
  topRightIcon: {
    marginLeft: screenWidth*0.8,
    top: screenHeight*0.057,
  },
  text: {
    marginLeft: screenWidth*0.02,
    marginRight: screenWidth*0.02,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontSize: screenWidth*0.049,
    },
    tutorialText: {
      marginLeft: screenWidth*0.02,
      marginRight: screenWidth*0.02,
      fontFamily: 'Lato-Regular',
      textAlign: 'left',
      fontSize: screenWidth*0.049,
    },
    image: {
      height: screenHeight*0.267,
      width: screenWidth*0.487,
      bottom: screenHeight*0.035,
      marginBottom: screenHeight*0.05,
      position: 'relative',
      resizeMode: 'contain',
    },
    help: {
      width: screenWidth*0.62,
      height: screenHeight*0.0534,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'orange',
      borderWidth: 2.5,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: screenWidth*0.0487,
      fontFamily: 'Lato-Bold',
      color: 'black',
    },
  })