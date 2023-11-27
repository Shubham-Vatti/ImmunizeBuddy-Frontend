import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WhiteColor } from '../Components/Colors'
const { width, height } = Dimensions.get('window')
// import auth from '@react-native-firebase/auth'
import {AppLoadingScreen} from '../Utils/UiComps'
import auth,{ firebase } from '@react-native-firebase/auth'
const SplashScreen = ({navigation}) => {
  const [isLoading,SetisLoading]=useState(false)
    useEffect(()=>{
      firebase.auth().onAuthStateChanged((user)=>{
        if(user)
        {
          SetisLoading(true)
          setTimeout(()=>{
            SetisLoading(false)
          navigation.navigate('DrawerNavigation')
        },1000)
        }
        else{
          SetisLoading(false)
          setTimeout(()=>{
              navigation.navigate('WelcomeScreen')
  
          },1800)
        }
      })
    },[])
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:WhiteColor}}>
        <Image source={require('../Assets/Splashgif.gif')}  style={{width:width*0.8,height:width*0.8,resizeMode:'contain'}}/>
        {isLoading&&<AppLoadingScreen/>}
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})