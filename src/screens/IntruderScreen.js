import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, KeyboardAvoidingView, Picker } from 'react-native'
import AlertAsync from "react-native-alert-async"
import * as Font from 'expo-font'
import Database from './components/Database'
const db = new Database()
import styles from './components/allStyles'

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
        let threat = ['Unknown', 'Gun', 'Bomb', 'Knife'];
        let location = ['Unknown', 'Main Building', 'Science Wing', 'Cafeteria', 'Gym', 'Far Side'];
        let race = ['Unknown', 'White', 'Black', 'Asian', 'Latino', 'Pacific Islander'];
        let gender = ['Unknown', 'Male', 'Female'];
        let injured = ['Unknown', '0', '1', '2', '3', '4', '5+'];
        let gunmen = ['1', '2', '3', '4', '5+'];
        // this.threat = threat[0]
        // this.location = location[0]
        // this.race = race[0]
        // this.gender = gender[0]
        // this.injured = injured[0]
        this.gunmen = gunmen[0]
        this.clothing = 'unknown'
        return ( 
                <View style = {styles.container}>
                  <Text style = {styles.title}>Intruder Alert</Text>
                    <Text>Type of Threat</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.threat}
                        onValueChange={(itemValue, itemIndex) => {
                          this.threat = threat[itemValue]
                          this.setState({threat: itemValue})
                        }}>
                        {threat.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                    <Text>Location</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.location}
                        onValueChange={(itemValue, itemIndex) => {
                          this.location = location[itemValue]
                          this.setState({location: itemValue})
                        }}>
                        {location.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                    <Text>Race</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.race}
                        onValueChange={(itemValue, itemIndex) => {
                          this.race = race[itemValue]
                          this.setState({race: itemValue})
                        }}>
                        {race.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                    <Text>Gender</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.gender}
                        onValueChange={(itemValue, itemIndex) => {
                          this.gender = gender[itemValue]
                          this.setState({gender: itemValue})
                        }}> 
                        {gender.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                    <Text>Number Injured</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.numberInjured}
                        onValueChange={(itemValue, itemIndex) => {
                          this.injured = injured[itemValue]
                          this.setState({numberInjured: itemValue})
                        }}>
                        {injured.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                    <Text>Number of Intruders</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.numberOfIntruders}
                        onValueChange={(itemValue, itemIndex) => {
                          this.gunmen = gunmen[itemValue]
                          this.setState({numberOfIntruders: itemValue})
                        }}>
                        {gunmen.map((item, index) => {
                          return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                  <TextInput
                    style={styles.input}
                    placeholder="Clothing Description"
                    placeholderTextColor = "black"
                    returnKeyType="default"
                    autoCapitalize="characters"
                    autoCorrect={false}
                    onChange={(text) => this.clothing = text.nativeEvent.text}
                  />
                  <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                          // console.log(this.threat, this.location, this.race, this.gender, this.gunmen, this.injured, this.clothing)
                          console.log("Submitted Emergency Information")
                          db.getUserState().then(uid => {
                            db.fetchUser(uid).then(user => {
                              this.message = user.name + ' has detected a ' + this.threat + ' threat. The ' + this.gunmen + ' intruder(s) were spotted near the ' + this.location + '. The intruder is a ' + this.race + ' ' + this.gender + '. Their clothing is ' + this.clothing + '.' 
                              db.send([{_id:user.uid, createdAt:0, text: this.message, user:{_id:uid, email:user.email, name:user.name}}])
                              this.props.navigation.navigate('Chat', {user: [user, uid]})
                            })
                          })
                        }}
                        >
                          <Text style = {styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
        )
    }
}

