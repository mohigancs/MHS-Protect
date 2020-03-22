import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Picker } from 'react-native'
import AlertAsync from "react-native-alert-async"
import * as Font from 'expo-font'
import { IconButton } from 'react-native-paper'
import Database from './components/Database'
const db = new Database()
import styles from './components/allStyles'
const screenWidth = Dimensions.get('window').width
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
              <KeyboardAvoidingView style = {styles.contentContainer} behavior = "padding" enabled>
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
                  <Text style = {styles.title}>Medical Emergency</Text>
                    <Text>Type of Emergency</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.emergency}
                        onValueChange={(itemValue, itemIndex) => {
                          this.issue = emergency[itemValue]
                          this.setState({emergency: itemValue})
                        }}>
                        {emergency.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                  <TextInput
                    style={styles.smallInput}
                    placeholder="Students Initials"
                    placeholderTextColor = "black"
                    returnKeyType="default"
                    autoCapitalize="characters"
                    autoCorrect={false}
                    onChange={(text) => this.initials = text.nativeEvent.text}
                  />
                  <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => {
                      console.log(this.issue)
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
