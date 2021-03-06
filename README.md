# MHS-Protect

IOS and Android application written in React Native to promote communication between school staff during emergencies. Works with school staff, administration, and local authorities. 

## Functionalities
### > Login Screen
Requires credentials to be approved before allowing access to app.

### > Home Screen
Visible right after user login, the home screen displays all the options the app offers. These include:
* intruder alert
* medical emergency
* request help
* map
* chat
* tutorial

### > Intruder Alert
**Created to help law enforcement determine the intruder in a more efficient manner.** To prevent false emergencies, a slider will be the first step to verify that it is indeed an emergency. With options to provide identification of the intruder, any staff member can help alert authorities. 'Text + call 911' and just 'text 911' are both options, depending on situation.

### > The Map
Shows general vicinity of where intruder was first spotted.

### > Medical Emergency
When pressed, nurses will be notified along with nearby teachers who will receive a notification that help is needed.

### > Request Help
For a multitude of purposes, this screen serves to help teachers during classroom instruction in the case of disorderly student conduct that prevents a safe learning environment, etc. Also to be used to notify nearby teachers and/or school officers in the case of a fight.

### > Tutorial
? button at the top of the screen. Gives a quick run-down of the functionalities of the app.

### > Chat Screen
Provides a means of communciation between school staff and administration. Information will be sent out to all users during emergencies, and other non-emergency events, such as:
* bus runnning late
* missing student, etc.

## Components
### > User Functions
Uses Google Firebase to store credentials of all school staff and administration.

### > Panic Button
To report emergencies, intakes information for:
* user
* name
* phone, using Twilio services for call/text
* email
* location, using latitude/longitude coords
* description
and adds alert to database. Request help buttons works with firebase function, and message will be added to database.

### > Notifications 
Alerts will be sent out to all users in times of emergency to spread the information faster. <br/>
**Push Notifications** are sent to the API. <br/>
**Messaging Functions**: gifted chat, utlizes firebase, sent to all users. <br/>
**Access Control Features**: random key id is generated for each user. <br/>
**Admin Features** allows principal to add a new user to databse. Requires inputs for:
* email
* name
* phone
* role
and the new user is given an access key to log in. Also has the ability to delete a user from database.


<img src="https://github.com/mohigancs/MHS-Protect/blob/master/preview.PNG" alt="App Preview" width="300"/>
