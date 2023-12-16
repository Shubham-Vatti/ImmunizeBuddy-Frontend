import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { WhiteColor } from '../Components/Colors'
const { width, height } = Dimensions.get('window')
// import auth from '@react-native-firebase/auth'
import { AppLoadingScreen } from '../Utils/UiComps'
import auth, { firebase } from '@react-native-firebase/auth'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const SplashScreen = ({ navigation }) => {
  const [isLoading, SetisLoading] = useState(false)
  useFocusEffect(
    useCallback(() => {
      const GetCurrentIndex = async () => {
        // SetisLoading(true)
        try {
          const index = await AsyncStorage.getItem('CurrentSlide')
          // console.log('--index--',index)
          if (index == 3) {
            // SetisLoading(false)
            setTimeout(() => {
              navigation.navigate('LoginScreen')
            }, 1000)
          }
          else {
            setTimeout(() => {
            navigation.navigate('WelcomeScreen')
          }, 1800)
          }
        }
        catch (err) {
          console.log(err)
        }
      }
      GetCurrentIndex()
    }, [])
  )
  // useEffect(()=>{
  //   firebase.auth().onAuthStateChanged((user)=>{
  //     if(user)
  //     {
  //       SetisLoading(true)
  //       setTimeout(()=>{
  //         SetisLoading(false)
  //       navigation.navigate('DrawerNavigation')
  //     },1000)
  //     }
  //     else{
  //       SetisLoading(false)
  //       setTimeout(()=>{
  //           navigation.navigate('WelcomeScreen')

  //       },1800)
  //     }
  //   })
  // },[])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: WhiteColor }}>
      <Image source={require('../Assets/Splashgif.gif')} style={{ width: width * 0.8, height: width * 0.8, resizeMode: 'contain' }} />
      {isLoading && <AppLoadingScreen />}
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})