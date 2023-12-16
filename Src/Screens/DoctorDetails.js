import { Dimensions, FlatList, Image, Pressable, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlackColor, LightBlack, WhiteColor, LightLightBlueColor, LightBlueColor } from '../Components/Colors'
// import AntDesign from 'react-native-vector-icons/AntDesign'
import { LightBlueLine, ScreenLogoHeader, getFontSize } from '../Utils/UiComps'
import { Base_Url } from '../Utils/AppFeatures'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
const { width, height } = Dimensions.get('window')

const DoctorDetails = ({ navigation, route }) => {
    const ScrollTOX = useSharedValue(10)
    const TextScrollTOX = useSharedValue(0)
    const InterpolateXInput = [0, 150]
    const { Ddata } = route.params;
    const OnEndFunction = () => {
        Linking.openURL(`tel:${Ddata.doctor_mobileno}`)
    }
    const AnimatedGuestureHandler = useAnimatedGestureHandler({
        onActive: e => {
            ScrollTOX.value = e.translationX
        },
        // on,
        onEnd: (e) => {
            if (ScrollTOX.value > 200) {
                ScrollTOX.value = withSpring(208)
                runOnJS(OnEndFunction)();
                ScrollTOX.value = withSpring(10)
            }
            else {
                ScrollTOX.value = withSpring(10)
            }
        }
    });
    const TextStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(ScrollTOX.value, InterpolateXInput, [0.8, 0], Extrapolate.CLAMP),
            transform: [{ translateX: interpolate(ScrollTOX.value, InterpolateXInput, [0, 200, Extrapolate.CLAMP]) }]
        }
    })
    const AnimtedStyle = useAnimatedStyle(() => {
        return { transform: [{ translateX: ScrollTOX.value }] }
    })
    return (
        <View style={{ flex: 1, backgroundColor: WhiteColor, paddingHorizontal: width * 0.024, width }}>
            <ScrollView>
                <View style={{ paddingVertical: height * 0.02 }}>
                    <ScreenLogoHeader navigation={navigation} />
                </View>
                <LightBlueLine />
                <View style={{ paddingHorizontal: width * 0.02, marginTop: width * 0.04 }}>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            source={{ uri: Ddata.doctor_pic }}
                            style={{ width, height: width * 0.5, resizeMode: "contain", backgroundColor: LightBlack }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: width * 0.02 }}>
                        <Image source={require('../Assets/user.png')} style={{ width: width * 0.06, height: width * 0.06, resizeMode: 'contain' }} />
                        <Text style={{ fontFamily: 'Fredoka-Medium', width: width * 0.8, color: BlackColor, fontSize: getFontSize(14), marginLeft: width * 0.01 }}>{Ddata.doctor_name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: width * 0.02 }}>
                        <Image source={require('../Assets/doctor.png')} style={{ width: width * 0.06, height: width * 0.06, resizeMode: 'contain' }} />
                        <Text style={{ fontFamily: 'Fredoka-Medium', width: width * 0.8, color: BlackColor, fontSize: getFontSize(14), marginLeft: width * 0.01 }}>{Ddata.doctor_specialist}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: width * 0.02 }}>
                        <Image source={Ddata.doctor_gender == "Male" ? require('../Assets/male.png') : require('../Assets/sign.png')} style={{ width: width * 0.06, height: width * 0.06, resizeMode: 'contain' }} />
                        <Text style={{ fontFamily: 'Fredoka-Medium', width: width * 0.8, color: BlackColor, fontSize: getFontSize(14), marginLeft: width * 0.01 }}>{Ddata.doctor_gender}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: width * 0.02 }}>
                        <Image source={require('../Assets/biography.png')} style={{ width: width * 0.06, height: width * 0.06, resizeMode: 'contain' }} />
                        <Text style={{ fontFamily: 'Fredoka-Medium', width: width * 0.8, color: BlackColor, fontSize: getFontSize(14), marginLeft: width * 0.01 }}>{Ddata.doctor_bio}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: width * 0.02 }}>
                        <Image source={require('../Assets/money.png')} style={{ width: width * 0.06, height: width * 0.06, resizeMode: 'contain' }} />
                        <Text style={{ fontFamily: 'Fredoka-Medium', width: width * 0.8, color: BlackColor, fontSize: getFontSize(14), marginLeft: width * 0.01 }}>{Ddata.doctor_fees}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: width * 0.02 }}>
                        <Image source={require('../Assets/location.png')} style={{ width: width * 0.06, height: width * 0.06, resizeMode: 'contain' }} />
                        <Text style={{ fontFamily: 'Fredoka-Medium', width: width * 0.8, color: BlackColor, fontSize: getFontSize(14), marginLeft: width * 0.01 }}>{Ddata.doctor_address}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: height * 0.04 }}>
                    <View style={{ width: 280, backgroundColor: LightLightBlueColor, height: 60, borderRadius: width * 0.2, borderWidth: 1, borderColor: LightBlueColor, flexDirection: 'row', alignItems: 'center' }}>
                        <PanGestureHandler onGestureEvent={AnimatedGuestureHandler}>
                            <Animated.View style={[{ backgroundColor: LightBlueColor, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: width * 0.2, height: 50, }, AnimtedStyle]}>
                                <Feather name="phone-call" size={width * 0.06} color={WhiteColor} />
                            </Animated.View>
                        </PanGestureHandler>
                        <Animated.Text style={[{ fontFamily: 'Fredoka-Regular', marginLeft: width * 0.04, color: BlackColor, fontSize: getFontSize(14) }, TextStyle]}>{'Swipe to Call >>'}</Animated.Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DoctorDetails

const styles = StyleSheet.create({})