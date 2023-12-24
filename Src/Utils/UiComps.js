import { ActivityIndicator, Dimensions, Image, PixelRatio, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
const { width, height } = Dimensions.get('window')
import { BlackColor, LightBlack, LightBlueColor, LightLightBlueColor, LightPinkColor, LightWhite, WhiteColor } from '../Components/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Animated from "react-native-reanimated";
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth, { firebase } from '@react-native-firebase/auth'
import { ContextProvider } from "../Screens/StateManagment/ContextState";
import { useContext, useEffect, useState } from "react";
import { Base_Url } from "./AppFeatures";
const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size / fontScale;

export const ListItem = ({ item, index }) => {
    return (
        <View style={{ width, }}>
            <View style={{ alignItems: 'center', marginTop: height * 0.1 }}>
                <Image source={item.img}
                    style={{ width: width * 0.7, height: width * 0.7, resizeMode: 'contain' }}
                />
            </View>
            <Text style={{ fontSize: getFontSize(22.5), paddingHorizontal: width * 0.06, textAlign: 'center', marginTop: height * 0.08, fontFamily: 'Fredoka-SemiBold', color: LightBlueColor }}>{item.title}</Text>
            <Text style={{ fontSize: getFontSize(15), textAlign: 'center', fontFamily: 'Fredoka-Regular', color: BlackColor, paddingHorizontal: width * 0.04, marginTop: height * 0.01 }}>{item.description}</Text>
        </View>
    )

}

export const DotItem = ({ index }) => {
    // console.log('ii',index)
    return (
        <Animated.View style={{ width: width * 0.02, margin: width * 0.008, height: width * 0.02, backgroundColor: BlackColor, borderRadius: 100 }} />
    )
}


export const UIBgKidFoot = () => {
    return (
        <View style={{ position: 'absolute', width }}>
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

export const BlueButton = ({ txt, HandleFunc }) => {
    return (
        <Pressable style={{ backgroundColor: LightBlueColor, marginVertical: height * 0.02, marginTop: width * 0.1, width: width * 0.88, borderRadius: width * 1, zIndex: 8, paddingVertical: height * 0.02 }}
            onPress={() => { HandleFunc() }}
        >
            <Text style={{ color: WhiteColor, width: width * 0.88, fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14), textAlign: 'center' }}>{txt}</Text>
        </Pressable>
    )
}

export const BlueButtonLoadingUI = ({ txt }) => {
    return (
        <View style={{ backgroundColor: LightBlueColor, marginVertical: height * 0.02, marginTop: width * 0.1, width: width * 0.88, borderRadius: width * 1, paddingVertical: height * 0.018, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14), color: WhiteColor }}>{txt}</Text>
            <ActivityIndicator color={WhiteColor} />
        </View>
    )
}


export const LightBlueLine = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ width: width * 0.92, height: width * 0.004, backgroundColor: LightLightBlueColor }} />
        </View>
    )
}

export const ScreenLogoHeader = ({ navigation }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: width * 0.02 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => { navigation.openDrawer() }}
                >
                    {/* <Ionicons name="reorder-three-outline" size={width*0.09} color="black" /> */}
                    <Image source={require('../Assets/sort.png')}
                        style={{ width: width * 0.06, height: width * 0.06, resizeMode: 'contain' }}
                    />
                    {/* <AntDesign name="leftcircleo" size={width * 0.066} color="black" /> */}
                </TouchableOpacity>
                {/* <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(15),color:BlackColor,marginLeft:width*0.02 }}>Back</Text> */}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../Assets/Logo.png')} style={{ width: width * 0.12, height: width * 0.12, resizeMode: 'contain' }} />
                <Text style={{ color: LightBlueColor, fontFamily: 'Fredoka-Medium', marginLeft: width * 0.02, fontSize: getFontSize(14) }}>Immunize<Text style={{ color: LightPinkColor }}>Buddy</Text></Text>
            </View>
        </View>
    )
}

export const ScreenLogoAndBackIcon=({navigation})=>{
    
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: width * 0.02 }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <AntDesign name="leftcircleo" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../Assets/Logo.png')} style={{ width: width * 0.12, height: width * 0.12, resizeMode: 'contain' }} />
                <Text style={{ color: LightBlueColor, fontFamily: 'Fredoka-Medium', marginLeft: width * 0.02, fontSize: getFontSize(14) }}>Immunize<Text style={{ color: LightPinkColor }}>Buddy</Text></Text>
            </View>
        </View>
    )
}
export const ScreenWithoutDrawerHeader = ({navigation}) => {
    const { AuthToken, SetAuthToken } = useContext(ContextProvider)  //Authtoken UseContext
    const [parentdata,Setparentdata]=useState()
    const GetUserData=async()=>{
        try{
          await fetch(`${Base_Url}/Parents-Api/Get-data`,{
            method:"GET",
            headers: { "Authorization": `Bearer ${AuthToken}` }
          })
          .then((res)=>res.json())
          .then((result)=>{
            if(result.type=="successfully get parents data")
            {
                console.log(result)
              Setparentdata(result.parent_data)
            //   getchildprofile()
            }
            console.log(result,AuthToken)
          })
          .catch((err)=>{
            console.log(err)
          })
        }
        catch(err)
        {
          console.log(err)
        }
    }
    useEffect(()=>{
        GetUserData()
    },[])
    return (
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../Assets/Logo.png')} style={{ width: width * 0.12, height: width * 0.12, resizeMode: 'contain' }} />
                <Text style={{ color: LightBlueColor, fontFamily: 'Fredoka-Medium', marginLeft: width * 0.02, fontSize: getFontSize(14) }}>Immunize<Text style={{ color: LightPinkColor }}>Buddy</Text></Text>
            </View>
            {parentdata&&<TouchableOpacity
            onPress={()=>navigation.navigate('ProfileScreen')}
            >
                <Image source={{uri:parentdata.profile_pic}} style={{width:width*0.13,height:width*0.13,borderRadius:100}}/>
            </TouchableOpacity>}
        </View>)
}


export const AppLoadingScreen = () => {
    return (
        <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 10, alignItems: 'center', justifyContent: 'center', position: 'absolute', height, width }}>
            <View style={{ backgroundColor: WhiteColor, flexDirection: 'row', alignItems: 'center', justifyContent: "center", width: width * 0.4, borderRadius: width * 0.02, elevation: 4, padding: width * 0.06 }}>
                <ActivityIndicator color={LightBlueColor} size={width * 0.06} />
                <Text style={{ color: BlackColor, fontSize: getFontSize(16), fontFamily: 'Fredoka-Medium', paddingLeft: width * 0.02 }}>Loading ...</Text>
            </View>
        </SafeAreaView>
    )
}

export const UserLogout = async () => {
    return (
        await firebase.auth().signOut().then(() => {
            console.log('Output')
        })
            .catch(() => {
                console.log('Cath Section Error')
            })
    )
}