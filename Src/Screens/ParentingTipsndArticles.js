import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BlackColor, LightBlueColor, LightBottomBlackColor, WhiteColor } from '../Components/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { UIBgKidFoot, getFontSize } from '../Utils/UiComps'

const ParentingTipsndArticles = ({ navigation, route }) => {
  const { parentingdata } = route.params;
  console.log(parentingdata)
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor, paddingHorizontal: width * 0.04 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: height * 0.03,zIndex:2 }}>
        <TouchableOpacity style={{ zIndex: 3 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="leftcircleo" size={24} color="black" />
          {/* <AntDesign name="left" size={24} color={BlackColor} /> */}
        </TouchableOpacity>
        <View style={{ paddingLeft: width * 0.04 }}>
          <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(22), textAlign: 'center' }}>Vaccine Details</Text>
        </View>
      </View>
      <View style={{ flex: 1,zIndex:2 }}>
        <ScrollView >
          <View>
            <View style={{marginTop:width*0.06}}>
              <Image source={{ uri: parentingdata.blog_img }} style={{ width, height: width * 0.6, resizeMode:'cover', backgroundColor: 'rgba(0,0,0,0.08)' }} />
              <View>
                <Text style={{fontFamily:'Fredoka-SemiBold',fontSize:getFontSize(17),marginTop:width*0.06,}}>{parentingdata.blog_tittle}</Text>
                <Text style={{fontFamily:'Fredoka-Regular',fontSize:getFontSize(13),marginTop:width*0.02,}}>{parentingdata.blog_Description}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <UIBgKidFoot/>
    </View>
  )
}

export default ParentingTipsndArticles

const styles = StyleSheet.create({})