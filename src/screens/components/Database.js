var firebase = require('firebase')
import { AsyncStorage, Alert } from 'react-native'

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

    // returns the ids of the police officers
    findPoliceID = async () => {

        // get the promise of all the users
        let db_snapshot = await firebase.database().ref('people/').once('value')

        var police = new Array()

        // for each user in the users
        db_snapshot.forEach(user_snapshot => {

            if (user_snapshot.val().role == "Admin") {
                police.push(user_snapshot.key)
            }
        })

        return police
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

    reportEmergency = (description) => { // panic button prototype

        this.getUserState().then(uid => { // add alert to the database
            this.fetchUser(uid).then(user => {
                navigator.geolocation.getCurrentPosition(position => {
                        firebase.database().ref('alerts/emergency/').push({
                            user: uid,
                            name: user.name,
                            phone: user.phone,
                            email: user.email,
                            location: {latitude: position.coords.latitude, longitude: position.coords.longitude},
                            description: description
                        })
                }) 
            })

            this.getUserTokens(uid).then((tokens) => { // send all users notifications
                for (i = 0; i < tokens.length; i ++){
                    this.sendPushNotification(tokens[i], user.name, user.name + " has pressed the Emergency Button.")
                }
            })

        })
    }

    requestHelp = (description) => { // request help button (firebase function)
        this.getUserState().then(uid => {
            this.fetchUser(uid).then(user => {
                firebase.database().ref('alerts/help').push({
                    user: uid,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    location: 'coords',
                    description: description
                })
            })
        })

        // send the request for help to the police
        this.sendToPolice(description)
    }

    
    /*

    NOTIFICATION FUNCTIONS

    */

    // send a push notification to a specific user
    sendToUser = (uid, title, description) => {
        this.fetchUser(uid).then((user) => {
            token = user.push_token
            this.sendPushNotification(token, title, description)
        })
    }

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
    
    getUserTokens = async(omit) => { // fetches all user tokens (except for the current user)

        tokens = new Array()

        let db_snapshot = await firebase.database().ref('people/').once('value')

        db_snapshot.forEach(code_snapshot => {
            // check if token exists and isn't the current user's
            if ((code_snapshot.val().push_token !== undefined) && (code_snapshot.key !== omit)) {
                tokens.push(code_snapshot.val().push_token) // append token to array
            }
        })

        return tokens
    }

    // get the tokens of the police
    sendToPolice = async (description) => {

        // get the id of the police officers (async function)
        this.findPoliceID().then((police_ids) => {

            for (i = 0; i < police_ids.length; i ++) {

                this.sendToUser(police_ids[i], "Help", description)
            }
        })
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

        const { name, description } = snapshot.val()
        const { longitude, latitude } = snapshot.val().location

        const emergency = { title: name, description, longitude, latitude}

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

    get timestamp() { // gets firebase timestamp for giftedchat
        return firebase.database.ServerValue.TIMESTAMP
    }

    send = (messages) => { // sends a message (handles giftedchat and firebase)

        for (let i = 0; i < messages.length; i++) {

            const { text, user } = messages[i]
            const createdAt = this.timestamp
            const message = { text, user, createdAt }

            firebase.database().ref('alerts/messages').push(message) // add the message to the firebase

            this.getUserTokens(user._id).then((tokens) => { // sends push notifications to all users
                for (i = 0; i < tokens.length; i ++){
                    this.sendPushNotification(tokens[i], user.name, text)
                }
            })

        }

    }

    chatOn = (callback) => { // ???
        firebase.database().ref('alerts/messages/').on('child_added', (snapshot) => {
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

    async adduser(email, name, phone, role) { // adds a user to the database

        id = -1

        console.log(firebase.database().ref().child('people').getChildrenCount())

        await firebase.database().ref('people/').once('value').then(function(snapshot) { // finds last user id
            console.log(snapshot.getChildrenCount()) // TODO: find a better way to get last id without cycling through all ids
        })

        /*firebase.database().ref('people/' + (parseInt(id) + 1)).set({ // appends user to [last user id] + 1
            email: email,
            name: name,
            phone: phone,
            role: role
        })
    
        Alert.alert('Success!', 'User ' + name + ' Added to the Database.')
        this.addkey(parseInt(id) + 1, false) // give the new user an access key*/

    }

    deleteuser(id) { // deletes a user from the database
        firebase.database().ref('people/' + id).remove()
    } // TODO: decrement user-id's after user is deleted

}

module.exports = Database