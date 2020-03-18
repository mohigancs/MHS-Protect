import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import { IconButton, Paragraph } from 'react-native-paper'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import FlashMessage from 'react-native-flash-message'
import styles from './components/allStyles'
const screenWidth = Dimensions.get('window').width
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
                <IconButton style = {styles.mainTopRightIcon}
                  icon = 'close'
                  color = 'black'
                  size = {screenWidth*0.08}
                  onPress={() => {
                    this.props.navigation.navigate('Home')
                  }}
                />
                </View>
              <View style = {styles.container}>
                <Image
                  style={styles.logoImage}
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
                  icon = 'close'
                  color = 'black'
                  size = {screenWidth*0.08}
                  onPress={() => {
                    this.props.navigation.navigate('Home')
                  }}
                />
                </View>
              <View style = {styles.container}>
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
        </Swiper>
        )
    }
}

