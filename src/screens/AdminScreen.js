import React from 'react';

import { StyleSheet, Text, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';

import Database from './components/Database'
const db = new Database();
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

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
                            'Do you want to add a key for the user with ID '+ this.entered_id + '?',
                            [
                                {text: 'NO', style: 'cancel'},
                                {text: '',},
                                {text: 'YES', onPress: () => {
                                    if (this.entered_id == 'ALL') {
                                        for(i = 0; i < 147; i++) {
                                            key = db.makekey(10);
                                            db.addkey(i, key);
                                            }
                                    } else {
                                        key = db.makekey(10);
                                        db.addkey(this.entered_id, key);
                                    }
                                    console.log('YES pressed');
                                    console.log(screenHeight);
                                    console.log(screenWidth);
                                }
                                },
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
                            'Do you want to remove the key for the user with ID '+ this.entered_id + '?',
                            [
                                {text: 'NO', style: 'cancel'},                              
                                {text: '',},
                                {text: 'YES', onPress: () => {
                                    if (this.entered_id == 'ALL') {
                                        for(i = 0; i < 147; i++) {
                                            db.removekey(i);
                                        }
                                    } else {
                                        db.removekey(this.entered_id);
                                    }
                                    console.log('YES pressed');
                                    }
                                },
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
        fontSize: 34,
        fontWeight: 'bold',
        color: '#0a007e',
        marginBottom: screenHeight*0.0534,
        marginTop: screenHeight*0.0534,
    },
    option: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        width: '72.99%',
        height: '5.34%',
        backgroundColor: '#d9d9d9',
        marginTop: screenHeight*0.04,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 20,
    },
    button: {
        width: '72.99%',
        height: '5.34%',
        marginTop: screenHeight*0.04,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c80d00',
        borderColor: '#c80d00',
        borderWidth: 0.5,
        borderRadius: 5,
        marginBottom: screenHeight*0.0668,
    },
});