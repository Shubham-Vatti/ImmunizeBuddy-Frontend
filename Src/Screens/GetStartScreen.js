import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem } from '../Utils/UiComps'
import { WhiteColor } from '../Components/Colors'

const data={
    id:1,
    img:require('../Assets/s1sample.png'),
    title:'Welcome',
    description:"Welcome to ImmunzeBuddy, your baby's health companion!"
  }
const GetStartScreen = () => {
  return (
    <View style={{flex:1,backgroundColor:WhiteColor}}>
    <ListItem item={data} index={0}/>
    </View>
  )
}

export default GetStartScreen

const styles = StyleSheet.create({})