import React from 'react'
import { Dimensions, Image, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import * as Font from 'expo-font'

import Database from './components/Database'
const db = new Database()
const screenHeight = Dimensions.get('window').height
import styles from './components/allStyles'

export default class KeyScreen extends React.Component {
    state = {
        assetsLoaded: false,
    }
    
    async componentDidMount() {
        await Font.loadAsync({
            'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
        })
        db.getUserState().then(loggedin => {
            if (loggedin == 'true') {
                this.props.navigation.navigate('Home')
            } 
        })
    
        this.setState({ assetsLoaded: true })
    }

    key = ''

    render() {
        const {assetsLoaded} = this.state
        if( assetsLoaded ) {
            return (
                <KeyboardAvoidingView style={styles.contentContainer} behavior="height" keyboardVerticalOffset = {screenHeight*0.07}>
                    <View style={styles.contentContainer}>
                        <Image
                            style={styles.logoImage}
                            source={require('../images/logo.png')} 
                        />
                        <Text style={styles.keyTitle}>Enter Your Key Below</Text>
                        <TextInput
                            style={styles.smallInput}
                            placeholder="Access Code"
                            placeholderTextColor = "black"
                            returnKeyType="go"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChange={(text) => this.key = text.nativeEvent.text}
                            
                            onSubmitEditing={() => {
                                db.isValidKey(this.key).then(result => {
                                    if (result[0]) {
                                        //Alert.alert('Success!', 'Your key was found in the database.')
                                        db.fetchUser(result[1]).then(user => {
                                            this.props.navigation.navigate('Confirm', {user: [user, result[1]]})
                                        })
                                        //db.removekey(result[1], false)
                                    } else {
                                        Alert.alert('Key Not Found.', 'Visit Mr. Gibson for help.')
                                    }
                                })
                            }}
                        />
                        <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            db.isValidKey(this.key).then(result => {
                                if (result[0]) {
                                    //Alert.alert('Success!', 'Your key was found in the database.')
                                    db.fetchUser(result[1]).then(user => {
                                        this.props.navigation.navigate('Confirm', {user: [user, result[1]]})
                                    })
                                    //db.removekey(result[1], false)
                                } else {
                                    Alert.alert('Key Not Found.', 'Visit Mr. Gibson for help.')
                                }
                            })
                        }}
                        >
                            <Text style = {styles.buttonText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            )
        } else {
            return (
                <View style={styles.container}>
                </View>
            )
        }
    }
}