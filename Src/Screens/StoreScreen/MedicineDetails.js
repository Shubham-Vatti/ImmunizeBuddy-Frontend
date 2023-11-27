import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WhiteColor } from '../../Components/Colors'

const MedicineDetails = () => {
  return (
    <View style={{flex:1,backgroundColor:WhiteColor}}>
      <Image
      source={require('../../Assets/Logo.png')}
      />
    </View>
  )
}

export default MedicineDetails

const styles = StyleSheet.create({})