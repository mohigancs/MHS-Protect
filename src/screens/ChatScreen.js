import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import { KeyboardAvoidingView, View, StyleSheet, Dimensions} from 'react-native';
import Database from './components/Database';
const db = new Database();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class ChatScreen extends Component {

    usr = this.props.navigation.getParam('user','error');

    state = {
        messages: [],
    };

    componentDidMount() {
        db.refOn(message => {
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
        return (     
        <View style = {{flex:1}}>
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
                    //onSubmitEditing={db.send} this don't work and idk why hnghh
                    onSend={db.send}
                    user={this.user}
            />
            <KeyboardAvoidingView behavior={'padding'}/> 
        </View>
        )
    }

    componentWillUnmount() {
        db.refOff();
    }
}
const styles = StyleSheet.create({
    top: {
        position: 'relative',
        backgroundColor: '#bfbfbf',
    },
});