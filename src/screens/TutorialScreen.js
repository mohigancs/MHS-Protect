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
                  Welcome to MHS-Protect, an app dedicated to keeping our school safe.
                  Swipe for the tutorial.
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
              <TouchableOpacity 
                style={styles.emergency}
                >
                <Text style = {styles.homeButtonText}>INTRUDER ALERT</Text>
              </TouchableOpacity>
                <Paragraph style = {styles.text}>
                  This is the INTRUDER ALERT button. In the event of an active shooter situation, press this button.
                  It will bring you to a screen with a slider. 
                </Paragraph>
              <Paragraph></Paragraph>
              <SlideToConfirm
                ref={ref => this.slideRef = ref}
                width={screenWidth*0.833}
                onConfirm={()=>{}}
                textColor='white'
                pathColor='#bbbbbb'
                pathCoverColor='#c80d00'
                sliderColor='white'
                text='Slide To Confirm'
              />
                <Paragraph style = {styles.text}>
                  Swipe right on the slider to confirm you want to begin the process of reporting an emergency.
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
                  Emergency procedures blah blah
                </Paragraph>

              </View>
            </View>

        </Swiper>
        )
    }
}

