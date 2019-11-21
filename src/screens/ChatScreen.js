import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import Database from './components/Database';
const db = new Database();


export default class ChatScreen extends Component {

    

    state = {
        messages: [],
    };

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: "bruh",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "Foo Bar"
                    },
                },
            ],
        });
    }

    
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages,messages),
        }));
        
        //messages is an array with an object inside
        db.sendMessage(messages[0].text)
    }


    render() {
        return (
            
            <View style={{flex:1}}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id:1,
                    }}
                />
                <KeyboardAvoidingView behavior={'padding'}/> 
            </View>
            
            
        )
    }
}