import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { getFontSize } from '../Utils/UiComps'
import { BlackColor, LightBlack, LightBlueColor, LightLightBlueColor, LightWhite, WhiteColor } from '../Components/Colors'
import { GoogleSignin, GoogleSigninButton,statusCodes } from '@react-native-google-signin/google-signin'
const { width, height } = Dimensions.get('window')
import {UserLoginwithGmail} from '../Utils/Networks'
import AntDesign from 'react-native-vector-icons/AntDesign'
const LoginScreen = ({navigation}) => {
useEffect(()=>{
  GoogleSignin.configure({
    webClientId:"905844466672-vshm1uvfm1d6sfplg11v0hp6plqv6a6h.apps.googleusercontent.com"
  })
},[])
const GsignIn = async () => {
  try {
      // SetisLoading(true)
      console.log("Inside TRY")
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        navigation.navigate('RegisterScreen')
        // var data=JSON.stringify({
        //   "idToken":userInfo.idToken
        // })
        // UserLoginwithGmail(data)
        console.log(userInfo)
      }
  } catch (error) {
      // SetisLoading(false)
      console.log("Inside Catch")
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // Seterrordisplay("Google Signin Cancelled Please Sign In Again")
          // setVisible(true)
          // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log(error.code)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log(error.code)
      } else {
          console.log('iNSIDE', error)
      }
  }
};
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(28), textAlign: 'center', color: LightBlueColor, marginTop: height * 0.05 }}>Welcome</Text>
      <View style={{alignItems:'center',marginTop:width*0.06}}>
        <Image source={require('../Assets/LgBG.png')} style={{width:width*0.6,opacity:0.8,resizeMode:'contain',height:width*0.6}}/>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Pressable style={{ backgroundColor: LightBlueColor, marginVertical: height * 0.02,marginTop:width*0.1, width: width * 0.88, borderRadius: width * 1, zIndex: 2, paddingVertical: height * 0.02 }}
          onPress={() =>{navigation.navigate('SignupScreen')}}
        >
          <Text style={{ color: WhiteColor, width: width * 0.88, fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14), textAlign: 'center' }}>Sign Up</Text>
        </Pressable>
        <Pressable style={{ backgroundColor: LightLightBlueColor, borderColor: LightBlueColor, borderWidth: 1, width: width * 0.88, borderRadius: width * 1, zIndex: 2, paddingVertical: height * 0.02 }}
          onPress={() =>{navigation.navigate('EmailLoginScreen')}}
        >
          <Text style={{ color: LightBlueColor, width: width * 0.88, fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14), textAlign: 'center' }}>Login</Text>
        </Pressable>
        </View>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: width * 0.1 }}>
        <View style={{ height: width * 0.004, backgroundColor: LightBlack, width: width * 0.3 }} />
        <Text style={{ color: LightBlack, fontFamily: 'Fredoka-Regular', marginHorizontal: width * 0.03 }}>OR</Text>
        <View style={{ height: width * 0.004, backgroundColor: LightBlack, width: width * 0.3 }} />
      </View> */}
        <Pressable style={{ backgroundColor: LightLightBlueColor, borderColor: LightBlueColor, borderWidth: 1, width: width * 0.88, borderRadius: width * 1, zIndex: 2, paddingVertical: height * 0.02,flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'center',marginTop:height*0.14 }}
          onPress={() =>GsignIn()}
        >
          <AntDesign name="google" size={20} color={LightBlueColor} />
          <Text style={{ color: LightBlueColor, fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14),marginLeft:width*0.02}}>signin with Google</Text>
        </Pressable>
      <View style={{ position: 'absolute', zIndex: 1 }}>
        <Image source={require('../Assets/Kidfoot.png')} style={{ width: width * 0.48, marginTop: height * 0.46, opacity: 0.6, height: width * 0.48, left: -width * 0.2, resizeMode: 'contain', transform: [{ rotate: '25deg' }] }} />
      </View>
      <View style={{ position: 'absolute', zIndex: 1, right: 0 }}>
        <Image source={require('../Assets/Kidfoot1.png')} style={{ width: width * 0.48, overflow: 'hidden', marginTop: height * 0.2, opacity: 0.4, height: width * 0.48, right: -width * 0.2, resizeMode: 'contain', transform: [{ rotate: '-25deg' }] }} />
      </View>
      <View style={{ position: 'absolute', zIndex: 1, right: 0 }}>
        <Image source={require('../Assets/Kidfoot2.png')} style={{ width: width * 0.48, marginTop: height * 0.8, opacity: 0.4, height: width * 0.48, right: -width * 0.2, resizeMode: 'contain', transform: [{ rotate: '-25deg' }] }} />
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})