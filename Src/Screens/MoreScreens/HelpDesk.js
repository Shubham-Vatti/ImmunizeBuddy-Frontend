import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlackColor, LightBlack, LightBlueColor, LightLightBlueColor, WhiteColor } from '../../Components/Colors'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
const HelpDesk = ({ navigation }) => {
    const ScrollTOX = useSharedValue(10)
    const TextScrollTOX = useSharedValue(0)
    const InterpolateXInput = [0, 150]
    const OnEndFunction = () => {
        Linking.openURL(`tel:1098`)
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
        <View style={{ flex: 1, backgroundColor: WhiteColor, paddingHorizontal: width * 0.04 }}>
            <View >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.05 }}>
                    <TouchableOpacity style={{ zIndex: 2 }}
                        onPress={() => navigation.goBack()}
                    >
                        {/* <AntDesign name="left" size={24} color={BlackColor} /> */}
                        <AntDesign name="leftcircleo" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ paddingLeft: width * 0.04 }}>
                        <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign: 'center' }}>Help Desk</Text>
                    </View>
                </View>
                <View>
                    <Image source={require('../../Assets/KidDR.png')} style={{ width: width * 0.6, height: width * 0.6, alignSelf: 'center', opacity: 0.9, marginTop: width * 0.06, resizeMode: 'contain' }} />
                </View>
                <View style={{ zIndex: 2 }}>
                    <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(14), textAlign: 'center', marginTop: height * 0.04 }}>In India, the Child Helpline number is "1098." This toll-free number is available 24/7 and is intended to provide support and assistance to children in need. If you suspect a child is in distress, facing abuse, or in a difficult situation, you can call 1098 to report the issue or seek help for the child. Childline India Foundation operates this service, and they have trained professionals who can respond to child protection concerns. It's important to use this number responsibly to ensure that children receive the help they need.</Text>
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
            </View>
            <UIBgKidFoot />
        </View>
    )
}

export default HelpDesk

const styles = StyleSheet.create({})