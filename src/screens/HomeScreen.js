import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions, Linking } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import Dialog from "react-native-dialog"
import Database from './components/Database'
const db = new Database()
const screenWidth = Dimensions.get('window').width
import styles from './components/allStyles'

export default class HomeScreen extends Component {

  details = ''
  room = ''

  constructor(props) {
	  super();
      this.state = {
        assetsLoaded: false,
        isadmin: null,
        dialogVisible: false
      }
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
	  b = <TouchableOpacity style={styles.emergency} onPress={() => { this.props.navigation.navigate("Admin") }} > <Text style = {styles.homeButtonText}>ADMIN CONTROLS</Text> </TouchableOpacity>

    await Font.loadAsync({
      'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
      'Lato-Regular' : require('../../assets/fonts/Lato-Regular.ttf'),
    })
    this.setState({ assetsLoaded: true })

    db.getUserState().then(uid => {
      this.currentUser = uid
    })
    await this.registerForPushNotificationsAsync()
	db.getUserState().then(uid => {
		db.fetchUser(uid).then(user => {
			if (user["role"] == "Administrator") {
				this.setState({ isadmin: true })
			} else {
				this.setState({ isadmin: false })
			}
		})
	})
  }

  joinChat = (grp) => {
    db.getUserState().then(uid => {
      db.fetchUser(uid).then(user => {
        this.props.navigation.navigate('Chat', {user: [user, uid], group: grp})
        this.handle_cancel()
      })
    })
  }

  handle_cancel = () => {
    this.setState({ dialogVisible: false })
  }

  render() {

    return (

      <View style={styles.contentContainer}>

        <View style = {styles.horizontalContainer}>
          <IconButton style = {styles.mainTopRightIcon}
            icon= 'help-circle-outline'
            size = {screenWidth*0.08}
            color = 'black'
            onPress={() => {
              // this.props.navigation.navigate('Tutorial')
              Linking.openURL('https://github.com/mohigancs/MHS-Protect').catch(err => console.error("Couldn't load page", err));
            }}
          />
        </View>

        <View style = {styles.container}>
          <Image
            style={styles.logoImage}
            source={require('../images/logo.png')} 
          />
          <Text style={styles.homeTitle}>MHS-Protect</Text>
          <TouchableOpacity 
            style={styles.emergency}
            onPress={() => {
              this.props.navigation.navigate('Slider')
            }}
            >
            <Text style = {styles.homeButtonText}>INTRUDER ALERT</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.medical}
            onPress={() => {
              this.props.navigation.navigate('Medical')   
            }}
          >
            <Text style = {styles.homeButtonText}>MEDICAL EMERGENCY</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.help}
            onPress={() => {
              this.props.navigation.navigate('Help')   
            }}
          >
            <Text style = {styles.homeButtonText}>REQUEST HELP</Text>
          </TouchableOpacity>

		  {!!this.state.isadmin && (
      <TouchableOpacity style={styles.admin}
				onPress={() => { this.props.navigation.navigate('Admin') }} 
			> 
				<Text style = {styles.homeButtonText}>ADMIN CONTROLS</Text> 
			</TouchableOpacity>
		  )}
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
              this.setState({dialogVisible: true})
            }}
          />
      </View>

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Chat Selection</Dialog.Title>
          <Dialog.Description>
            Which chat would you like to join?
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handle_cancel} />
          <Dialog.Button label="Public" onPress={() => this.joinChat('public')} />
          <Dialog.Button label="Private" onPress={() => this.joinChat('private')} />
          {/* We can make as many of these as we need :) */}
        </Dialog.Container>

    </View>
    );
  }
}
