import { Dimensions, FlatList, Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View, Animated, PermissionsAndroid } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
// import {Animated } from 'react-native-reanimated'
// import Animated, { Easing, Value, interpolate, timing, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Slide } from '../Utils/AppFeatures'
import { DotItem, ListItem, getFontSize } from '../Utils/UiComps'
import { BlackColor, LightBlack, WhiteColor } from '../Components/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
const fontScale = PixelRatio.getFontScale();
const { width, height } = Dimensions.get('window')
// export const getFontSize = size => size / fontScale;
let flatList1;

const WelcomeScreen = ({ navigation }) => {

  // useEffect(async () => {
  //   if (PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION')) {

  //   }
  //   else {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'ImmunizeBuddy Location Permission',
  //         message:
  //           'ImmunizeBuddy needs access your current Location ',
  //         // buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //     // PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION')
  //   }
  // }, [])
  const scrollX = useRef(new Animated.Value(0)).current
  const [currentIndex, setCurrentIndex] = useState(0)
  const onViewRef = React.useRef((viewableItems) => {
    setCurrentIndex(viewableItems.viewableItems[0].index)
  })
  const SkipButton = () => {
    if (flatList1 != undefined && flatList1 != null) {
      flatList1.scrollToOffset({ animated: true, offset: width * (3) })
      navigation.navigate('LoginScreen')
    }
  }
  const ClickedNext = () => {
    if (flatList1 != undefined && flatList1 != null) {
      flatList1.scrollToOffset({ animated: true, offset: width * (currentIndex + 1) })
    }
  }
  const ClickedBack = () => {
    if (flatList1 != undefined && flatList1 != null) {
      flatList1.scrollToOffset({ animated: true, offset: width * (currentIndex - 1) })
    }
  }

  const GetCurrentSlide = async () => {
    try {
      console.log('--asyncdata--',currentIndex.toString())
      await AsyncStorage.setItem('CurrentSlide', currentIndex.toString())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetCurrentSlide()
  }, [currentIndex])

  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor }}>
      {currentIndex != 0 ? <TouchableOpacity style={{ paddingHorizontal: width * 0.04, marginTop: height * 0.028, flexDirection: 'row', justifyContent: 'space-between', width: width * 0.166, zIndex: 2 }}
        onPress={() => ClickedBack()}
      >
        <AntDesign name="left" size={width * 0.068} color="grey" />
      </TouchableOpacity> : <View style={{ paddingHorizontal: width * 0.04, marginTop: height * 0.028, flexDirection: 'row', justifyContent: 'space-between', width: width * 0.166, zIndex: 2 }}><View style={{ width: width * 0.068, height: width * 0.068 }} /></View>}
      <View style={{ zIndex: 2, flex: 1 }}>
        <FlatList
          ref={(flatList) => { flatList1 = flatList }}
          pagingEnabled
          bounces={false}
          onViewableItemsChanged={onViewRef.current}
          showsHorizontalScrollIndicator={false}
          keyExtractor={key => key.id.toString()}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 25,
            minimumViewTime: 200,
          }}
          scrollEventThrottle={16}
          decelerationRate={"normal"}
          data={Slide}
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEnabled
          renderItem={({ item, index }) => {
            return <ListItem item={item} index={index} />
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.06, bottom: width * 0.04 }}>
          <TouchableOpacity
            onPress={() => SkipButton()}
          >
            <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(15) }}>Skip</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {Slide.map((ele, i) => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
              const DotStyling = scrollX.interpolate({
                inputRange,
                outputRange: [4, 7, 4],
                extrapolate: 'clamp'

              })
              const bgColor = scrollX.interpolate({
                inputRange,
                outputRange: [LightBlack, BlackColor, LightBlack],
                extrapolate: 'clamp'

              })
              return (
                <Animated.View key={ele.id} style={[{ width: DotStyling, margin: width * 0.008, height: DotStyling, backgroundColor: bgColor, borderRadius: 100 }]} />
              )
            })}
          </View>
          <TouchableOpacity
            onPress={() => { currentIndex != 3 ? ClickedNext() : navigation.navigate('LoginScreen') }}
          >
            <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(15) }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: 'absolute', zIndex: 1 }}>
        <Image source={require('../Assets/Kidfoot.png')} style={{ width: width * 0.48, marginTop: height * 0.56, opacity: 0.6, height: width * 0.48, left: -width * 0.2, resizeMode: 'contain', transform: [{ rotate: '25deg' }] }} />
      </View>
      <View style={{ position: 'absolute', zIndex: 2, right: 0 }}>
        <Image source={require('../Assets/Kidfoot1.png')} style={{ width: width * 0.48, overflow: 'hidden', marginTop: height * 0.2, opacity: 0.4, height: width * 0.48, right: -width * 0.2, resizeMode: 'contain', transform: [{ rotate: '-25deg' }] }} />
      </View>
      <View style={{ position: 'absolute', zIndex: 1, right: 0 }}>
        <Image source={require('../Assets/Kidfoot2.png')} style={{ width: width * 0.48, marginTop: height * 0.8, opacity: 0.4, height: width * 0.48, right: -width * 0.2, resizeMode: 'contain', transform: [{ rotate: '-25deg' }] }} />
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})