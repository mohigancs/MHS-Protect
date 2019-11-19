import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import Database from './components/Database';
const db = new Database();
export default class ConfirmScreen extends React.Component {

    user = this.props.navigation.getParam('user','error');

    
    // add logic if user is 'error', go back

    render() {

        return (
            <View style={styles.container}>
                <View style = {styles.textContainer}>
                    <Text style={styles.title}>
                        Is This Information Correct?
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
        marginTop: 10,
        height: 200,
        width: 200,
        alignItems: 'center',
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        top: 60,
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 2,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    option: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        backgroundColor: '#e6e6e6',
        marginBottom: 5,
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 20,
    },
    button: {
        width: 185,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: '#0a007e',
        borderColor: '#0a007e',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ffffff',
    }
});