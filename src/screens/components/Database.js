var firebase = require('firebase')
import { AsyncStorage, Alert, Vibration } from 'react-native'
import base64 from 'react-native-base64'

class Database {


    /*

    USER FUNCTIONS

    */


    fetchUser = async (userID) => { // get user json from firebase
        await firebase.database().ref('people/' + userID).once('value').then(function(snapshot) {
            user = snapshot.val()
        })
        return user
    }

    // use asyncstorage to log in the user
    logInUser = async (uid) => await AsyncStorage.setItem('loggedin', uid)

    // set loggedin to false in asyncstorage
    logOutUser = async() => await AsyncStorage.setItem('loggedin', 'false')

    // returns userid if user is logged in (else 'false')
    getUserState = async() => await AsyncStorage.getItem('loggedin')

    // adds notification token to user with id
    addToken = (id, token) => firebase.database().ref('people/' + id + '/push_token').set(token)


    /*

    PANIC BUTTON FUNCTIONS

    */

    reportEmergency = (location, description) => {

  var locations = {
    "Main Building": [39.62449498, -79.9571979],
    "Cafeteria": [39.62408867, -79.9562341],
    "Gym": [39.62403634, -79.95591044],
    "Science Wing": [39.62429114, -79.95629311],
    "Far Side": [29.62513542, -79.95599627],
    "Default": [39.62496188, -79.95674014]
  }

        this.getUserState().then(uid => { // add alert to the database
            this.fetchUser(uid).then(user => {
             
        if (!locations.hasOwnProperty(location)) {
          location = "Default"
        }
        
        nlatitude = locations[location][0]
        nlongitude = locations[location][1]

                    firebase.database().ref('alerts/emergency').push({
                        user: uid,
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        room: user.room,
                        location: location,
                        latitude: nlatitude,
                        longitude: nlongitude,
                        //location: {latitude: position.coords.latitude, longitude: position.coords.longitude},
                        description: description
                    })
                //})
                this.getUserTokens([], uid).then((tokens) => { // send all users notifications
                    for (i = 0; i < tokens.length; i ++){
                        if(i != uid) {
                            this.sendPushNotification(tokens[i], user.name, user.name + " has pressed the Emergency Button.")
                        }
                    }
                })
            })
        })
    }

    requestHelp = (messages) => { // request help button (firebase function)
        const { text, user } = messages[0]
        const createdAt = this.timestamp()
        const message = { text, user, createdAt }

        firebase.database().ref('alerts/help').push(message) // add the message to the firebase
            
        // this.getUserTokens([], user._id).then((tokens) => { // sends push notifications to all users
        //     for (i = 0; i < tokens.length; i ++){
        //         this.sendPushNotification(tokens[i], user.name, text)
        //     }
        // })
    }
    
    phoneCall = (number) => {

      let account_sid = "REDACTED";
      let auth_token = "REDACTED";

      let url = "https://api.twilio.com/2010-04-01/Accounts/" + account_sid + "/Calls.json";

      let authorizationBasic = base64.encode(account_sid + ':' + auth_token)

      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
      xhr.setRequestHeader('Accept', 'application/json');

      let params = "Url=https://pastebin.com/raw/siUcqAJN&To=" + number + "&From=+13043011545";
      xhr.send(params);

    }

    textMessage = (number, body) => {

        let account_sid = "REDACTED";
        let auth_token = "REDACTED";
        let message_sid = "REDACTED";
        
        let url = 'https://api.twilio.com/2010-04-01/Accounts/' + account_sid + '/Messages.json'

        let authorizationBasic = base64.encode(account_sid + ':' + auth_token)

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
        xhr.setRequestHeader('Accept', 'application/json');

        let params = "MessagingServiceSid=" + message_sid + "&To=" + number + "&Body=" + body;
        xhr.send(params);

    }

    
    
    /*

    NOTIFICATION FUNCTIONS

    */

    sendPushNotification = (token, title, body) => { // sends pushs notification to the API
        let response = fetch('https://exp.host/--/api/v2/push/send',{ 
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify({
                to: token, // this token identifies the phone to be notified
                sound:'default',
                title: title,
                body: body
            })
            
        })
        return response
    }
    
    getUserTokens = async(group, current) => { // fetches user tokens in group, all if empty list

        tokens = new Array()

        let db_snapshot = await firebase.database().ref('people/').once('value')

        db_snapshot.forEach(code_snapshot => {
            // check if token exists and isn't the current user's
            if (
                    code_snapshot.val().push_token !== undefined &&
                    code_snapshot.key !== current &&
                    (group.includes(code_snapshot.key) || group.length == 0)
                ) {
                    tokens.push(code_snapshot.val().push_token) // append token to array
            }
        })

        return tokens
    }
    

    /*

    MAP FUNCTIONS

    */


    mapOn = callback => { // ???
        firebase.database().ref('alerts/emergency/').on('child_added', snapshot => {
            callback(this.edit(snapshot))
        })
    }

    mapOff = () => { // ???
        firebase.database().ref('alerts/emergency/').off()
    }

    edit = snapshot => { // ??? (used in mapOn)
        var name = snapshot.val().name
        var description = snapshot.val().description
        var longitude = snapshot.val().longitude
        var latitude  = snapshot.val().latitude
        var room = snapshot.val().room
        var emergency = {name, description, longitude, latitude, room}
        return emergency
    }


    /*

    MESSAGING FUNCTIONS

    */

    parse = (snapshot) => {

        const { timestamp: numberStamp, text, user } = snapshot.val()
        const { key: id } = snapshot
        const { key: _id } = snapshot // for giftedchat
        const timestamp = new Date(numberStamp)
        
        const message = {
          id, _id, timestamp, text, user
        }

        return message
    }

    timestamp() { // gets firebase timestamp for giftedchat
        return firebase.database.ServerValue.TIMESTAMP
    }

    send = (messages, group) => { // sends a message (handles giftedchat and firebase)

        const { text, user } = messages[0]
        const createdAt = this.timestamp()
        const message = { text, user, createdAt }

        firebase.database().ref('alerts/messages/' + group).push(message) // add the message to the firebase

        this.getUserTokens([], user._id).then((tokens) => { // sends push notifications to all users
            for (i = 0; i < tokens.length; i ++){
                if(i != uid){
                    this.sendPushNotification(tokens[i], user.name, user.name + " has pressed the Emergency Button.")
                }
            }
        })
    
    }

    chatOn = (callback, group) => { // ???
        firebase.database().ref('alerts/messages/' + group).on('child_added', (snapshot) => {
            callback(this.parse(snapshot))
        })
    }

    chatOff = () => firebase.database().ref('alerts/messages/').off() // ???


    /*

    ACCESS CONTROL FUNCTIONS

    */


    isValidKey = async(text) => { // checks if a key is valid and returns the keyholder's user id
        let keyIsFound = false
        let identifier = ''
        let db_snapshot = await firebase.database().ref('people/').once('value')
        db_snapshot.forEach(code_snapshot => {

            // code_snapshot.key is the user id (key of the JSON object)
            // code_snapshot.val().key gets the access key's value

            if (text == code_snapshot.val().key) {
                keyIsFound = true
                identifier = code_snapshot.key
            }
        })
        
        return [keyIsFound, identifier]
    }

    makekey(length) { // makes a random key with a specified length
        var result = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var charactersLength = characters.length
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    addkey(id, key) { // add access key to user with id
        firebase.database().ref('people/' + id + '/key').once('value').then(function(snapshot) {
            if (!snapshot.exists()) {
                firebase.database().ref('people/' + id).update({
                    key: key 
                })
            }
        })
    }

    // remove key from user with id
    removekey = (id) => firebase.database().ref('people/' + id + '/key').remove()


    /*

    ADMIN FEATURES

    */
    async removeEmergency(){
        firebase.database().ref('alerts/emergency').remove()
    }
    async adduser(email, name, phone, role, room) { // adds a user to the database

        id = -1

    await firebase.database().ref('people/').limitToLast(1).once('value').then(function(snapshot) {
        snapshot.forEach((child) => {
            id = child.key
        })
    })


        firebase.database().ref('people/' + (parseInt(id) + 1)).set({  
            email: email,
            name: name,
            phone: phone,
            role: role,
            room: room
        })

        Alert.alert('Success!', 'User ' + name + ' Added to the Database.')
        this.addkey(parseInt(id) + 1, false)  

    }

    deleteuser(id) { // deletes a user from the database
        firebase.database().ref('people/' + id).remove()
    } // TODO: decrement user-id's after user is deleted

}

module.exports = Database
