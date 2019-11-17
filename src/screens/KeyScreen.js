import React from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
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
                <Image
                    style={styles.image}
                    source={require('../images/logo.jpg')} 
                />
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
                    <Text style = {styles.text}>SUBMIT</Text>
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
    image: {
        height: 300,
        width: 300,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 26,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    input: {
        width: 300,
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
        width: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 0.5,
        borderRadius: 5,
        resizeMode: 'cover',
    },
});