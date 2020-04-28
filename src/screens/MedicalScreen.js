import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView} from 'react-native'
import AlertAsync from "react-native-alert-async"
import * as Font from 'expo-font'
import ActionSheet from 'react-native-enhanced-actionsheet'
import { IconButton } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import { Notifications } from 'expo'
import Database from './components/Database'
const db = new Database()
import styles from './components/allStyles'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
export default class AdminScreen extends React.Component {


  
  initials = ''
  entered_id = -1
  state = {
    medicalText: 'Type of Emergency',
    assetsLoaded: false,
    visible: false,
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
      count = 0
      const options = [
        {id: count++, label: 'Seizure'}, 
        {id: count++, label: 'Overdose'}, 
        {id: count++, label: 'Broken Bone'},
        {id: count++, label: 'Difficulty Breathing'}, 
        {id: count++, label: 'Bleeding'},
        {id: count++, label: 'Unknown'},
      ]
        return ( 
              <KeyboardAvoidingView style = {styles.contentContainer} behavior="height" keyboardVerticalOffset = {screenHeight*0.07}>
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

                  <TouchableOpacity 
                    style = {styles.fakeSmallInput}
                    onPress = {() => {
                      this.setState({visible: true})
                    }}
                    >
                    <Text style = {styles.actionSheetButtonText}>{this.state.medicalText}</Text>
                    <Icon
                      name='down'
                      type='antdesign'
                      color='black'
                    />
                  </TouchableOpacity>
                  <ActionSheet 
                    visible={this.state.visible}
                    title = 'Type of Emergency'
                    data={options} 
                    onOptionPress={(e) => this.setState({visible: false, medicalText: e.label})}
                    onCancelPress={() => this.setState({visible: false})}
                  />
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
                      a = this.state.medicalText
                      if(a == 'Type of Emergency'){
                        a = 'Unspecified Emergency'
                      }
                      b = this.initials
                      if(b == ''){
                        a = 'Unspecified Student Initials'
                      }
                      db.getUserState().then(uid => {
                        db.fetchUser(uid).then(user => {
                          this.emergency = 'Medical Emergency. Type: ' + a + '\nStudent Initials: ' + b + '\n'+ 'Room: ' + user.key;
                          db.requestHelp([{_id:user.uid, createdAt:0, text: this.emergency, user:{_id:uid, email:user.email, name:user.name}}])
                          // db.textMessage('NUMBER', this.emergency)
                        })
                      })
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
