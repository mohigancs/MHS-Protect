import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import Database from './components/Database';
const db = new Database();

export default class KeyScreen extends React.Component {


    componentDidMount() {
        db.getUserState().then(loggedin => {
            if (loggedin == 'true') {
                this.props.navigation.navigate('Main')
            } 
        })
    }

    key = '';

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Enter Your Key Below</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Access Code"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(text) => this.key = text.nativeEvent.text}
                    //onSubmitEditing={() => {}}
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
                    });
                }}
                >
                    <Text>SUBMIT</Text>
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
        fontSize: 22,
    },
    input: {
        width: 200,
        height: 40,
        backgroundColor: '#e6e6e6',
        marginBottom: 20,
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 20,
    },
    button: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
    },
});