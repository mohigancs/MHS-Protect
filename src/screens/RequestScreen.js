import React, { Component } from 'react'
import { Text, Alert, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView} from 'react-native'
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
                  <TouchableOpacity style = {styles.button}
                   onPress= {() => {
                    this.props.navigation.navigate('Medical')
                  }}
                  >
                    <Image
                      style={styles.image}
                      source={require('../images/medkit.png')} 
                    />
                    <Text style = {styles.medText}>Medical Emergency</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.button}
                   onPress= {() => {
                    this.props.navigation.navigate('Fight')
                  }}
                  >

                    <Image
                      style={styles.image}
                      source={require('../images/fight.png')} 
                    />
                    <Text style = {styles.medText}>Fight</Text>
                    
                  </TouchableOpacity>

                  <TouchableOpacity style = {styles.container}
                    onPress= {() => {
                      this.props.navigation.navigate('Other')
                    }}
                  >
                    <Text style = {styles.otherText}>REPORT OTHER</Text>
                    
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
        justifyContent: 'flex-start',
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
    button: {
      marginBottom: screenHeight*0.08,
    },
    text: {
      fontFamily: 'Lato-Regular',
      textAlign: 'center',
      fontSize: screenWidth*0.049,
    },
    otherText: {
      fontFamily: 'Lato-Bold',
      textAlign: 'center',
      fontSize: screenWidth*0.049,
      top: screenWidth*0.2,
      position: 'relative',
    },
    medText: {
      fontFamily: 'Lato-Regular',
      textAlign: 'center',
      fontSize: screenWidth*0.049,
      position: 'relative',
    },
    image: {
      height: screenHeight*0.2,
      width: screenWidth*0.2,
      bottom: screenHeight*0.035,
      alignSelf: 'center',
      position: 'relative',
      resizeMode: 'contain',
    },
  })