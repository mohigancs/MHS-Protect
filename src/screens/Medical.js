import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView, Picker } from 'react-native'
import AlertAsync from "react-native-alert-async"
import * as Font from 'expo-font'
import Database from './components/Database'
const db = new Database()
const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

export default class AdminScreen extends React.Component {

    entered_id = -1
    state = {
        assetsLoaded: false,
    }
    
    onPickerValueChange = (value, index) => {
      this.setState(
        {
          pickerSelected: value
        },
        () => {
  
          console.log(value, index);
  
        }
      );
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
        let emergency = ['Select Item', 'Seizure', 'Overdose', 'Broken Bone', 'Difficulty Breathing', 'Bleeding'];

        return ( 
                <View style = {styles.container}>
                  <Text style = {styles.title}>Intruder Alert</Text>
                    <Text>Type of Threat</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.pickerSelected}
                        onValueChange={(value, index) => this.onPickerValueChange(value, index)}> 
                        {emergency.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                  <TextInput
                    style={styles.input}
                    placeholder="Students Initials"
                    placeholderTextColor = "black"
                    returnKeyType="default"
                    autoCapitalize="characters"
                    autoCorrect={false}
                    onChange={(text) => this.initials = text.nativeEvent.text}
                  />
                  <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            console.log("Submitted Emergency Information")
                        }}
                        >
                            <Text style = {styles.text}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    dropdown: {
        width: screenWidth*0.7299,
        height: screenHeight*0.0534,
        backgroundColor: '#d3d3d3',
        shadowRadius: 2,
        shadowColor: 'rgba(0, 0, 0, 1.0)',
        shadowOpacity: 0.54,
        shadowOffset: { width: 0, height: 2 },
        overflow: 'hidden',
    },
    input: {
      width: screenWidth*0.7299,
      height: screenHeight*0.0534,
      backgroundColor: '#d3d3d3',
      marginBottom: screenHeight*0.027,
      marginTop: screenHeight*0.027,
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 5,
      fontFamily: 'Lato-Bold',
      fontSize: screenWidth*0.0487,
      paddingHorizontal: screenWidth*0.0487,
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
      marginLeft: screenWidth*0.285,
      top: screenHeight*0.057,
    },
    topLeftIcon: {
      marginRight: screenWidth*0.285,
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