import React, { Component } from 'react';
import { Image, Text, Dimensions, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import Database from './components/Database';
const db = new Database();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default class ConfirmScreen extends React.Component {

    user = this.props.navigation.getParam('user','error');

    
    // add logic if user is 'error', go back

    render() {

        return (
            <View style={styles.container}>
                <View style = {styles.textContainer}>
                    <Text style={styles.title}>
                        Is This Correct?
                    </Text>
                    <Image
                    style={styles.image}
                    source={require('../images/logo.jpg')} 
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
                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                        Alert.alert("We're sorry...", 'Ask Mr. Gibson for help.');
                        this.props.navigation.navigate('Key')
                    }}
                    >
                        <Text style = {styles.buttonText}>NO</Text>
                    </TouchableOpacity>
                    <Text>

                    </Text>
                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                        db.logInUser(this.user[1]).then(() => {
                            //this.removekey(this.user[1]);
                            this.props.navigation.navigate('Home')
                        })
                    }}
                    >
                        <Text style = {styles.buttonText}>YES</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    image: {
        marginTop: screenHeight*0.0133,
        top: screenHeight*0.01,
        height: screenHeight*0.267,
        width: screenWidth*0.487,
        alignItems: 'center',
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    title: {
        fontSize: screenWidth*0.0666,
        marginTop: screenHeight*0.027,
    },
    option: {
        fontSize: screenWidth*0.0584,
        fontWeight: 'bold',
        top: screenHeight*0.06,
        marginTop: screenHeight*0.0267,
    },
    button: {
        width: screenWidth*0.45,
        height: screenHeight*0.05,
        top: screenHeight*0.08,
        marginLeft: screenWidth*0.0122,
        marginRight: screenWidth*0.0122,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: '#0a007e',
        borderColor: '#0a007e',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: screenWidth*0.0438,
        color: '#ffffff',
    }
});