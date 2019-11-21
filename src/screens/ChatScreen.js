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

        stored = []

        Promise.resolve(db.getMessages()).then(function(value) {
            stored = value
        })

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

    componentDidMount() {
        db.refOn(message => {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        })
    }

    

    
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages,messages),
        }));
        

        
        //messages is an array with an object inside
        db.send()
    }


    render() {
        return (
            
            <View style={{flex:1}}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={db.send}
                    user={{
                        _id:1,
                    }}
                />
                <KeyboardAvoidingView behavior={'padding'}/> 
            </View>
            
            
        )
    }
}