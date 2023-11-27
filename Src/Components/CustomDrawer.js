import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { DrawerActions } from '@react-navigation/native'
const width = Dimensions.get('window').width
import { BlackColor, LightBlueColor } from '../Components/Colors'
const height = Dimensions.get('window').height
import { UserLogout, getFontSize } from '../Utils/UiComps'

const CustomDrawer = ({ props, navigation }) => {
  return (
    <View style={{ flex: 1 }}>

      <DrawerContentScrollView {...props}>
        <View style={{ paddingHorizontal: width * 0.04 }}>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:width*0.06,justifyContent:'space-between',}}>
            <Image source={require('../Assets/Logo.png')}
              style={{
                height: width * 0.13, width: width * 0.13,resizeMode:'contain'
              }}
            />
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} style={{marginRight:width*0.04}}>
              <Image
                source={require('../Assets/close.png')}
                style={{
                  // height:20,width:20
                  height:width*0.051,width:width*0.051                
                }}
                />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 }}>
            <View style={{ borderBottomColor: LightBlueColor, borderBottomWidth: 1, width: width * 0.1, marginTop: height * 0.06 }}>
              <TouchableOpacity onPress={() => { }}>
                <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Medium', width, fontSize: getFontSize(14), letterSpacing: 1 }}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ borderBottomColor: LightBlueColor, borderBottomWidth: 1, width: width * 0.1, marginTop: height * 0.029 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Medium', width, fontSize: getFontSize(14), letterSpacing: 1 }}>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: LightBlueColor, borderBottomWidth: 1, width: width * 0.26, marginTop: height * 0.029 }}>
            <TouchableOpacity onPress={() => navigation.navigate('vaccinedata')}>
              <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Medium', width, fontSize: getFontSize(14), letterSpacing: 1 }}>Vaccine Details</Text>
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: LightBlueColor, borderBottomWidth: 1, width: width * 0.06, marginTop: height * 0.029 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Store')}>
              <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Medium', width, fontSize: getFontSize(14), letterSpacing: 1 }}>Store</Text>
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: LightBlueColor, borderBottomWidth: 1, width: width * 0.14, marginTop: height * 0.029 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Dr')}>
              <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Medium', width, fontSize: getFontSize(14), letterSpacing: 1 }}>Doctor's</Text>
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: LightBlueColor, borderBottomWidth: 1, width: width * 0.1, marginTop: height * 0.029 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Medium', width, fontSize: getFontSize(14), letterSpacing: 1 }}>Setting</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ flexDirection:'row',alignItems:'center',marginTop:width*0.08}}
          onPress={()=>UserLogout()}
          >
          <Text style={{fontFamily:'Fredoka-Medium',color:'red',fontSize:getFontSize(16),marginRight:width*0.02}}>Log Out</Text>
          <AntDesign name="logout" size={width*0.05} color={'red'} />
          </TouchableOpacity>
          {/* <Image source={require('../Assets/Logo.png')}
            style={{
              height: width * 0.13, width: width * 0.13
            }}
          />
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}> */}
          {/* <Image
                source={require('../assests/Cross.png')}
                style={{
                  // height:20,width:20
                  height:width*0.051,width:width*0.051                
                }}
                /> */}
          {/* </TouchableOpacity> */}
          {/* </View>
            <View style={{borderBottomColor:YPPPurpleColor,borderBottomWidth:1,width:width*0.1,marginTop:height*0.06}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
              <Text style={{color:YPPBLack,fontFamily:'Poppins-Bold',width,fontSize:RFValue(13.8),letterSpacing:1}}>Profile</Text>
            </TouchableOpacity>
            </View>
            <View style={{borderBottomColor:YPPPurpleColor,borderBottomWidth:1,width:width*0.1,marginTop:height*0.029}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Menu')}>
              <Text style={{color:YPPBLack,fontFamily:'Poppins-Bold',width,fontSize:RFValue(13.8),letterSpacing:1}}>Dashboard</Text>
            </TouchableOpacity>
            </View>
            <View style={{borderBottomColor:YPPPurpleColor,borderBottomWidth:1,width:width*0.1,marginTop:height*0.029}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate('Productupload')}
            >
              <Text style={{color:YPPBLack,fontFamily:'Poppins-Bold',width,fontSize:RFValue(13.8),letterSpacing:1}}>Upload new+</Text>
            </TouchableOpacity>
            </View>
            <View style={{borderBottomColor:YPPPurpleColor,borderBottomWidth:1,width:width*0.1,marginTop:height*0.029}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate('FAQProduct')}
            >
              <Text style={{color:YPPBLack,fontFamily:'Poppins-Bold',width,fontSize:RFValue(13.8),letterSpacing:1}}>FAQ</Text>
            </TouchableOpacity>
            </View>
            <View style={{marginTop:height*0.029}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate('JourneyProducts')}
            >
              <Text style={{color:YPPBLack,fontFamily:'Poppins-Bold',width,fontSize:RFValue(13.8),letterSpacing:1}}>Journey</Text>
            </TouchableOpacity>
            </View>
            <View style={{borderBottomColor:YPPPurpleColor,borderBottomWidth:1.8,width:width*0.6,marginTop:height*0.1}}/>

            {/* Setting Tab */}

          {/* <View style={{borderBottomColor:YPPPurpleColor,borderBottomWidth:1,width:width*0.1,marginTop:height*0.1}}>
            <TouchableOpacity>
              <Text style={{color:YPPBLack,fontFamily:'Poppins-Bold',width,fontSize:RFValue(13.8),letterSpacing:1}}>Settings</Text>
            </TouchableOpacity>
            </View> */}

        </View>
      </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})