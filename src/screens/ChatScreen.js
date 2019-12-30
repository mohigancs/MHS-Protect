import { GiftedChat } from 'react-native-gifted-chat'
import React, { Component } from 'react'
import { Appbar } from 'react-native-paper'
import { KeyboardAvoidingView, View } from 'react-native'
import { Platform } from '@unimodules/core'

import Database from './components/Database'
const db = new Database()

export default class ChatScreen extends Component {

    usr = this.props.navigation.getParam('user','error')

    state = {
        messages: [],
    }

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
        }
    }    

    render() {
        if (Platform.OS === 'ios') {
            return (     
                <View style={{flex:1}}>
                    <Appbar.Header
                    dark = {true}
                    style={{backgroundColor:'#bfbfbf'}}
                    >
                        <Appbar.Action
                        icon = 'arrow-left'
                        size = {24}
                        color = '#ffffff'
                        onPress={() => this.props.navigation.navigate('Home')} />
                </Appbar.Header>

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
                    <Appbar.Header
                    dark = {true}
                    style={{backgroundColor:'#bfbfbf'}}
                    >
                        <Appbar.Action
                        icon = 'arrow-left'
                        size = {24}
                        color = '#ffffff'
                        onPress={() => this.props.navigation.navigate('Home')} />
                </Appbar.Header>
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
        db.chatOff()
    }
}