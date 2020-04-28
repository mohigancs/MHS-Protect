import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView} from 'react-native'
import AlertAsync from "react-native-alert-async"
import * as Font from 'expo-font'
import ActionSheet from 'react-native-enhanced-actionsheet'
import { IconButton } from 'react-native-paper'
import { Notifications } from 'expo'
import { Icon } from 'react-native-elements'
import Database from './components/Database'
const db = new Database()
import styles from './components/allStyles'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
export default class AdminScreen extends React.Component {


  
  details = ''
  entered_id = -1
  state = {
    problemText: 'Type of Issue',
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
        {id: count++, label: 'Fight'}, 
        {id: count++, label: 'Other'}, 
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
                  <Text style = {styles.title}>Request Help</Text>

                  <TouchableOpacity 
                    style = {styles.fakeSmallInput}
                    onPress = {() => {
                      this.setState({visible: true})
                    }}
                    >
                    <Text style = {styles.actionSheetButtonText}>{this.state.problemText}</Text>
                    <Icon
                      name='down'
                      type='antdesign'
                      color='black'
                    />
                  </TouchableOpacity>
                  <ActionSheet 
                    visible={this.state.visible}
                    title = 'Type of Issue'
                    data={options} 
                    onOptionPress={(e) => this.setState({visible: false, problemText: e.label})}
                    onCancelPress={() => this.setState({visible: false})}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Details"
                    placeholderTextColor = "black"
                    returnKeyType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(text) => this.details = text.nativeEvent.text}
                  />
                  <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => {
                      a = this.state.problemText
                      if(a == 'Type of Issue'){
                        a = 'Unknown'
                      }
                      db.getUserState().then(uid => {
                        db.fetchUser(uid).then(user => {
                          this.emergency = 'Help Requested. Problem: ' + a + '\n Details: ' + this.details + '\n'+ 'Room: ' + user.key;
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
