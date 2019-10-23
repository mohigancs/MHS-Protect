import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import Database from './components/Database';
const db = new Database();

export default class ConfirmScreen extends React.Component {

    user = this.props.navigation.getParam('user','error');
    
    // add logic if user is 'error', go back

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Is This Information Correct?
                </Text>
                <Text style={styles.option}>
                    { this.user[0].name }
                </Text>
                <Text style={styles.option}>
                    { this.user[0].email }
                </Text>
                <Text style={styles.option}>
                    { this.user[0].phone }
                </Text>

                <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    db.logInUser(this.user[1]).then(() => {
                        this.props.navigation.navigate('Home');
                        //this.removekey(this.user[1]);
                    })
                }}
                >
                    <Text>YES</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    Alert.alert("We're sorry...", 'Ask Mr. Gibson for help.');
                    this.props.navigation.navigate('Key')
                }}
                >
                    <Text>NO</Text>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 50
    },
    option: {
        fontSize: 16,
        marginBottom: 10
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
        width: 200,
        height: 40,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
    },
});