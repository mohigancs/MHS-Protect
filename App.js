import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import KeyScreen from './src/screens/KeyScreen'
import AdminScreen from './src/screens/AdminScreen'
import HomeScreen from './src/screens/HomeScreen'
import ConfirmScreen from './src/screens/ConfirmScreen'
import ChatScreen from './src/screens/ChatScreen'
import MapScreen from './src/screens/MapScreen'
import SliderScreen from './src/screens/SliderScreen'
import TutorialScreen from './src/screens/TutorialScreen'
import IntruderScreen from './src/screens/IntruderScreen'
import MedicalScreen from './src/screens/MedicalScreen'
import HelpScreen from './src/screens/HelpScreen'
import AddUserScreen from './src/screens/AddUserScreen'
import firebase from 'firebase'
import Database from './src/screens/components/Database'
const db = new Database()
import { firebaseConfig } from './config'
firebase.initializeApp(firebaseConfig)
const MainStack = createStackNavigator({
  Home: { 
    screen: HomeScreen // The main screen of the app. Has all the buttons
  },
  Chat: {
    screen: ChatScreen // Used to chat between Principal and teachers
  },
  Map: {
    screen: MapScreen
  },
  Admin: {
    screen: AdminScreen // Principal ONLY screen used to edit database
  },
  Slider: {
    screen: SliderScreen
  },
  Tutorial: {
    screen: TutorialScreen
  },
  Intruder: {
    screen: IntruderScreen
  },
  Medical: {
    screen: MedicalScreen
  },
  Help: {
    screen: HelpScreen
  },
  AddUser: {
    screen: AddUserScreen
  },

}, {
  initialRouteName: 'Home',
  headerMode: 'none',
})

const LoginStack = createStackNavigator({
  Key: { 
    screen: KeyScreen // Users type in special key to login
  },
  Confirm: {
    screen: ConfirmScreen // Confirms the User's credentials
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

// Disables Yellow text on the Virtual Device
console.disableYellowBox = true

const App = new createAppContainer(RootStack)
export default App

