import React, { Component } from 'react';
import { Text, Alert, Modal, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import {IconButton} from 'react-native-paper';
import Database from './components/Database';
import Communications from 'react-native-communications';
//this is my favorite page that i've done so far uwu 
const db = new Database()
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default class HomeScreen extends Component {
  state = {
    modalVisible: false,
  };
  details = '';

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <View style = {styles.horizontalContainer}>
          <TouchableOpacity 
              onPress={() => {
                db.logOutUser().then(() => {
                  console.log("logged out");
                    db.getUserState().then((snapshot) => {
                        console.log(snapshot);
                      });
                    this.props.navigation.navigate('Login')
                  });
              }}
          >
          <Text style = {styles.logOut}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.container}>
          <Image
            style={styles.image}
            source={require('../images/logo.jpg')} 
          />
          <Text style={styles.title}>MHS-Protect</Text>
          <TouchableOpacity 
            style={styles.emergency}
            onPress={() => {
              db.reportEmergency('foo', 'description')
            }}
            >
            <Text style = {styles.buttonText}>EMERGENCY ALERT</Text>
          </TouchableOpacity>
          <Modal
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(false);
                }}>
              <View style = {styles.contentContainer}>
              <Text style = {styles.modalTitle}>Please provide details</Text>
              <TextInput 
                style={styles.input}
                placeholder="Details"
                placeholderTextColor = "black"
                returnKeyType="go"
                multiline = {true}
                autoCapitalize="none"
                autoCorrect={false}
                onChange={(text) => this.details = text.nativeEvent.text}
                
              />
              <TouchableOpacity 
                style = {styles.modalButton}
                onPress = {() => {
                  db.requestHelp(this.details);
                  //need to figure out how to text without bringing user out of app, also figure out how to not get modal to close so soon
                  //Communications.textWithoutEncoding('3048255608', this.details);
                  this.setModalVisible(false);
                  Alert.alert('MESSAGE SENT');
                }}
                >
                <Text style = {{fontWeight: 'bold', color: 'white', fontSize: screenWidth*0.0487}}>SUBMIT</Text>
              </TouchableOpacity>
              </View>
          </Modal>
          <TouchableOpacity 
            style={styles.help}
            onPress={() => {
              this.setModalVisible(true);   
            }}
          >
            <Text style = {styles.buttonText}>REQUEST HELP</Text>
          </TouchableOpacity>
        
        </View>

        <View style = {styles.horizontalContainer}>
          <IconButton style = {styles.mapIcon}
            icon = 'google-maps'
            color = 'green'
            size={screenWidth*0.15}
            onPress={() => {
              this.props.navigation.navigate('Map')
            }}
          />
          <IconButton style = {styles.messageIcon}
            icon= 'message-processing'
            size = {screenWidth*0.15}
            color = '#47b9ea'
            onPress={() => {
              db.getUserState().then(uid => {
                db.fetchUser(uid).then(user => {
                  this.props.navigation.navigate('Chat', {user: [user, uid]})
                })
              })
          }}
          />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
      flex: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  input: {
    width: screenWidth*0.7299,
    height: screenHeight*0.0534,
    backgroundColor: '#d3d3d3',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: screenWidth*0.0487,
    paddingHorizontal: screenWidth*0.0487,
    marginBottom: screenHeight*0.0344,
},
  title: {
      fontSize: screenWidth*0.0633,
      fontWeight: 'bold',
      marginBottom: screenHeight*0.02,
  },
  modalTitle: {
    fontSize: screenWidth*0.0633,
    marginBottom: screenHeight*0.05,
  },
  logOut: {
    fontSize: screenWidth*0.0487,
    marginLeft: screenWidth*0.7786,
    top: screenHeight*0.066,
  },
  image: {
    height: screenHeight*0.267,
    width: screenWidth*0.487,
    bottom: screenHeight*0.035,
    marginBottom: screenHeight*0.05,
    position: 'relative',
    resizeMode: 'cover',
  },
  help: {
    width: screenWidth*0.62,
    height: screenHeight*0.0534,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: screenHeight*0.0333,
  },
  messageIcon: {
    marginLeft: screenWidth*0.15,
  },
  mapIcon: {
    marginRight: screenWidth*0.15,
  },
  buttonText: {
    fontSize: screenWidth*0.0487,
    color: 'black',
    fontWeight: 'bold',
  },
  modalButton: {
    width: screenWidth*0.7299,
    height: screenHeight*0.0534,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c80d00',
    borderWidth: 1,
    borderRadius: 5,
  },
  emergency: {
    width: screenWidth*0.62,
    height: screenHeight*0.0534,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c80d00',
    borderWidth: 2.5,
    borderRadius: 5,
    marginBottom: screenHeight*0.0344,
  },
});