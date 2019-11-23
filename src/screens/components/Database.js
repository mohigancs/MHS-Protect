var firebase = require('firebase')
import { AsyncStorage } from 'react-native';

class Database {

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

    getUserState = async () => {
        try {
            return await AsyncStorage.getItem('loggedin');
        } catch (error) {
            console.log("getUserState error = " + error)
        }
    }

    reportEmergency = (title, description) => { // panic button prototype
        this.getUserState().then(uid => {
            this.fetchUser(uid).then(user => {
                firebase.database().ref('alerts/emergency/').push({
                    user: uid,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    location: 'coords',
                    title: title,
                    description: description
                })
            })
        })
    }

    getMessages = async () => {
        messages = []

        let db_snapshot = await firebase.database().ref('alerts/messages').once('value');

        db_snapshot.forEach(code_snapshot => {
            messages.push(code_snapshot.val());
        });

        return messages;
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        // const { key: id } = snapshot;
        const { key: _id } = snapshot; //needed for giftedchat
        const timestamp = new Date(numberStamp);
    
        const message = {
        //   id,
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

    removekey = (id, verbose) => { // from admin screen
        firebase.database().ref('people/' + id + '/key').remove()
        if (verbose) {
            Alert.alert('The User With ID ' + id + ' Had Their Key Deleted!')
        }
    }

    logInUser = async (uid) => {
        try {
            await AsyncStorage.setItem('loggedin', uid);
        } catch (error) {
            console.log("logInUser error = " + error)
        }
    }

    isValidKey = async (text) => {
        let keyIsFound = false;
        let identifier = '';
        let db_snapshot = await firebase.database().ref('people/').once('value');
        db_snapshot.forEach(code_snapshot => {
            if (text == code_snapshot.val().key) {
                keyIsFound = true;
                identifier = code_snapshot.key;
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