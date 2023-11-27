import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { WhiteColor } from '../Components/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'

const DoctorsScreen = () => {
  return (
    <View style={{flex:1,backgroundColor:WhiteColor}}>
      <View>
      <AntDesign name="search1" size={24} color="black" />
      <TextInput placeholder='Search ...'/>
      </View>
    </View>
  )
}

export default DoctorsScreen

const styles = StyleSheet.create({})