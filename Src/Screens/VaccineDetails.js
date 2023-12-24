import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, LightPinkColor, LightWhite, WhiteColor } from '../Components/Colors'
const { width, height } = Dimensions.get('window')
import { AppLoadingScreen, LightBlueLine, ScreenLogoHeader, ScreenWithoutDrawerHeader, getFontSize } from '../Utils/UiComps'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Base_Url, VaccineSlide } from '../Utils/AppFeatures'

const VaccineDetails = ({navigation}) => {
  const [VaccineSlide,SetVaccineSlide]=useState([])
  const [isLoading,SetisLoading]=useState(false)
  const VaccineListDetails=async()=>{
    try{
      SetisLoading(true)
      await fetch(`${Base_Url}/Vaccine-Details-list/Vaccine-list/get-list`,{
        method:"GET",
      })
      .then((res)=>res.json())
      .then((result)=>{
        if(result.type=="get vaccine data list!")
        {
          SetisLoading(false)
          SetVaccineSlide(result.vaccine_data)
        }
        else{
          SetisLoading(false)
        }
        console.log(result)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    catch(Err)
    {
      console.log(Err)
    }
  }
  useEffect(()=>{
    VaccineListDetails()
  },[])
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor }}>
      <View style={{ flex: 1, paddingHorizontal: width * 0.024, }}>
        <View style={{ paddingVertical: height * 0.02}}>
        {/* <ScreenLogoHeader navigation={navigation}/>
         */}
         <ScreenWithoutDrawerHeader navigation={navigation}/>
        </View>
        <LightBlueLine/>
        {/* <View style={{ backgroundColor: LightWhite, borderColor: LightBlack, width: width * 0.94, flexDirection: 'row', alignItems: 'center', paddingHorizontal: width * 0.014, borderWidth: 1, borderRadius: 10, alignSelf: 'center', marginTop: width * 0.04 }}>
          <Fontisto name="injection-syringe" size={24} color="black" />
          <TextInput placeholder='Serach vaccines ...' style={{ width: width * 0.82, paddingHorizontal: width * 0.014, fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(14) }} />
        </View> */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={VaccineSlide}
            showsVerticalScrollIndicator={false}
            key={key => key.id}
            renderItem={({ item,index }) => {
              return (
                <Pressable style={({pressed})=>[{ marginVertical: width * 0.02, borderColor: LightBlueColor, borderWidth: 1, borderRadius: width * 0.02, paddingHorizontal: width * 0.02,backgroundColor:pressed?"rgba(0,0,0,0.08)":WhiteColor, paddingVertical: width * 0.024 }]}
                onPress={()=>{navigation.navigate('VaccineData',{
                  vacciData:item
                })}}
                >
                  <Text style={{ fontFamily: 'Fredoka-SemiBold', color: BlackColor, fontSize: getFontSize(14) }}>{(index+1)+') '+item.vaccine_name}</Text>
                  <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(13), marginTop: width * 0.01 }}>{item.vaccine_details}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: width * 0.012 }}>
                    <Image source={require('../Assets/oral-vaccine.png')} style={{ width: width * 0.08, height: width * 0.08 }} />
                    <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, marginLeft: width * 0.02, fontSize: getFontSize(14) }}>{item.vaccine_dose}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: width * 0.02 }}>
                    {item.vaccine_site == 'Oral' && <Image source={require('../Assets/oral-vaccine.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {((item.vaccine_site == 'Left upper Arm')||(item.vaccine_site == 'Left Upper Arm')||(item.vaccine_site == 'Upper Arm')) && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {item.vaccine_site == 'Right upper Arm' && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {item.vaccine_site == 'Intra-dermal Right upper arm' && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {item.vaccine_site == 'Antero-lateral side of mid-thigh' && <Image source={require('../Assets/thigh.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, width: width * 0.8, marginLeft: width * 0.02, fontSize: getFontSize(14) }}>{item.vaccine_site}</Text>
                  </View>
                </Pressable>
              )
            }}
          />
        </View>
      </View>
      {isLoading&&<AppLoadingScreen/>}
    </View>
  )
}

export default VaccineDetails

const styles = StyleSheet.create({})