import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, WhiteColor } from '../../Components/Colors'
const { width, height } = Dimensions.get('window')
import { BlueButton, BlueButtonLoadingUI, UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth'

const SignupScreen = ({ navigation }) => {
  const [isLoading, SetisLoading] = useState(false)
  const [UserEmailId, SetUserEmailId] = useState('')
  const [UserMailPasswords, SetUserMailPasswords] = useState('')
  const HandleFunction = () => {
    if (UserEmailId) {
      if (UserMailPasswords.length >= 8) {
        SetisLoading(true)
        auth().createUserWithEmailAndPassword(UserEmailId, UserMailPasswords)
          .then((data) => {
            console.log('in',data)
            SetisLoading(false)
            // navigation.navigate('BottomNavigator')
          })
          .catch(error => {
            SetisLoading(false)
            if (error.code === 'auth/email-already-in-use') {
              alert('That email address is already in use!')
              // console.log('That email address is already in use!');
            }
            else if (error.code === 'auth/invalid-email') {
              // console.log('That email address is invalid!');
              alert('That email address is invalid!')
            }
            // console.log('--err--',error);
          });
      }
      else {
        alert('Please enter password / Please enter atleast 8 characters')
      }
    }
    else {
      alert('Please enter your email address')
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor }}>
      <ScrollView scrollEnabled keyboardShouldPersistTaps="never">
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.05, paddingHorizontal: width * 0.04 }}>
          <TouchableOpacity
            style={{ zIndex: 3 }}
            onPress={() => navigation.goBack()}

          >
            <AntDesign name="left" size={24} color={LightBlack} />
          </TouchableOpacity>
          <Text style={{ position: 'absolute', width, fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign: 'center', }}>Create Account</Text>
        </View>
        <Animated.View entering={FadeInRight.delay(100).duration(1000).springify()} style={{ alignItems: 'center', marginTop: width * 0.06 }}>
          <Image source={require('../../Assets/Regis.png')} style={{ width: width * 0.6, opacity: 0.9, height: width * 0.6, resizeMode: 'contain' }} />
        </Animated.View>
        <View style={{ zIndex: 2, alignItems: 'center' }}>
          <Animated.View entering={FadeInRight.delay(150).duration(1000).springify()} >
            <Text style={{ fontFamily: 'Fredoka-Medium', marginLeft: width * 0.04, fontSize: getFontSize(14) }}>Email</Text>
            <Animated.View style={[styles.TectInputView, { marginBottom: height * 0.02, marginTop: height * 0.006 }]}>
              <Fontisto name="email" size={width * 0.06} color={LightBlack} />
              <TextInput placeholder='Example@gmail.com' placeholderTextColor={LightBlack} style={styles.TextInputDesign} value={UserEmailId} keyboardType="email-address" onChangeText={(txt) => SetUserEmailId(txt)} />
            </Animated.View>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(200).duration(1000).springify()} >
            <Text style={{ fontFamily: 'Fredoka-Medium', marginLeft: width * 0.04, fontSize: getFontSize(14) }}>Password</Text>
            <Animated.View style={[styles.TectInputView, { marginTop: height * 0.006 }]}>
              <Ionicons name="lock-closed-outline" size={width * 0.06} color={LightBlack} />
              <TextInput placeholder='Enter your password' value={UserMailPasswords} onChangeText={(txt) => SetUserMailPasswords(txt)} placeholderTextColor={LightBlack} style={styles.TextInputDesign} />
            </Animated.View>
          </Animated.View>
        </View>
        <Animated.View entering={FadeInRight.delay(250).duration(1000).springify()} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: width * 0.07, marginTop: height * 0.01 }}>
          <FontAwesome5 name="hand-point-right" size={24} color={LightBlueColor} />
          <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14), marginLeft: width * 0.01 }}>Atleast 8 character</Text>
        </Animated.View>
        <Animated.View entering={FadeInRight.delay(300).duration(1000).springify()} style={{ alignItems: 'center', zIndex: 4 }}>
          {!isLoading ? <BlueButton txt={'Sign Up'} HandleFunc={HandleFunction} /> : <BlueButtonLoadingUI txt={'Please wait'} />}
          <Text style={{ fontFamily: 'Fredoka-Regular', color: LightBlack, paddingHorizontal: width * 0.06 }}>By signing up ,I agree to ImmunizeBuddy<Text style={{ color: LightBlueColor }}>Terms and Condition</Text> and <Text style={{ color: LightBlueColor }}>Privacy Policy</Text></Text>
        </Animated.View>
        <UIBgKidFoot />
      </ScrollView>
    </View>
  )
}

export default SignupScreen

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