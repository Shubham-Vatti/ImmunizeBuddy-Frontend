import { Dimensions, Image, Linking, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, LightWhite, WhiteColor } from '../../Components/Colors'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BlueButton, BlueButtonLoadingUI, UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
import LottieView from 'lottie-react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { openInbox } from 'react-native-email-link'
import auth from '@react-native-firebase/auth'
const ForgotPasswordScreen = ({ navigation }) => {
  const [UserEmailId, SetUserEmailId] = useState('')
  const [isLoading, SetisLoading] = useState(false)
  const [ForgotMail,SetForgotMail]=useState(false)
  const HandleFunc2 =()=>{
    SetisLoading(false)
    SetForgotMail(false)
    openInbox().then(()=>navigation.navigate('LoginScreen'))
  }
  const HandleFunction = () => {
    if (UserEmailId) {
      SetisLoading(true)
      auth().sendPasswordResetEmail(UserEmailId)
      .then((data)=>{
        // SetisLoading(true)
        console.log(data)
        SetForgotMail(true)
      })
      .catch((err)=>{
        console.log('err--',err)
      })
    }
    else {
      alert('Please enter your email address')
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor, paddingHorizontal: width * 0.04 }}>
      <Modal
      visible={ForgotMail}
      transparent={true}
      onRequestClose={()=>
      SetForgotMail(false)}
      >
        <View style={{flex:1,backgroundColor:LightWhite,alignItems:'center',justifyContent:'center'}}>
          <View style={{width:width*0.9,height:height*0.7,backgroundColor:WhiteColor,borderRadius:width*0.04,elevation:4}}>
            <View style={{alignItems:'center'}}>
              <LottieView source={require('../../Assets/animation_lol9scma.json')} autoPlay style={{width:width*0.86,height:width*0.86}}/>
              <Text style={{fontFamily:'Fredoka-Medium',color:BlackColor,fontSize:getFontSize(16),paddingHorizontal:width*0.1,textAlign:'center'}}>Reset link has been sent to your mail address</Text>
            <BlueButton txt={"Go to Email"} HandleFunc={HandleFunc2}/>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.05, }}>
        <TouchableOpacity style={{ zIndex: 3 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="leftcircleo" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ paddingLeft: width * 0.04 }}>
          <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign: 'center' }}>Forgot Password</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', zIndex: 2 }}>
        <Image source={require('../../Assets/forpass.jpg')} style={{ width: width * 0.7, resizeMode: 'contain', height: width * 0.7 }} />
        <View>
          <Text style={{ fontFamily: 'Fredoka-Medium', marginLeft: width * 0.04, fontSize: getFontSize(14) }}>Email</Text>
          <View style={[styles.TectInputView, { marginBottom: height * 0.02, marginTop: height * 0.006 }]}>
            <Fontisto name="email" size={width * 0.06} color={LightBlack} />
            <TextInput placeholder='Example@gmail.com' placeholderTextColor={LightBlack} style={styles.TextInputDesign} value={UserEmailId} keyboardType="email-address" onChangeText={(txt) => SetUserEmailId(txt)} />
          </View>
        </View>
        {!isLoading ? <BlueButton txt={'Reset Password'} HandleFunc={HandleFunction} /> : <BlueButtonLoadingUI txt={'Please wait'} />}
      </View>
      <UIBgKidFoot />
    </View>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  TectInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: LightBlack,
    borderWidth: 1,
    width: width * 0.88,
    paddingHorizontal: width * 0.04
  },
  TextInputDesign: {
    fontSize: getFontSize(14),
    fontFamily: 'Fredoka-Regular',
    width: width * 0.74,
    paddingHorizontal: width * 0.02
  },
})