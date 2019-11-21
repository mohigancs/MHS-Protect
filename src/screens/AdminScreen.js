import React from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';

import Database from './components/Database'
const db = new Database();

export default class AdminScreen extends React.Component {

    entered_id = -1;

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={styles.title}>Admin Page</Text>
                <Text style={styles.option}>Add Key for User With ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    placeholderTextColor = 'black'
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(text) => this.entered_id = text.nativeEvent.text}
                    //onSubmitEditing={() => { this.email.focus(); }}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        Alert.alert(
                            'Are you sure?',
                            'Do you want to add the user with ID '+ this.entered_id + '?',
                            [
                              {text: 'YES', onPress: () => {
                                if (this.entered_id == 'ALL') {
                                    for(i = 0; i < 147; i++) {
                                        key = db.makekey(10);
                                        db.addkey(i, key, false);
                                        }
                                } else {
                                    key = db.makekey(10);
                                    db.addkey(this.entered_id, key, true);
                                }
                                console.log('YES pressed');
                            }
                            },
                                {text: '',},
                                {text: 'NO', style: 'cancel'},
                            ],
                            { cancelable: false }
                          );
                        //this.iskey(this.id).then((res) => console.log(res))
                    }}
                >
                    <Text style = {styles.text}>SUBMIT</Text>
                </TouchableOpacity>

                <Text style={styles.option}>Delete Key for User With ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    placeholderTextColor = 'black'
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(text) => this.entered_id = text.nativeEvent.text}
                    //onSubmitEditing={() => { this.email.focus(); }}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        Alert.alert(
                            'Are you sure?',
                            'Do you want to remove the user with ID '+ this.entered_id + '?',
                            [
                              {text: 'YES', onPress: () => {
                                if (this.entered_id == 'ALL') {
                                    for(i = 0; i < 147; i++) {
                                        db.removekey(i, false);
                                    }
                                } else {
                                    db.removekey(this.entered_id, true);
                                }
                                console.log('YES pressed');
                            }
                            },
                                {text: '',},
                                {text: 'NO', style: 'cancel'},
                            ],
                            { cancelable: false }
                          );
                    }}
                >
                    <Text style = {styles.text}>SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    title: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#0a007e',
        marginBottom: 50,
    },
    option: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: 300,
        height: 40,
        backgroundColor: '#d9d9d9',
        marginBottom: 5,
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 20,
    },
    button: {
        width: 300,
        height: 40,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c80d00',
        borderColor: '#c80d00',
        borderWidth: 0.5,
        borderRadius: 5,
        marginBottom: 50,
    },
});