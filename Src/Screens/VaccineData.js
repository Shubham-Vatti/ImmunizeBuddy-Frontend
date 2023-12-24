import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BlackColor, LightBlueColor, WhiteColor } from '../Components/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { UIBgKidFoot, getFontSize } from '../Utils/UiComps'

const VaccineData = ({ route, navigation }) => {
    const { vacciData } = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: WhiteColor, paddingHorizontal: width * 0.03, width }}>
            <ScrollView
            style={{zIndex:4}}
            showsVerticalScrollIndicator={false}
            >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: height * 0.03 }}>
                <TouchableOpacity style={{ zIndex: 3 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="leftcircleo" size={24} color="black" />
                    {/* <AntDesign name="left" size={24} color={BlackColor} /> */}
                </TouchableOpacity>
                <View style={{ paddingLeft: width * 0.04 }}>
                    <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign: 'center' }}>Vaccine Details</Text>
                </View>
            </View>
            <View style={{paddingBottom:width*0.04}}>
                <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(16),marginTop:width*0.08, color: BlackColor }}>{vacciData.vaccine_name}</Text>
                <Text style={{ fontFamily: 'Fredoka-Regular', fontSize: getFontSize(14), color: BlackColor,marginTop:width*0.02 }}>{vacciData.vaccine_details}</Text>
                <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(16),marginTop:width*0.04 }}>When to give vaccine :-</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width, marginVertical: width * 0.024 }}>
                    <Image source={require('../Assets/schedule.png')} style={{ width: width * 0.08, height: width * 0.08, resizeMode: 'contain' }} />
                    <Text style={{ fontFamily: 'Fredoka-Medium', width: width * 0.8, marginLeft: width * 0.01, fontSize: getFontSize(14), color: BlackColor }}>{vacciData.when_to_give_vaccine}</Text>
                </View>
                <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(16) }}>Side Effects :-</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width }}>
                    <FlatList
                        data={vacciData.vaccine_side_effect}
                        renderItem={({ item }) => {
                            return (<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: width * 0.01, marginVertical: width * 0.024 }}>
                                <Image source={require('../Assets/fatigue.png')} style={{ width: width * 0.08, height: width * 0.08, resizeMode: 'contain' }} />
                                <Text style={{ fontFamily: 'Fredoka-Medium', width: width * 0.8, marginLeft: width * 0.01, fontSize: getFontSize(14), color: BlackColor }}>{item}</Text>
                            </View>)
                        }}
                    />
                    {/* {.map((ele)=>{ */}
                    {/* })} */}
                </View>
                <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(16) }}>Vaccine Route :-</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: width * 0.02 }}>
                    {vacciData.vaccine_route == 'Oral' && <Image source={require('../Assets/oral-vaccine.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {((vacciData.vaccine_route == 'Left upper Arm') || (vacciData.vaccine_route == 'Left Upper Arm') || (vacciData.vaccine_route == 'Upper Arm')) && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {vacciData.vaccine_route == 'Right upper Arm' && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {((vacciData.vaccine_route == 'Intra-dermal Right upper arm')||(vacciData.vaccine_route == 'Intra dermal two fractional dose')||(vacciData.vaccine_route == 'Intra-dermal')||(vacciData.vaccine_route == 'Intra-muscular')) && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {((vacciData.vaccine_route == 'Antero-lateral side of mid-thigh')||(vacciData.vaccine_route == 'Sub-cutaneous')) && <Image source={require('../Assets/thigh.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, width: width * 0.8, marginLeft: width * 0.02, fontSize: getFontSize(14) }}>{vacciData.vaccine_route}</Text>
                </View>
                <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(16) }}>Vaccine Dose :-</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: width * 0.012 }}>
                    <Image source={require('../Assets/oral-vaccine.png')} style={{ width: width * 0.08, height: width * 0.08 }} />
                    <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, marginLeft: width * 0.02, fontSize: getFontSize(14) }}>{vacciData.vaccine_dose}</Text>
                  </View>
                <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(16) }}>Vaccine Site :-</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: width * 0.02 }}>
                    {vacciData.vaccine_site == 'Oral' && <Image source={require('../Assets/oral-vaccine.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {((vacciData.vaccine_site == 'Left upper Arm') || (vacciData.vaccine_site == 'Left Upper Arm') || (vacciData.vaccine_site == 'Upper Arm')) && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {vacciData.vaccine_site == 'Right upper Arm' && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {vacciData.vaccine_site == 'Intra-dermal Right upper arm' && <Image source={require('../Assets/muscle.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    {vacciData.vaccine_site == 'Antero-lateral side of mid-thigh' && <Image source={require('../Assets/thigh.png')} style={{ width: width * 0.08, height: width * 0.08 }} />}
                    <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, width: width * 0.8, marginLeft: width * 0.02, fontSize: getFontSize(14) }}>{vacciData.vaccine_site}</Text>
                </View>
            </View>
            {/* <View style={{paddingVertical: height * 0.02}}>
    <ScreenLogoHeader navigation={navigation}/>
    </View> */}
    </ScrollView>
    <UIBgKidFoot/>
        </View>
    )
}

export default VaccineData

const styles = StyleSheet.create({})