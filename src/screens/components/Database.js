var firebase = require('firebase')
import { AsyncStorage, Alert } from 'react-native';

class Database {

// ---------------------User----------------------------------------------------------------------

    fetchUser = async (userID) => {
        await firebase.database().ref('people/' + userID).once('value').then(function(snapshot) {
            user = snapshot.val()
        })
        return user // user is JSON data
    }

    logOutUser = async () => { // temporary function for development
        try {
            await AsyncStorage.setItem('loggedin', 'false');
        } catch (error) {
            console.log("logOutUser error = " + error)
        }
    }

    logInUser = async (uid) => {
        try {
            await AsyncStorage.setItem('loggedin', uid);
        } catch (error) {
            console.log("logInUser error = " + error)
        }
    }

    getUserState = async () => {
        try {
            return await AsyncStorage.getItem('loggedin');
        } catch (error) {
            console.log("getUserState error = " + error)
        }
    }

    addToken(id, token) {
        firebase.database().ref('people/' + id + '/push_token').set(token);
    }


// ---------------------Emergency----------------------------------------------------------------    

    reportEmergency = (description) => { // panic button prototype
        this.getUserState().then(uid => {
            this.fetchUser(uid).then(user => {
                navigator.geolocation.getCurrentPosition(position => {
                    this.getUserTokens(uid).then((tokens) => {
                        for (i = 0; i < tokens.length; i ++){
                            this.sendPushNotification(tokens[i], user.name, user.name + " has pressed the Emergency Button.");
                        }
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
            })
        })
    }

    

// ---------------------Notification---------------------------------------------------------------    

    sendPushNotification = (token, title, body) => {
        let response = fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: token,
                sound:'default',
                title: title,
                body: body
            })
            
        })
    }
    
    getUserTokens = async(omit) => {
        console.log("OMIT " + omit);
        tokens = new Array();
        let db_snapshot = await firebase.database().ref('people/').once('value');
        db_snapshot.forEach(code_snapshot => {
            if ((code_snapshot.val().push_token !== undefined) && (code_snapshot.key !== omit)) {
                tokens.push(code_snapshot.val().push_token);
            }
        })
        console.log(tokens);
        return tokens;
    }



// ---------------------Map------------------------------------------------------------------------



    mapOn = callback => {
        firebase.database().ref('alerts/emergency/')
            .on('child_added', snapshot => {
                callback(this.edit(snapshot))
            })
    }

    mapOff = () => {
        firebase.database().ref('alerts/emergency/').off();
    }

    edit = snapshot => {
        const { name, description } = snapshot.val();
        const { longitude, latitude } = snapshot.val().location;
        const emergency = {
          title: name, 
          description, 
          longitude, 
          latitude,
        };
        
        return emergency;
    }



// ---------------------Messages-------------------------------------------------------------------

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: id } = snapshot;
        const { key: _id } = snapshot; //needed for giftedchat
        const timestamp = new Date(numberStamp);
        
        const message = {
          id,
          _id,
          timestamp,
          text,
          user,
        };
        return message;
    };

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];
        const createdAt = this.timestamp;
        const message = {
            text,
            user,
            createdAt,
        };
        this.getUserTokens(user._id).then((tokens) => {
            for (i = 0; i < tokens.length; i ++){
                this.sendPushNotification(tokens[i], user.name, text);
            }
        })

        firebase.database().ref('alerts/messages').push(message);
        }
    };

    refOn = callback => {
        firebase.database().ref('alerts/messages/')
            .on('child_added', snapshot => {
                callback(this.parse(snapshot))
            })
    }

    refOff = () => {
        firebase.database().ref('alerts/messages/').off();
    }



// ---------------------Key Functions------------------------------------------------------------    

    removekey = (id, verbose) => { // from admin screen
        firebase.database().ref('people/' + id + '/key').remove()
        if (verbose) {
            Alert.alert('The User With ID ' + id + ' Had Their Key Deleted!')
        }
    }

    isValidKey = async (text) => {
        let keyIsFound = false;
        let identifier = '';
        let db_snapshot = await firebase.database().ref('people/').once('value');
        db_snapshot.forEach(code_snapshot => {
            if (text == code_snapshot.val().key) {
                keyIsFound = true;
                identifier = code_snapshot.key;  //gets the key of the whole object not the json object
            }
        });
        
        return [keyIsFound, identifier]; 
    }

    makekey(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    addkey(id, key, verbose) {
        firebase.database().ref('people/' + id + '/key').once('value').then(function(snapshot) {
            if (!snapshot.exists()) {
                firebase.database().ref('people/' + id).update({
                    key: key 
                });
                if (verbose) { 
                    Alert.alert('The User With ID ' + id + ' Now Has Key "' + key + '"') 
                }
            } else {
                if (verbose) { 
                    Alert.alert('The User Already Has Key "' + snapshot.val() + '"') 
                }
            }
        });
    }

    removekey(id, verbose) {
        firebase.database().ref('people/' + id + '/key').remove()
        if (verbose) {
            Alert.alert('The User With ID ' + id + ' Had Their Key Deleted!')
        }
    }

    replacekey(id, verbose) {
        key = this.makekey(10)
        firebase.database().ref('people/' + id).update({
            key: key 
        });
        if (verbose) { 
            Alert.alert('The User With ID : ' + id + ' Now Has An Updated Key : ' + key) 
        }
    }



// ---------------------Admin------------------------------------------------------------------------

    async adduser(email, name, phone, role) {
        id = -1
        await firebase.database().ref('people/').once('value').then(function(snapshot) {
            snapshot.forEach((child) => {
                id = child.key
            }); // this is inefficient. find a better way to get last id without cycling through all ids
        });
        firebase.database().ref('people/' + (parseInt(id) + 1)).set({
            email: email,
            name: name,
            phone: phone,
            role: role
        });
        Alert.alert('Success!', 'User ' + name + ' Added to the Database.')
        this.addkey(parseInt(id) + 1, false); // give them a key
    }

    deleteuser(id) {
        firebase.database().ref('people/' + id).remove();
    } // decrement user-id's at some later date

}

module.exports = Database;