import React, { Component } from 'react'
import { Text, Alert, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView } from 'react-native'
import { IconButton, Paragraph } from 'react-native-paper'
import { Notifications } from 'expo'
import AlertAsync from "react-native-alert-async"
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import FlashMessage from 'react-native-flash-message'
import SlideToConfirm from 'react-native-slide-to-confirm'
import Database from './components/Database'
const db = new Database()
const screenWidth = Dimensions.get('window').width
import styles from './components/allStyles'

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
            <KeyboardAvoidingView style={styles.contentContainer} behavior="padding" enabled>
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
                  <Text style = {styles.title}>Please provide details</Text>
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
                      db.requestHelp(this.details)
                      //TODO: need to figure out how to text without bringing user out of app
                      //Communications.textWithoutEncoding('3048255608', this.details)
                      this.alert()
                    }}
                    >
                    <Text style = {styles.buttonText}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}