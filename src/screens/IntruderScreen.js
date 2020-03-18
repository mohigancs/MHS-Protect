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
        let threat = ['Select Item', 'Gun', 'Bomb', 'Knife'];
        let location = ['Select Item', 'Main Building', 'Science Wing', 'Cafeteria', 'Gym', 'Far Side'];
        let race = ['Select Item', 'White', 'Black', 'Asian', 'Latino', 'Pacific Islander'];
        let gender = ['Select Item', 'Male', 'Female'];
        let injured = ['1', '2', '3', '4', '5 or more'];

        return ( 
                <View style = {styles.container}>
                  <Text style = {styles.title}>Intruder Alert</Text>
                    <Text>Type of Threat</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.pickerSelected}
                        onValueChange={(value, index) => {this.setState({pickerSelected: value})}}> 
                        {threat.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                    <Text>Location</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.pickerSelected}
                        onValueChange={(value, index) => this.onPickerValueChange(value, index)}> 
                        {location.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                    <Text>Race</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.pickerSelected}
                        onValueChange={(value, index) => this.onPickerValueChange(value, index)}> 
                        {race.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                    <Text>Gender</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.pickerSelected}
                        onValueChange={(value, index) => this.onPickerValueChange(value, index)}> 
                        {gender.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>) 
                        })}
                    </Picker>

                    <Text>Number Injured</Text>
                    <Picker
                        style={styles.dropdown}
                        mode="dropdown"
                        selectedValue={this.state.pickerSelected}
                        onValueChange={(value, index) => this.onPickerValueChange(value, index)}> 
                        {injured.map((item, index) => {
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
                    onChange={(text) => this.initials = text.nativeEvent.text}
                  />
                  <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            console.log("Submitted Emergency Information")
                        }}
                        >
                            <Text style = {styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
        )
    }
}

