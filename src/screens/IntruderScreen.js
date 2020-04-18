import React from 'react';
import { Text, View,TextInput, TouchableOpacity, Alert, Image, Dimensions, KeyboardAvoidingView } from 'react-native'
import * as Font from 'expo-font'
import { Notifications } from 'expo'
import ActionSheet from 'react-native-enhanced-actionsheet'
import { IconButton } from 'react-native-paper'
import Database from './components/Database'
const db = new Database()
import styles from './components/allStyles'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
export default class AdminScreen extends React.Component {
    entered_id = -1
    state = {
        threatText: 'Type of Threat',
        locationText: 'Select Location',
        gunmenText: 'Number of Gunmen',
        raceText: 'Race',
        sexText: 'Gender',
        injuredText: 'Number Injured',
        assetsLoaded: false,
        threatVisible: false,
        locationVisible: false,
        raceVisible: false,
        sexVisible: false,
        injuredVisible: false,
        gunmenVisible: false,
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
        t = 0
        const threat = [
          {id: t++, label: 'Gun'}, 
          {id: t++, label: 'Bomb'}, 
          {id: t++, label: 'Knife'},
          {id: t++, label: 'Unknown'}, 
        ]
        l = 0
        const location = [
          {id: l++, label: 'Main Building'}, 
          {id: l++, label: 'Science Wing'}, 
          {id: l++, label: 'Cafeteria'},
          {id: l++, label: 'Gym'}, 
          {id: l++, label: 'Far Side'},
          {id: l++, label: 'Unknown'},  
        ]
        r = 0
        const race = [
          {id: r++, label: 'White'}, 
          {id: r++, label: 'Black'}, 
          {id: r++, label: 'Asian'},
          {id: r++, label: 'Latino'}, 
          {id: r++, label: 'Pacific Islander'},
          {id: r++, label: 'Unknown'},  
        ]
        s = 0
        const sex = [
          {id: s++, label: 'Male'}, 
          {id: s++, label: 'Female'}, 
          {id: s++, label: 'Unknown'},  
        ]
        i = 0
        const injured = [
          {id: i++, label: '0'}, 
          {id: i++, label: '1'}, 
          {id: i++, label: '2'}, 
          {id: i++, label: '3'},
          {id: i++, label: '4'},
          {id: i++, label: '5+'},   
          {id: i++, label: 'Unknown'},  
        ]
        g = 0 
        const gunmen = [
          {id: g++, label: '1'},
          {id: g++, label: '2'},
          {id: g++, label: '3'},
          {id: g++, label: '4'},
          {id: g++, label: '5+'},
          {id: g++, label: 'Unknown'},
        ]  

         return ( 
                <KeyboardAvoidingView style = {styles.contentContainer} behavior="height"
                keyboardVerticalOffset={screenHeight*0.3}>
                  <View style = {styles.horizontalContainer}>
                    <IconButton style = {styles.mainTopRightIcon}
                      icon = 'close'
                      color = 'black'
                      size = {screenWidth*0.08}
                      onPress={() => {
                        this.props.navigation.navigate('Home')
                      }}/>
                  </View>
                  <View style = {styles.intruderContainer}>
                  <Text style = {styles.title}>Intruder Alert</Text>
                  <TouchableOpacity 
                    style = {styles.fakeSmallInput}
                    onPress = {() => {
                      this.setState({threatVisible: true})
                    }}
                  >
                    <Text style = {styles.actionSheetButtonText}>{this.state.threatText}</Text>
                  </TouchableOpacity>
                  <ActionSheet 
                    title = 'Type of Threat'
                    visible={this.state.threatVisible}
                    data={threat} 
                    onOptionPress={(e) => {
                      this.setState({threatVisible: false, threatText: e.label})                  
                    }}
                    onCancelPress={() => this.setState({threatVisible: false})}
                  />
                  <TouchableOpacity 
                    style = {styles.fakeSmallInput}
                    onPress = {() => {
                      this.setState({locationVisible: true})
                    }}
                    >
                    <Text style = {styles.actionSheetButtonText}>{this.state.locationText}</Text>
                  </TouchableOpacity>
                  <ActionSheet 
                    title = 'Location'
                    visible={this.state.locationVisible}
                    data={location} 
                    onOptionPress={(e) => this.setState({locationVisible: false, locationText: e.label})}
                    onCancelPress={() => this.setState({locationVisible: false})}
                  />
                  <TouchableOpacity 
                    style = {styles.fakeSmallInput}
                    onPress = {() => {
                      this.setState({raceVisible: true})
                    }}
                    >
                    <Text style = {styles.actionSheetButtonText}>{this.state.raceText}</Text>
                  </TouchableOpacity>
                  <ActionSheet 
                    title = 'Race'
                    visible={this.state.raceVisible}
                    data={race} 
                    onOptionPress={(e) => this.setState({raceVisible: false, raceText: e.label})}
                    onCancelPress={() => this.setState({raceVisible: false})}
                  />
                  <TouchableOpacity 
                    style = {styles.fakeSmallInput}
                    onPress = {() => {
                      this.setState({sexVisible: true})
                    }}
                    >
                    <Text style = {styles.actionSheetButtonText}>{this.state.sexText}</Text>
                  </TouchableOpacity>
                  <ActionSheet 
                    title = 'Gender'
                    visible={this.state.sexVisible}
                    data={sex} 
                    onOptionPress={(e) => this.setState({sexVisible: false, sexText: e.label})}
                    onCancelPress={() => this.setState({sexVisible: false})}
                  />

                  <TouchableOpacity 
                    style = {styles.fakeSmallInput}
                    onPress = {() => {
                      this.setState({injuredVisible: true})
                    }}
                    >
                    <Text style = {styles.actionSheetButtonText}>{this.state.injuredText}</Text>
                  </TouchableOpacity>
                  <ActionSheet 
                    title = 'Number Injured'
                    visible={this.state.injuredVisible}
                    data={injured} 
                    onOptionPress={(e) => this.setState({injuredVisible: false, injuredText: e.label})}
                    onCancelPress={() => this.setState({injuredVisible: false})}
                  />
                    
                  <TouchableOpacity 
                    style = {styles.fakeSmallInput}
                    onPress = {() => {
                      this.setState({gunmenVisible: true})
                    }}
                    >
                    <Text style = {styles.actionSheetButtonText}>{this.state.gunmenText}</Text>
                  </TouchableOpacity>
                  <ActionSheet 
                    title = 'Number Gunmen'
                    visible={this.state.gunmenVisible}
                    data={gunmen} 
                    onOptionPress={(e) => this.setState({gunmenVisible: false, gunmenText: e.label})}
                    onCancelPress={() => this.setState({gunmenVisible: false})}
                  />
                    

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
                          db.getUserState().then(uid => {
                            db.fetchUser(uid).then(user => {
                            this.message = user.name + ' has detected a ' + this.state.threatText + ' threat. The ' + this.state.gunmenText + ' intruder(s) were spotted near the ' + this.state.locationText + '. The intruder is a ' + this.state.raceText + ' ' + this.state.sexText + '. Their clothing is ' + this.clothing + '.' 
                                db.send([{_id:user.uid, createdAt:0, text: this.message, user:{_id:uid, email:user.email, name:user.name}}])
                                  setTimeout(() => {this.props.navigation.navigate('Chat', {user: [user, uid]})},500)  
                                  // db.textMessage('NUMBER', this.message)
                              })
                            })
                        }}
                    >
                          <Text style = {styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                    </View>
                  <View style={{ height: screenHeight*0.05 }} />
                </KeyboardAvoidingView>
        )
    }
}

