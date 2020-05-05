import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import { IconButton, Paragraph } from 'react-native-paper'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import * as Font from 'expo-font'
import SlideToConfirm from 'react-native-slide-to-confirm';
import styles from './components/allStyles'
const screenWidth = Dimensions.get('window').width
import Database from './components/Database'
const db = new Database()
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
                  Welcome to SchoolProtect, an app dedicated to keeping our school safe.
                  Swipe for the the MHS Active Intruder procedures.
                </Paragraph>
              </View>
            </View>

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
                <Paragraph style = {styles.text}>
                  Alert - Try to provide as much information as you can to 911 with the Intruder Alert button.
                  If you can call 911, hit the 'Call and Text' button to provide more information.
                </Paragraph>
              </View>
            </View>
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
                <Paragraph style = {styles.text}>
                  Lockdown - If the intruder is reported to be in an area far away from you and you have enough
                  time to evacuate, EVACUATE. If not, shelter in place, lock the doors and barricade the entrances.
                </Paragraph>
              </View>
            </View>
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
                <Paragraph style = {styles.text}>
                  Inform - Even if the Intruder Alert button has been pressed and messages have been sent, if you see something,
                  press the button! This will update the information for emergency responders.
                </Paragraph>
              </View>
            </View>
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
                <Paragraph style = {styles.text}>
                  Counter - If you are unable to evacuate and are with the intruder, take a stand.
                  Be a hard target; move around and throw things and yell to distract the intruder. If the intruder is not making a move, run.
                </Paragraph>
              </View>
            </View>
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
                <Paragraph style = {styles.text}>
                  Evacuate - If the opportunity presents itself, exit the building and go to the designated safe zone.
                </Paragraph>
              </View>
            </View>
        </Swiper>
        )
    }
}

