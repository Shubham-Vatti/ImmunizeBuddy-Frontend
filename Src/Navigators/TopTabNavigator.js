import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InfantScreen from '../Screens/VaccineDetails/InfantScreen';
import ChildrenScreen from '../Screens/VaccineDetails/ChildrenScreen';
const Tab=createMaterialTopTabNavigator()
const TopTabNavigator = () => {
  return (
    <Tab.Navigator
    // screenOptions={}
    >
        <Tab.Screen name='Infant' component={InfantScreen}/>
        <Tab.Screen name='Children' component={ChildrenScreen}/>
    </Tab.Navigator>
  )
}



export default TopTabNavigator

const styles = StyleSheet.create({})