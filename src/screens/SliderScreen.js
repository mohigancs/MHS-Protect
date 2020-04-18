import React, {Component} from 'react';
import { View, Dimensions } from 'react-native';
import { IconButton, Paragraph } from 'react-native-paper'
import AlertAsync from "react-native-alert-async"
import SlideToConfirm from 'react-native-slide-to-confirm';
import styles from './components/allStyles'
const screenWidth = Dimensions.get('window').width
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
      this.props.navigation.navigate('Intruder')
    }
    else {
    }
  }
  render() {
    return (
      <View style = {styles.contentContainer}>
        <View style = {styles.horizontalContainer}>
          <IconButton style = {styles.mainTopRightIcon}
            icon = 'close'
            color = 'black'
            size = {screenWidth*0.08}
            onPress={() => {
              this.props.navigation.navigate('Home')
            }}
          />
        </View>
        <View style = {styles.container}>
        <Paragraph style = {styles.text}>
            Slide to the right to confirm an active shooter. This function will send an alert to the police.
        </Paragraph>
        <SlideToConfirm
          ref={ref => this.slideRef = ref}
          width={screenWidth*0.833}
          onConfirm={()=>{
            this.props.navigation.navigate('Intruder')
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