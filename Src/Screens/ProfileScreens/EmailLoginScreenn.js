import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, WhiteColor } from '../../Components/Colors'
const { width, height } = Dimensions.get('window')
import { BlueButton, BlueButtonLoadingUI, UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated'
import auth from '@react-native-firebase/auth'
const EmailLoginScreenn = ({ navigation }) => {
  const [isLoading, SetisLoading] = useState(false)
  const [UserEmailId, SetUserEmailId] = useState('')
  const [UserPassword, SetUserPassword] = useState('')
  const HandleFunction = () => {
    if (UserEmailId) {
      if (UserPassword) {
        SetisLoading(true)
        auth().signInWithEmailAndPassword(UserEmailId, UserPassword)
          .then(async(data) => {
            const idToken=await auth().currentUser.getIdToken()
            console.log('--IdToken--',idToken)
            SetisLoading(false)
            // navigation.navigate('DrawerNavigation')
          })
          .catch((err) => {
            SetisLoading(false)
            if(err.code=='auth/invalid-login')
            {
              alert('Invalid Login Credentials')
            }
            console.log('--errrr--', err)
          })
      }
      else {
        alert('Please enter password')
      }
    }
    else {
      alert('Please enter your email address')
    }

    // },2000)
  }
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor }}>
      {/* <View style={{position:'absolute'}}>
      </View> */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.05, paddingHorizontal: width * 0.04 }}>
        <TouchableOpacity
          style={{ zIndex: 3 }}
          onPress={() => navigation.goBack()}

        >
          <AntDesign name="left" size={24} color={LightBlack} />
        </TouchableOpacity>
        <Text style={{ position: 'absolute', width, fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign: 'center', }}>Welcome Back</Text>
      </View>
      <Animated.View entering={FadeInUp.delay(100).duration(1000).springify()} style={{ alignItems: 'center', marginTop: width * 0.06 }}>
        <Image source={require('../../Assets/LoginS.png')} style={{ width: width * 0.6, opacity: 0.9, height: width * 0.6, resizeMode: 'contain' }} />
      </Animated.View>
      <Animated.View style={{ zIndex: 2, alignItems: 'center' }}>
        <Animated.View entering={FadeInUp.delay(150).duration(1000).springify()}>
          <Text style={{ fontFamily: 'Fredoka-Medium', marginLeft: width * 0.04, fontSize: getFontSize(14) }}>Email</Text>
          <Animated.View style={[styles.TectInputView, { marginBottom: height * 0.02, marginTop: height * 0.006 }]}>
            <Fontisto name="email" size={width * 0.06} color={LightBlack} />
            <TextInput placeholder='Example@gmail.com' placeholderTextColor={LightBlack} style={styles.TextInputDesign} value={UserEmailId} onChangeText={(txt) => SetUserEmailId(txt)} />
          </Animated.View>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}>
          <Text style={{ fontFamily: 'Fredoka-Medium', marginLeft: width * 0.04, fontSize: getFontSize(14) }}>Password</Text>
          <Animated.View style={[styles.TectInputView, { marginTop: height * 0.006 }]}>
            <Ionicons name="lock-closed-outline" size={width * 0.06} color={LightBlack} />
            <TextInput placeholder='Enter your password' placeholderTextColor={LightBlack} style={styles.TextInputDesign} value={UserPassword} onChangeText={(txt) => SetUserPassword(txt)} />
          </Animated.View>
          <TouchableOpacity onPress={() => navigation.navigate('UserProductFogrotPass')}>
            <Text style={{ fontFamily: 'Fredoka-Medium', color: LightBlueColor, alignSelf: 'flex-end', marginTop: height * 0.006 }}>Forgot your password ?</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(250).duration(1000).springify()} style={{ alignItems: 'center', zIndex: 4 }}>
        {!isLoading ? <BlueButton txt={'Login'} HandleFunc={HandleFunction} /> : <BlueButtonLoadingUI txt={'Please wait'} />}
      </Animated.View>
      <UIBgKidFoot />
    </View>
  )
}

export default EmailLoginScreenn

const styles = StyleSheet.create({
  TextInputDesign: {
    fontSize: getFontSize(14),
    fontFamily: 'Fredoka-Regular',
    width: width * 0.74,
    paddingHorizontal: width * 0.02
  },
  TectInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: LightBlack,
    borderWidth: 1,
    width: width * 0.88,
    paddingHorizontal: width * 0.04
  }
})