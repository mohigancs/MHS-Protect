import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import Database from './components/Database';
const db = new Database();


export default class ChatScreen extends Component {

    state = {
        messages: [],
    };

    get user() {
        db.getUserState().then(uid => {
            db.fetchUser(uid).then(user => {
                return {
                    name: user.name,
                    email: user.email,
                    _id: 1,
                };
            })
        })

        // proper format for user
        // return {
        //     name: "foo bar",
        //     email: "foo@bar.bar",
        //     _id: 1,
        // }
    }
    componentWillMount() {
        stored = []
        Promise.resolve(db.getMessages()).then(function(value) {
            stored = value
        })

        this.setState({
            messages: [],
        });
    }

    componentDidMount() {
        db.refOn(message => {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        })
    }

    // Works fine without this lol
    // onSend(messages = []) {
    //     this.setState(previousState => ({
    //         messages: GiftedChat.append(previousState.messages,messages),
    //     }));
        
    //     //messages is an array with an object inside
    //     db.send()
    // }

    render() {
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