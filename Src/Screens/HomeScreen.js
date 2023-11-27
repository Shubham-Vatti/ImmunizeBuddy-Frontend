import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlackColor, WhiteColor } from '../Components/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AppLoadingScreen, ScreenLogoHeader } from '../Utils/UiComps'
const { width, height } = Dimensions.get('window')

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:WhiteColor,paddingHorizontal: width * 0.024, paddingTop: height * 0.02}}>
      <ScreenLogoHeader navigation={navigation}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})