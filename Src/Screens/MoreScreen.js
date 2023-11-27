import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BlackColor, LightBlack, LightFootBlueColor, LightPinkColor, LightWhite, WhiteColor } from '../Components/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('window')
import { getFontSize,LightBlueLine } from '../Utils/UiComps'

const MoreScreen = ({navigation}) => {
  const [UserName, SetUserName] = useState('Shubham Kumar')
  const [UserEmail, SetUserEmail] = useState('Shubhamvatti10@gmail.com')
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor, paddingHorizontal: width * 0.03, }}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginVertical:height*0.02 }}>
        <View style={{ backgroundColor: LightWhite, borderRadius: width * 0.1, padding: width * 0.03, borderColor: BlackColor, borderWidth: 0.8 }}>
          <AntDesign name="user" size={width * 0.12} color="black" />
          {/* <Image source={require('../Assets/')}/> */}
        </View>
        <View style={{}}>
          <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14), width: width * 0.64 }}>{UserName}</Text>
          <Text style={{ fontFamily: 'Fredoka-Regular', fontSize: getFontSize(13), width: width * 0.64 }}>{UserEmail}</Text>
        </View>
        <View>
          <AntDesign name="right" size={width * 0.06} color={LightBlack} />
        </View>
      </TouchableOpacity>
      <LightBlueLine/>
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:height*0.03,paddingVertical:height*0.02}}>
        <Text style={{fontFamily:'Fredoka-Regular',color:BlackColor}}>Parenting Tips and Blogs</Text>
        <AntDesign name="right" size={width * 0.05} color={BlackColor} />
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:height*0.02}}
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