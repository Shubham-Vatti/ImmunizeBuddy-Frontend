import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BlackColor, LightBlueColor, WhiteColor } from '../../Components/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { UIBgKidFoot, getFontSize } from '../../Utils/UiComps'

const ContactUsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: WhiteColor, paddingHorizontal: width * 0.04 }}>
            <View style={{flexDirection:'row',alignItems:'center', marginTop: height * 0.05,}}>
                <TouchableOpacity style={{ zIndex: 3 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="leftcircleo" size={24} color="black" />
                    {/* <AntDesign name="left" size={24} color={BlackColor} /> */}
                </TouchableOpacity>
                <View style={{paddingLeft:width*0.04}}>
                <Text style={{  fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign:'center' }}>Contact Us</Text>
                </View>
            </View>
            <View>
                <Image source={require('../../Assets/Contactus.png')} style={{ width: width * 0.6, height: width * 0.6, alignSelf: 'center', resizeMode: 'contain' ,opacity:0.9}} />
            </View>
            <View style={{zIndex:2}}>
                <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(15), textAlign: 'center' }}>If you have any questions, suggestions, or need assistance, don't hesitate to reach out to us. Your feedback is valuable in helping us improve and better serve you.</Text>
                <Text style={{ color: BlackColor, marginTop: height * 0.02, fontFamily: 'Fredoka-Medium', textAlign: 'center', fontSize: getFontSize(14) }}>Thank you for choosing ImmunizeBuddy!</Text>
                <Text style={{ fontFamily: 'Fredoka-Regular', marginTop: height * 0.01, color: BlackColor, fontSize: getFontSize(15), textAlign: 'center' }}>Your baby's health is our priority, and we're honored to be a part of your parenting experience. Together, we can ensure your little one gets the best start in life.</Text>
            </View>
            <UIBgKidFoot/>
        </View>
    )
}

export default ContactUsScreen

const styles = StyleSheet.create({})