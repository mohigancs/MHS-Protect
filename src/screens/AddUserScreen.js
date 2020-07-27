import React from 'react'
import ActionSheet from 'react-native-enhanced-actionsheet'
import { View, Text, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import * as Font from 'expo-font'
import {IconButton} from 'react-native-paper'
import { Icon } from 'react-native-elements'
import Database from './components/Database'
const db = new Database()
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
import styles from './components/allStyles'
import AlertAsync from 'react-native-alert-async'

export default class AddUserScreen extends React.Component {
    state = {
        roleVisible: false,
        roleText: 'Select Role',
        assetsLoaded: false,
    }
    
    async componentDidMount() {
        await Font.loadAsync({
            'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
            'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf')
        })
        this.setState({ assetsLoaded: true })
    }
    name = ''
    room = ''
    email = ''
    phone = ''
    render() {
        r = 0
        const role = [
            {id: r++, label: 'Staff'}, 
            {id: r++, label: 'Faculty'},
            {id: r++, label: 'Administrator'}, 
            {id: r++, label: 'Nurse'}, 
            {id: r++, label: 'Resource Officer'}, 
        ]
        return (
            <KeyboardAvoidingView style = {styles.contentContainer} behavior="height" keyboardVerticalOffset = {screenHeight*0.04}>
            <View style = {styles.horizontalContainer}>
                    <IconButton style = {styles.mainTopRightIcon}
                      icon = 'close'
                      color = 'black'
                      size = {screenWidth*0.08}
                      onPress={() => {
                        this.props.navigation.navigate('Admin')
                      }}/>
            </View>
            <View style = {styles.container}>
            <Text style={styles.title}>Add User</Text>
            <TouchableOpacity 
                    style = {styles.fakeSmallInput}
                    onPress = {() => {
                      this.setState({roleVisible: true})
                    }}
                  >
                    <Text style = {styles.actionSheetButtonText}>{this.state.roleText}</Text>
                    <Icon
                      name='down'
                      type='antdesign'
                      color='black'
                    />
                  </TouchableOpacity>
                  <ActionSheet 
                    title = 'Select Role'
                    visible={this.state.roleVisible}
                    data={role} 
                    onOptionPress={(e) => {
                      this.setState({roleVisible: false, roleText: e.label})                  
                    }}
                    onCancelPress={() => this.setState({roleVisible: false})}
                  />
            <TextInput
                ref={input => { this.nameInput = input }}
                style={styles.smallInput}
                placeholder="Name"
                placeholderTextColor = 'black'
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                onChange={(text) => this.name = text.nativeEvent.text}
                //onSubmitEditing={() => { this.email.focus() }}
            />
            <TextInput
                ref={input => { this.mailInput = input }}
                style={styles.smallInput}
                placeholder="Email"
                placeholderTextColor = 'black'
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                onChange={(text) => this.email = text.nativeEvent.text}
                //onSubmitEditing={() => { this.email.focus() }}
            />
            <TextInput
                ref={input => { this.phoneInput = input }}
                style={styles.smallInput}
                placeholder="Phone Number"
                placeholderTextColor = 'black'
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                onChange={(text) => this.phone = text.nativeEvent.text}
                //onSubmitEditing={() => { this.email.focus() }}
            />
            <TextInput
                ref={input => { this.roomInput = input }}
                style={styles.smallInput}
                placeholder="Room"
                placeholderTextColor = 'black'
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                onChange={(text) => this.room = text.nativeEvent.text}
                //onSubmitEditing={() => { this.email.focus() }}
            />
            <TouchableOpacity
                style={styles.button}
                 onPress={() => {
                    if(this.state.roleText == 'Select Role' || this.email == '' || this.name == '' || this.phone == '' || this.room == ''){
                        Alert.alert(
                            'Missing Information',
                            'Please fill in all information.',
                            [],
                            {cancelable: true}
                        
                        )
                    }
                    else{
                     Alert.alert(
                         'Are you sure?',
                         'Do you want to add this user ' +  this.state.roleText + ' '+ this.name +  '\n' + this.email + '\n' + this.phone + '\n' + this.room + '\n ?',
                         [
                             {text: 'NO', style: 'cancel'},                              
                             {text: '',},
                             {text: 'YES', onPress: () => {
                                db.adduser(this.email, this.name, this.phone, this.state.roleText, this.room)
                                this.setState({roleText: 'Select Role'})
                                this.nameInput.clear()
                                this.mailInput.clear()
                                this.phoneInput.clear()
                                this.roomInput.clear()
                                this.email = ''
                                this.name = ''
                                this.phone = ''
                                this.room = ''

                             }
                            },
                         ],
                         { cancelable: false }
                     )
                    }
                 }}
            >
                <Text style = {styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

        );
    }
}
