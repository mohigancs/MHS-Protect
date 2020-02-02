import React, { Component } from 'react'
import { Text, Alert, Modal, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
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
export default class HomeScreen extends Component {
  details = ''
  user = this.props.navigation.getParam('user','error')
  state = {
      assetsLoaded: false,
      modalVisible: false,
      helpModalVisible: false,
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }
  setHelpModalVisible(visible) {
    this.setState({helpModalVisible: visible})
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
      this.setModalVisible(false)
    }
    else {
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
              this.setHelpModalVisible(true)
            }}
          />
        </View>
        <Modal
              visible={this.state.helpModalVisible}
              animationType= 'slide'
              onRequestClose={() => {
                this.setHelpModalVisible(false)
                }}>
              <View style = {styles.contentContainer}>
                <View style = {styles.horizontalModalContainer}>
                <IconButton style = {styles.topRightIcon}
                  icon = 'close-box-outline'
                  color = 'black'
                  size = {screenWidth*0.08}
                  onPress={() => {
                      this.setHelpModalVisible(false)
                  }}
                />
                </View>
                <View style = {styles.modalContainer}>
                  <Image
                    style={styles.modalImage}
                    source={require('../images/logo.png')} 
                  />
                  <Paragraph style = {styles.text}>
                    Welcome to MHS-Protect, an app dedicated to keeping our school safe.
                  </Paragraph>
                  <Paragraph>
                  </Paragraph>
                  <Paragraph style = {styles.text}>
                    Tutorial:
                  </Paragraph>
                  <Paragraph style = {styles.tutorialText}>
                    The Messaging Icon shows a teacher groupchat.
                  </Paragraph>
                  <Paragraph style = {styles.tutorialText}>
                    The 'REQUEST HELP' button is for classroom emergencies, such as medical complications or fights.
                  </Paragraph>
                  <Paragraph style = {styles.tutorialText}>
                    The 'EMERGENCY ALERT' button is ONLY for active shooter situations. It will place an automated call to the police.
                  </Paragraph>
                  <Paragraph style = {styles.tutorialText}>
                    The Map Icon shows the user a map of MHS that has pins placed where active shooters have been reported.
                  </Paragraph>
                  <Paragraph></Paragraph>
                  <Paragraph style = {{fontFamily: 'Lato-Regular', textAlign: 'center'}}>
                    Created by: Michael Hoefler, Craig Dombrowski, Amanda Wang, Geoffrey Swisher, Alice Guo
                  </Paragraph>
                </View>
              </View>
          </Modal>


        <View style = {styles.container}>
          <Image
            style={styles.image}
            source={require('../images/logo.png')} 
          />
          <Text style={styles.title}>MHS-Protect</Text>
          <TouchableOpacity 
            style={styles.emergency}
            onPress={() => {
              this.props.navigation.navigate('Slider')
            }}
            >
            <Text style = {styles.buttonText}>EMERGENCY ALERT</Text>
          </TouchableOpacity>

          <Modal
              visible={this.state.modalVisible}
              animationType="slide"
              onRequestClose={() => {
                this.setModalVisible(false)
                }}>
              <View style = {styles.contentContainer}>
                <View style = {styles.horizontalModalContainer}>
                <IconButton style = {styles.topRightIcon}
                  icon = 'close-box-outline'
                  color = 'black'
                  size = {screenWidth*0.08}
                  onPress={() => {
                      this.setModalVisible(false)
                  }}
                />
                </View>
                <View style = {styles.modalContainer}>
                  <Text style = {styles.modalTitle}>Please provide details</Text>
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
              </View>
          </Modal>

          <TouchableOpacity 
            style={styles.help}
            onPress={() => {
              this.setModalVisible(true)   
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
  horizontalModalContainer: {
    flex:1,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 17,
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
  modalImage: {
    height: screenHeight*0.267,
    width: screenWidth*0.487,
    marginBottom: screenHeight*0.02,
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