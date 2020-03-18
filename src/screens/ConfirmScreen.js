import React, { Component } from 'react'
import { Image, Text, Dimensions, View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import * as Font from 'expo-font'

import Database from './components/Database'
const db = new Database()
import styles from './components/allStyles'

export default class ConfirmScreen extends React.Component {

    user = this.props.navigation.getParam('user','error')
    state = {
        assetsLoaded: false,
    }
    
    async componentDidMount() {
        await Font.loadAsync({
            'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
        })
    this.setState({ assetsLoaded: true })
    }
    
    // add logic if user is 'error', go back

    render() {

        return (
            <View style={styles.confirmContainer}>
                <View style = {styles.textContainer}>
                    <Text style={styles.confirmTitle}>
                        Is This Correct?
                    </Text>
                    <Image
                    style={styles.confirmImage}
                    source={require('../images/logo.png')} 
                    />
                    <Text style={styles.option}>
                        { this.user[0].name }
                    </Text>
                    <Text style={styles.option}>
                        { this.user[0].email }
                    </Text>
                    <Text style={styles.option}>
                        { this.user[0].phone }
                    </Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity style={styles.confirmButton}
                    onPress={() => {
                        Alert.alert("We're sorry...", 'Ask Mr. Gibson for help.')
                        this.props.navigation.navigate('Key')
                    }}
                    >
                        <Text style = {styles.confirmButtonText}>NO</Text>
                    </TouchableOpacity>
                    <Text>

                    </Text>
                    <TouchableOpacity style={styles.confirmButton}
                    onPress={() => {
                        db.logInUser(this.user[1]).then(() => {
                            //this.removekey(this.user[1])
                            this.props.navigation.navigate('Home')
                        })
                    }}
                    >
                        <Text style = {styles.confirmButtonText}>YES</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}