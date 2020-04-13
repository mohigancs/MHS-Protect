import React from 'react'

import { View, Text, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import * as Font from 'expo-font'

import Database from './components/Database'
const db = new Database()
import styles from './components/allStyles'

export default class AdminScreen extends React.Component {

    entered_id = -1
    state = {
        assetsLoaded: false,
    }
    
    async componentDidMount() {
        await Font.loadAsync({
            'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
            'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf')
        })
    this.setState({ assetsLoaded: true })
    }

    render() {
        const {assetsLoaded} = this.state
        if( assetsLoaded ) {
        return (
            <KeyboardAvoidingView style={styles.contentContainer} behavior="padding" enabled>
                <Text style={styles.title}>Admin Page</Text>
                <Text style={styles.text}>Add Key for User With ID</Text>
                <TextInput
                    style={styles.smallInput}
                    placeholder="ID"
                    placeholderTextColor = 'black'
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(text) => this.entered_id = text.nativeEvent.text}
                    //onSubmitEditing={() => { this.email.focus() }}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        Alert.alert(
                            'Are you sure?',
                            'Do you want to add a key for the user with ID '+ this.entered_id + '?',
                            [
                                {text: 'NO', style: 'cancel'},
                                {text: '',},
                                {text: 'YES', onPress: () => {
                                    if (this.entered_id == 'ALL') {
                                        for(i = 0; i < 147; i++) {
                                            key = db.makekey(10)
                                            db.addkey(i, key)
                                            }
                                    } else {
                                        key = db.makekey(10)
                                        db.addkey(this.entered_id, key)
                                    }
                                }
                                },
                            ],
                            { cancelable: false }
                          )
                        //this.iskey(this.id).then((res) => console.log(res))
                    }}
                >
                    <Text style = {styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Delete Key for User With ID</Text>
                <TextInput
                    style={styles.smallInput}
                    placeholder="ID"
                    placeholderTextColor = 'black'
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(text) => this.entered_id = text.nativeEvent.text}
                    //onSubmitEditing={() => { this.email.focus() }}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        Alert.alert(
                            'Are you sure?',
                            'Do you want to remove the key for the user with ID '+ this.entered_id + '?',
                            [
                                {text: 'NO', style: 'cancel'},                              
                                {text: '',},
                                {text: 'YES', onPress: () => {
                                    if (this.entered_id == 'ALL') {
                                        for(i = 0; i < 147; i++) {
                                            db.removekey(i)
                                        }
                                    } else {
                                        db.removekey(this.entered_id)
                                    }
                                    console.log('YES pressed')
                                    }
                                },
                            ],
                            { cancelable: false }
                        )
                    }}
                >
                    <Text style = {styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }else{
        return (
            <View style={styles.container}>
            </View>
        )
    }
}}
