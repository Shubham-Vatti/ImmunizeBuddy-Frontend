import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import UserProfile from '../Screens/ProfileScreens/UserProfileScreen'
import BottomTabNavigator from './BottomTabNavigator'
import CustomDrawer from '../Components/CustomDrawer'
import { LightWhite, WhiteColor } from '../Components/Colors'
import HomeScreen from '../Screens/HomeScreen'
import DoctorsScreen from '../Screens/DoctorsScreen'
import StoreScreen from '../Screens/StoreScreen'
import VaccineDetails from '../Screens/VaccineDetails'
import MoreScreen from '../Screens/MoreScreen'
const width = Dimensions.get('window').width
// import {BlackColor, LightBlueColor} from '../Components/Colors'
const height = Dimensions.get('window').height
const DrawerTab = createDrawerNavigator()

const DrawerStack = ({ navigation }) => {
  return (
    <DrawerTab.Navigator screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: WhiteColor, width: width * 0.66, borderTopRightRadius: width * 0.04, borderBottomRightRadius: width * 0.04 } }} drawerContent={(props) => { return <CustomDrawer props={props} navigation={navigation} /> }}>
      <DrawerTab.Screen name='Home' component={HomeScreen} />
      <DrawerTab.Screen name='Dr' component={DoctorsScreen} />
      <DrawerTab.Screen name='Store' component={StoreScreen} />
      <DrawerTab.Screen name='vaccinedata' component={VaccineDetails} />
      <DrawerTab.Screen name='Setting' component={MoreScreen} />
      {/* <DrawerTab.Screen name='Home' component={HomeScreen}/> */}
    </DrawerTab.Navigator>
  )
}

export default DrawerStack

const styles = StyleSheet.create({})