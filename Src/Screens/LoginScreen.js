import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppLoadingScreen, getFontSize } from '../Utils/UiComps'
import { BlackColor, LightBlack, LightBlueColor, LightLightBlueColor, LightWhite, WhiteColor } from '../Components/Colors'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin'
const { width, height } = Dimensions.get('window')
import { UserLoginwithGmail } from '../Utils/Networks'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ContextProvider } from './StateManagment/ContextState'
import { Base_Url } from '../Utils/AppFeatures'
const LoginScreen = ({ navigation }) => {
  const [isLoading, SetisLoading] = useState(false)
  const { AuthToken, SetAuthToken } = useContext(ContextProvider)  //Authtoken UseContext
  const { LoginID, SetLoginID } = useContext(ContextProvider)
  const { UserEmailID, SEtUserEmailID } = useContext(ContextProvider)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "905844466672-vshm1uvfm1d6sfplg11v0hp6plqv6a6h.apps.googleusercontent.com"
    })
  }, [])

  const GoogleAuthSignin = async (idtoken) => {
    try {
      var data = JSON.stringify({
        idToken: idtoken
      });
      await fetch(`${Base_Url}/Auth-User/Signup`, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.type == "sucessfully logged in!") {
            SetAuthToken(result.auth_token)
            SEtUserEmailID(result.user_data.email)
            SetLoginID(result.user_data._id)
            SetisLoading(false)
            if(result.user_data.is_parentregistered)
            {
              if(result.user_data.is_childregistered)
              {
                navigation.navigate('BottomNavigator')
              }
              else{
                navigation.navigate('RegisterChildScreen')
              }
            }
            else{
              navigation.navigate('RegisterScreen',{
                emailId:result
              }) 
            }
            // console.log(result.user_data.email)
          }
          else {
            SetisLoading(false)
          }
        })
        .catch((err) => {
          SetisLoading(false)
          console.log(err)
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  const GsignIn = async () => {
    try {
        SetisLoading(true)
        // SetisLoading(true)
      console.log("Inside TRY")
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        GoogleAuthSignin(userInfo.idToken)
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
        SetisLoading(false)
        // Seterrordisplay("Google Signin Cancelled Please Sign In Again")
        // setVisible(true)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        SetisLoading(false)
        console.log(error.code)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        SetisLoading(false)
        console.log(error.code)
      } else {
        SetisLoading(false)
        console.log('iNSIDE', error)
      }
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(28), textAlign: 'center', color: LightBlueColor, marginTop: height * 0.05 }}>Welcome</Text>
      <View style={{ alignItems: 'center', marginTop: width * 0.06 }}>
        <Image source={require('../Assets/LgBG.png')} style={{ width: width * 0.6, opacity: 0.8, resizeMode: 'contain', height: width * 0.6 }} />
      </View>
      <Pressable style={{ backgroundColor: LightLightBlueColor, borderColor: LightBlueColor, borderWidth: 1, width: width * 0.88, borderRadius: width * 1, zIndex: 2, paddingVertical: height * 0.02, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: height * 0.14 }}
        onPress={() => GsignIn()}
      >
        {/* <AntDesign name="google" size={20} color={LightBlueColor} />
           */}
        <Image
          source={require('../Assets/search.png')}
          style={{ width: width * 0.06, height: width * 0.06, resizeMode: 'contain' }}
        />
        <Text style={{ color: LightBlueColor, fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14), marginLeft: width * 0.02 }}>signin with Google</Text>
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
      {isLoading && <AppLoadingScreen />}
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})