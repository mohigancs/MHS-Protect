import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import * as Font from 'expo-font'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

import Database from './components/Database'
const db = new Database()

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
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={require('../images/logo.jpg')} 
                    />
                    <Text style={styles.title}>Enter Your Key Below</Text>
                    <TextInput
                        style={styles.input}
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
                        <Text style = {styles.text}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: screenHeight*0.267,
        width: screenWidth*0.487,
        resizeMode: 'cover',
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: screenWidth*0.0833,
    },
    text: {
        fontSize: screenWidth*0.06,
        fontFamily: 'Lato-Bold',
        color: 'white',
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
    button: {
        width: screenWidth*0.7299,
        height: screenHeight*0.0534,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c80d00',
        borderColor: '#c80d00',
        borderWidth: 0.5,
        borderRadius: 5,
        resizeMode: 'cover',
    },
})