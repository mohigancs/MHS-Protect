import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';


import Database from './components/Database';
const db = new Database();

export default class KeyScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Messages</Text>
                    <TextInput
                        style={styles.input}
                        onChange={(text) => this.message = text.nativeEvent.text}
                    />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        db.sendMessage(this.message)
                    }}
                >
                    <Text>Send Message</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Home')}
                    >
                    <Text>Return Home</Text>
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
        marginTop: 20,
    },
});