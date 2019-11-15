import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import KeyScreen from './src/screens/KeyScreen';
import AdminScreen from './src/screens/AdminScreen';
import HomeScreen from './src/screens/HomeScreen';
import ConfirmScreen from './src/screens/ConfirmScreen';

import firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

const MainStack = createStackNavigator({
  Home: { 
    screen: HomeScreen 
  },
  Admin: {
    screen: AdminScreen
  },
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
})

const LoginStack = createStackNavigator({
  Key: { 
    screen: KeyScreen 
  },
  Confirm: {
    screen: ConfirmScreen
  },
}, {
  initialRouteName: 'Key',
  headerMode: 'none',
})


const RootStack = createSwitchNavigator ({
  Login: {
    screen: LoginStack
  },
  Main: {
    screen: MainStack
  }
  }, {
  initialRouteName: 'Login',
  headerMode: 'none',
  defaultNavigationOptions: {
    gesturesEnabled: false,
  },
}
);

// firebase.database().ref('alerts/').on('child_added', (snapshot) => {
//   console.log(snapshot.val().description)
// })

const App = new createAppContainer(RootStack);

export default App;

