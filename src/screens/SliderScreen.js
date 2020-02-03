import React, {Component} from 'react';
import { View, Text, Dimensions, StyleSheet} from 'react-native';
import { IconButton, Paragraph } from 'react-native-paper'
import AlertAsync from "react-native-alert-async"
import SlideToConfirm from 'react-native-slide-to-confirm';
import Database from './components/Database'
const db = new Database()
const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

export default class Slider extends Component {
  alert = async () => {
    const choice = await AlertAsync(
      'Active Intruder Reported',
      '',
      [
        {text: 'OK', onPress: () => 'yes'},
      ],
      {
        cancelable: true,
        onDismiss: () => 'yes',
      },
    )
  
    if (choice === 'yes') {
      this.props.navigation.navigate('Home')
    }
    else {
    }
  }
  render() {
    return (
      <View style = {styles.contentContainer}>
        <View style = {styles.horizontalContainer}>
          <IconButton style = {styles.topRightIcon}
            icon = 'close-box-outline'
            color = 'black'
            size = {screenWidth*0.08}
            onPress={() => {
              this.props.navigation.navigate('Home')
            }}
          />
        </View>
        <View style = {styles.container}>
        <Paragraph style = {styles.text}>
            Slide to the right to confirm an active shooter. This function will call the police.
        </Paragraph>
        <SlideToConfirm
          ref={ref => this.slideRef = ref}
          width={screenWidth*0.833}
          onConfirm={()=>{
            db.phoneCall(+13042827110)            
            db.reportEmergency('description')
            this.alert()
          }}
          textColor='white'
          pathColor='#bbbbbb'
          pathCoverColor='#c80d00'
          sliderColor='white'
          text='Slide To Confirm'
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
  topRightIcon: {
    marginLeft: screenWidth*0.8,
    top: screenHeight*0.057,
  },
  text: {
    marginLeft: screenWidth*0.02,
    marginRight: screenWidth*0.02,
    marginBottom: screenHeight*0.01,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontSize: screenWidth*0.049,
  },
  buttonText: {
    fontSize: screenWidth*0.0487,
    fontFamily: 'Lato-Bold',
    color: 'black',
  },
})