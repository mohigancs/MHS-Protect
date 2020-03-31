import React, { Component } from 'react'
import { Text, Alert, View, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView} from 'react-native'
import { IconButton } from 'react-native-paper'
import { Notifications } from 'expo'
import AlertAsync from "react-native-alert-async"
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import FlashMessage from 'react-native-flash-message'
import Database from './components/Database'
const db = new Database()
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
    alert = async () => {
        const choice = await AlertAsync(
          'Message Sent',
          '',
          [
            {text: 'OK', onPress: () => 'yes'},
          ],
          {
            cancelable: true,
            onDismiss: () => 'yes',
          },
        )
      
        if (choice === 'yes') {
          this.props.navigation.navigate('Home')
        }
        else {
        }
      }
      
    render() {
        return (
          <View style={styles.contentContainer}>

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
          <TouchableOpacity style = {styles.requestButton}
                   onPress= {() => {
                    this.props.navigation.navigate('Fight')
                  }}
                  >
            <Image
              style={styles.typeImage}
              source={require('../images/fight.png')} 
            />
          <Text style = {styles.labelText}>Fight</Text>        
          </TouchableOpacity>

          <TouchableOpacity style = {styles.other}
             onPress= {() => {
              this.props.navigation.navigate('Other')
              }}
            >
          <Text style = {styles.otherText}>REPORT OTHER</Text>
                    
          </TouchableOpacity>
          </View>
      </View>
        )
    }
}