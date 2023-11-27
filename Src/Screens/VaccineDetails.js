import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlackColor, LightBlack, LightBlueColor, LightPinkColor, LightWhite, WhiteColor } from '../Components/Colors'
const { width, height } = Dimensions.get('window')
import { ScreenLogoHeader, getFontSize } from '../Utils/UiComps'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { VaccineSlide } from '../Utils/AppFeatures'

const VaccineDetails = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor }}>
      <View style={{ flex: 1, paddingHorizontal: width * 0.024, marginTop: height * 0.02 }}>
        <ScreenLogoHeader navigation={navigation}/>
        <View style={{ backgroundColor: LightWhite, borderColor: LightBlack, width: width * 0.94, flexDirection: 'row', alignItems: 'center', paddingHorizontal: width * 0.014, borderWidth: 1, borderRadius: 10, alignSelf: 'center', marginTop: width * 0.04 }}>
          <Fontisto name="injection-syringe" size={24} color="black" />
          <TextInput placeholder='Serach vaccines ...' style={{ width: width * 0.82, paddingHorizontal: width * 0.014, fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(14) }} />
        </View>
        <View style={{ flex: 1, paddingVertical: width * 0.02 }}>
          <FlatList
            data={VaccineSlide}
            showsVerticalScrollIndicator={false}
            key={key => key.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={{ marginVertical: width * 0.02, borderColor: LightBlueColor, borderWidth: 1, borderRadius: width * 0.02, paddingHorizontal: width * 0.02, paddingVertical: width * 0.024 }}>
                  <Text style={{ fontFamily: 'Fredoka-SemiBold', color: BlackColor, fontSize: getFontSize(14) }}>{item.title}</Text>
                  <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14), marginTop: width * 0.01 }}>{item.description}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: width * 0.012 }}>
                    <Image source={require('../Assets/oral-vaccine.png')} style={{ width: width * 0.08, height: width * 0.08 }} />
                    <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, marginLeft: width * 0.02, fontSize: getFontSize(14) }}>{item.dose}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: width * 0.02 }}>
                    {item.Bodysite == 'Oral' && <Image source={require('../Assets/oral-vaccine.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {item.Bodysite == 'Left Upper Arm' && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {item.Bodysite == 'Right Upper Arm' && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {item.Bodysite == 'Intra-dermal:Right upper arm' && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {item.Bodysite == 'Antero-lateral side of mid-thigh' && <Image source={require('../Assets/thigh.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, width: width * 0.8, marginLeft: width * 0.02, fontSize: getFontSize(14) }}>{item.Bodysite}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default VaccineDetails

const styles = StyleSheet.create({})