import React, { Component } from 'react'
import { Text, Alert, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView } from 'react-native'
import { IconButton, Paragraph } from 'react-native-paper'
import { Notifications } from 'expo'
import AlertAsync from "react-native-alert-async"
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import FlashMessage from 'react-native-flash-message'
import SlideToConfirm from 'react-native-slide-to-confirm'
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
                    style = {styles.modalButton}
                    onPress = {() => {
                      db.requestHelp(this.details)
                      //TODO: need to figure out how to text without bringing user out of app
                      //Communications.textWithoutEncoding('3048255608', this.details)
                      this.alert()
                    }}
                    >
                    <Text style = {styles.modalButtonText}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
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
    input: {
      width: screenWidth*0.73,
      height: screenHeight*0.13,
      backgroundColor: '#d3d3d3',
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 5,
      textAlignVertical: 'top',
      fontSize: screenWidth*0.0487,
      paddingHorizontal: screenWidth*0.0487,
      marginBottom: screenHeight*0.0344,
  },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: screenWidth*0.0633,
        marginBottom: screenHeight*0.02,
    },
    modalTitle: {
      fontFamily: 'Lato-Bold',
      fontSize: screenWidth*0.0633,
      marginBottom: screenHeight*0.05,
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
    modalButton: {
      width: screenWidth*0.7299,
      height: screenHeight*0.0534,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#c80d00',
      borderColor: '#c80d00',
      borderWidth: 1,
      borderRadius: 5,
    },
    modalButtonText: {
      fontSize: screenWidth*0.0487,
      fontFamily: 'Lato-Bold',
      color: 'white',
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