import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BlackColor, LightBlueColor, WhiteColor } from '../../Components/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
const { width, height } = Dimensions.get('window')

const AboutUsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: WhiteColor }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.05, marginBottom: height * 0.02, paddingHorizontal: width * 0.04 }}>
                <TouchableOpacity style={{}}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="leftcircleo" size={24} color="black" />
                    {/* <AntDesign name="left" size={24} color={BlackColor} /> */}
                </TouchableOpacity>
                <View style={{paddingLeft:width*0.04}}>
                    <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign: 'center' }}>About Us</Text>
                </View>
            </View>
            <ScrollView
                style={{ zIndex: 2 }}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Image source={require('../../Assets/Aboutus.png')} style={{ width: width * 0.8, height: width * 0.8, resizeMode: 'contain', alignSelf: 'center',opacity:0.9 }} />
                </View>
                <View style={{paddingHorizontal:width*0.05}}>
                    <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(18), textAlign: 'center' }}>Welcome to ImmunizeBuddy!</Text>
                    <Text style={{ fontFamily: 'Fredoka-Regular', marginTop: height * 0.01, color: BlackColor, fontSize: getFontSize(14), textAlign: 'center' }}>At ImmunizeBuddy, we understand that the health and well-being of your newborn is your top priority. Our mission is to support parents and caregivers in ensuring your baby receives the best care possible. We believe in the power of informed decisions and timely vaccinations to protect your child.</Text>
                    <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(18), marginTop: height * 0.03 }}>Our Commitment</Text>
                    <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14), marginVertical: height * 0.005, marginTop: height * 0.01 }}>{`1) Reliable Information: `}<Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(14) }}>We are committed to providing accurate and up-to-date information about vaccines and their importance. We strive to be your trusted source for all things related to your baby's health.</Text></Text>
                    <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14), marginVertical: height * 0.005 }}>{`2) Convenience: `}<Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(14) }}>With customizable reminders and easy-to-use features, we make it convenient for you to stay on top of your baby's vaccination schedule and growth milestones.</Text></Text>
                    <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14), marginVertical: height * 0.005 }}>{`3) Community and Support: `}<Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(14) }}>ImmunizeBuddy Tracker is more than just an app; it's a community of parents, caregivers, and healthcare professionals. We're here to support you on your parenting journey.</Text></Text>
                    <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14), marginVertical: height * 0.005, paddingBottom: width * 0.02 }}>{`4) Peace of Mind: `}<Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(14) }}>We know that parenting can be overwhelming, especially with a newborn. Our app is designed to give you peace of mind by simplifying the process of tracking vaccinations and keeping health records in one place.</Text></Text>
                </View>
            </ScrollView>
            <UIBgKidFoot />
        </View>
    )
}

export default AboutUsScreen

const styles = StyleSheet.create({})