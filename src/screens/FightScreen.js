import React, { Component } from 'react'
import { Text, Alert, View, TextInput, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView } from 'react-native'
import { IconButton} from 'react-native-paper'
import { Notifications } from 'expo'
import AlertAsync from "react-native-alert-async"
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import SlideToConfirm from 'react-native-slide-to-confirm'
import Database from './components/Database'
const db = new Database()
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
import styles from './components/allStyles'

export default class AdminScreen extends React.Component {
    details = ''
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
            <KeyboardAvoidingView style={styles.contentContainer} behavior="height" keyboardVerticalOffset = {screenHeight*0.07}>
                <View style = {styles.horizontalContainer}>
                <IconButton style = {styles.topLeftIcon}
                  icon = 'arrow-left'
                  color = 'black'
                  size = {screenWidth*0.08}
                  onPress={() => {
                    this.props.navigation.navigate('Request')
                  }}
                >
                </IconButton>
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
                  <Text style = {styles.title}>Report Fight</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Details"
                    placeholderTextColor = "black"
                    returnKeyType="go"
                    multiline = {true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(text) => this.details = text.nativeEvent.text}
                
                  />
                  <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => {
                      db.getUserState().then(uid => {
                        db.fetchUser(uid).then(user => {
                          this.emergency = 'Fight Emergency. Details: ' + this.details + '\n'+ 'Room: ' + user.key;
                          db.requestHelp([{_id:user.uid, createdAt:0, text: this.emergency, user:{_id:uid, email:user.email, name:user.name}}])
                          // db.textMessage('NUMBER', this.emergency)
                        })
                      })
                    }}
                    >
                    <Text style = {styles.buttonText}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
