import React, { Component } from 'react'
import { Text, Alert, Modal, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import { IconButton, Paragraph } from 'react-native-paper'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import FlashMessage from 'react-native-flash-message'
import Database from './components/Database'
const db = new Database()
const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)
export default class HomeScreen extends Component {
  details = ''
  user = this.props.navigation.getParam('user','error')
  state = {
      assetsLoaded: false,
  }


  registerForPushNotificationsAsync = async() => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      console.log("here")
      return
    }
    
    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync()
      
      // POST the token to your backend server from where you can retrieve it to send push notifications.
      db.addToken(this.currentUser, token)

    } catch(error) {
      console.log(error)
    }
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

      <View style={styles.contentContainer}>

        <View style = {styles.horizontalContainer}>
          <IconButton style = {styles.topRightIcon}
            icon= 'help-circle-outline'
            size = {screenWidth*0.08}
            color = 'black'
            onPress={() => {
              this.props.navigation.navigate('Tutorial')
            }}
          />
        </View>
              

        <View style = {styles.container}>
          <Image
            style={styles.image}
            source={require('../images/logo.png')} 
          />
          <Text style={styles.title}>MHS-Protect</Text>
          <TouchableOpacity 
            style={styles.emergency}
            onPress={() => {
              Alert.alert(
                'Are you sure you want to report an emergency?',
                '$500 fine for false alarms',
                [
                  {text: 'No', onPress: () => {}},
                  {text: 'Yes', onPress: () => {
                    this.props.navigation.navigate('Slider')
                  }},
                ],
                {cancelable: false}
              )
            }}
            >
            <Text style = {styles.buttonText}>EMERGENCY ALERT</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.help}
            onPress={() => {
              this.props.navigation.navigate('Request')   
            }}
          >
            <Text style = {styles.buttonText}>REQUEST HELP</Text>
          </TouchableOpacity>
        </View>

        <View style = {styles.horizontalContainer}>
          <IconButton style = {styles.mapIcon}
            icon = 'google-maps'
            color = 'green'
            size={screenWidth*0.15}
            onPress={() => {
              this.props.navigation.navigate('Map')
            }}
          />
          <IconButton style = {styles.messageIcon}
            icon= 'message-processing'
            size = {screenWidth*0.15}
            color = '#47b9ea'
            onPress={() => {
              db.getUserState().then(uid => {
                db.fetchUser(uid).then(user => {
                  this.props.navigation.navigate('Chat', {user: [user, uid]})
                })
              })
          }}
          />
      </View>
      <FlashMessage position="top" />
    </View>
    )
  }
  componentWillUnmount(){
    db.mNotifOff()
    db.cNotifOff();
  }
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
      flex: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  title: {
      fontFamily: 'Lato-Bold',
      fontSize: screenWidth*0.0633,
      marginBottom: screenHeight*0.04,
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
    marginBottom: screenHeight*0.0333,
  },
  messageIcon: {
    marginLeft: screenWidth*0.15,
  },
  mapIcon: {
    marginRight: screenWidth*0.15,
  },
  buttonText: {
    fontSize: screenWidth*0.0487,
    fontFamily: 'Lato-Bold',
    color: 'black',
  },
  emergency: {
    width: screenWidth*0.62,
    height: screenHeight*0.0534,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c80d00',
    borderWidth: 2.5,
    borderRadius: 5,
    marginBottom: screenHeight*0.0344,
  },
})