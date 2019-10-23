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
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(text) => this.entered_id = text.nativeEvent.text}
                    //onSubmitEditing={() => { this.email.focus(); }}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        if (this.entered_id == 'ALL') {
                            for(i = 0; i < 147; i++) {
                                key = db.makekey(10);
                                db.addkey(i, key, false);
                            }
                        } else {
                            key = db.makekey(10);
                            db.addkey(this.entered_id, key, true);
                        }
                        //this.iskey(this.id).then((res) => console.log(res))
                    }}
                >
                    <Text>SUBMIT</Text>
                </TouchableOpacity>

                <Text style={styles.option}>Delete Key for User With ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={(text) => this.entered_id = text.nativeEvent.text}
                    //onSubmitEditing={() => { this.email.focus(); }}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        if (this.entered_id == 'ALL') {
                            for(i = 0; i < 147; i++) {
                                db.removekey(i, false);
                            }
                        } else {
                            db.removekey(this.entered_id, true);
                        }
                    }}
                >
                    <Text>SUBMIT</Text>
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
    title: {
        fontSize: 30,
        marginBottom: 50
    },
    option: {
        fontSize: 16
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
        marginBottom: 50
    },
});