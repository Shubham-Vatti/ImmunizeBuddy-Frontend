import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, WhiteColor } from '../../Components/Colors'
import { BlueButton, BlueButtonLoadingUI, UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RegisterUserScreen = ({navigation}) => {
    const [FatherName,SetFatherName]=useState('')
    const [MotherName,SetMotherName]=useState('')
    const [Adress,SetAddress]=useState('')
    const [MobileNumber,SetMobileNumber]=useState('')
    const [EmailId,SetEmailId]=useState('')
    const [isLoading,SetIsLoading]=useState(false)
    const HandleFunc=()=>{
        try{
            navigation.navigate('RegisterChildScreen')
        }
        catch(Err)
        {
            console.log(Err)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: WhiteColor, }}>
            <View style={{flex:1,zIndex:2}}>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
                <View style={{ alignItems: 'center', marginTop: height * 0.05 }}>
                    <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24) }}>Register yourself</Text>
                    <Image source={require('../../Assets/registerimg.png')} style={{ marginTop: width * 0.04, width: width * 0.6, height: width * 0.6, opacity: 0.9 }} />
                </View>
                <View style={{alignItems:'center',marginTop:width*0.04}}>
                    <View style={{marginTop:width*0.02}}> 
                        <Text style={styles.TextinputTitle}>{'Parent Name (Father Name) :-'}</Text>
                        <View style={[styles.TectInputView,{marginVertical:width*0.01}]}>
                            <AntDesign name="user" size={24} color={LightBlack} />
                            <TextInput
                                placeholder='Sample Name'
                                value={FatherName}
                                onChangeText={(txt)=>SetFatherName(txt)}
                                placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:width*0.02}}>
                        <Text style={styles.TextinputTitle}>{'Parent Name (Mother Name) :-'}</Text>
                        <View style={[styles.TectInputView,{marginVertical:width*0.01}]}>
                            <AntDesign name="user" size={24} color={LightBlack} />
                            <TextInput
                                placeholder='Sample Name'
                                value={MotherName}
                                onChangeText={(txt)=>SetMotherName(txt)}
                                placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:width*0.02}}>
                        <Text style={styles.TextinputTitle}>{'Address :-'}</Text>
                        <View style={[styles.TectInputView,{marginVertical:width*0.01}]}>
                            {/* <AntDesign name="user" size={24} color={LightBlack} /> */}
                            <Entypo name="location" size={24} color={LightBlack} />
                            <TextInput
                                placeholder='Enter address'
                                value={SetAddress}
                                onChangeText={(txt)=>SetAddress(txt)}
                                placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:width*0.02}}>
                        <Text style={styles.TextinputTitle}>{'Mobile Number :-'}</Text>
                        <View style={[styles.TectInputView,{marginVertical:width*0.01}]}>
                            <Ionicons name="call-outline" size={24} color={LightBlack} />
                            <TextInput
                            keyboardType='number-pad'
                                placeholder='9xxxxxxxxx'
                                value={MobileNumber}
                                onChangeText={(txt)=>SetMobileNumber(txt)}
                                placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                            />
                        </View>
                    </View>
                    <View style={{marginTop:width*0.02}}>
                        <Text style={styles.TextinputTitle}>{'Email Id :-'}</Text>
                        <View style={[styles.TectInputView,{marginVertical:width*0.01}]}>
                            {/* <AntDesign name="user" size={24} color={LightBlack} />
                             */}
                            <Entypo name="email" size={24} color={LightBlack} />
                            <TextInput
                                placeholder='Sample@gmail.com'
                                value={EmailId}
                                onChangeText={(txt)=>SetEmailId(txt)}
                                keyboardType='email-address'
                                placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                            />
                        </View>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    {isLoading?<BlueButtonLoadingUI txt={'Please wait'}/>:<BlueButton txt={'Next'} HandleFunc={HandleFunc}/>}
                </View>
                </ScrollView>
            </View>
            <UIBgKidFoot/>
        </View>
    )
}

export default RegisterUserScreen

const styles = StyleSheet.create({
    TextinputTitle: { color: BlackColor, fontFamily: 'Fredoka-Regular', fontSize: getFontSize(14.2) },
    TextInputDesign: {
        fontSize: getFontSize(14),
        fontFamily: 'Fredoka-Regular',
        width: width * 0.74,
        paddingHorizontal: width * 0.02
    },
    TectInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        borderColor: LightBlack,
        borderWidth: 1,
        width: width * 0.88,
        paddingHorizontal: width * 0.04
    }
})