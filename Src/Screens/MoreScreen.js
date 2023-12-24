import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BlackColor, LightBlack, LightFootBlueColor, LightPinkColor, LightWhite, WhiteColor } from '../Components/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('window')
import { getFontSize,LightBlueLine, ScreenLogoHeader, ScreenWithoutDrawerHeader } from '../Utils/UiComps'

const MoreScreen = ({navigation}) => {
  // const [UserName, SetUserName] = useState('Shubham Kumar')
  // const [UserEmail, SetUserEmail] = useState('Shubhamvatti10@gmail.com')
  return (
    <View style={{ flex: 1,width, backgroundColor: WhiteColor, paddingHorizontal: width * 0.024, }}>
      <View style={{paddingVertical: height * 0.02}}>
      {/* <ScreenLogoHeader navigation={navigation}/> */}
      <ScreenWithoutDrawerHeader navigation={navigation}/>
      </View>
      <LightBlueLine/>
      {/* <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:height*0.03,paddingVertical:height*0.02}}
      onPress={()=>navigation.navigate('ParentingTipsStack')}
      >
        <Text style={{fontFamily:'Fredoka-Regular',color:BlackColor}}>Parenting Tips and Blogs</Text>
        <AntDesign name="right" size={width * 0.05} color={BlackColor} />
      </TouchableOpacity> */}
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:height*0.02,marginTop:height*0.03}}
      onPress={()=> 
        navigation.navigate('Helpdesk')
      }
      >
        <Text style={{fontFamily:'Fredoka-Regular',color:BlackColor}}>Helpdesk</Text>
        <AntDesign name="right" size={width * 0.05} color={BlackColor} />
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:height*0.02}}
      onPress={()=>navigation.navigate('Aboutus')}
      >
        <Text style={{fontFamily:'Fredoka-Regular',color:BlackColor}}>About Us</Text>
        <AntDesign name="right" size={width * 0.05} color={BlackColor} />
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:height*0.02}}
      onPress={()=>navigation.navigate('Contactus')}
      >
        <Text style={{fontFamily:'Fredoka-Regular',color:BlackColor}}>Contact Us</Text>
        <AntDesign name="right" size={width * 0.05} color={BlackColor} />
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:height*0.02}}
      onPress={()=>navigation.navigate('LoginScreen')}
      >
        <Text style={{fontFamily:'Fredoka-Regular',color:LightFootBlueColor}}>Log Out</Text>
        <AntDesign name="logout" size={width*0.05} color={LightFootBlueColor} />
      </TouchableOpacity>
    </View>
  )
}

export default MoreScreen

const styles = StyleSheet.create({})