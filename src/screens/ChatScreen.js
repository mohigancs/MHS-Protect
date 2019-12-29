import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import Database from './components/Database';
import { Platform } from '@unimodules/core';

const db = new Database();

export default class ChatScreen extends Component {

    usr = this.props.navigation.getParam('user','error');

    state = {
        messages: [],
    };

    componentDidMount() {
        db.chatOn(message => {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        })
    }

   get user() { 
        return {
            name: this.usr[0].name,
            email: this.usr[0].email,
            _id: this.usr[1],
        };
    }    

    render() {
        if (Platform.OS === 'ios') {
            return (     
                <View style={{flex:1}}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={db.send}
                        user={this.user}
                    />
                    <KeyboardAvoidingView behavior={'position'}/> 
                </View>
            )
        }
        else {
            return (     
                <View style={{flex:1}}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={db.send}
                        user={this.user}
                    />
                    <KeyboardAvoidingView behavior={'padding'}/> 
                </View>
            )
        }
    }

    componentWillUnmount() {
        db.chatOff();
    }
}

