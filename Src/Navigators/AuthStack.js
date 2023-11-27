import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../Screens/WelcomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import { BlackColor } from '../Components/Colors';
import GetStartScreen from '../Screens/GetStartScreen';
import EmailLoginScreenn from '../Screens/ProfileScreens/EmailLoginScreenn'
import SignupScreen from '../Screens/ProfileScreens/SignupScreen'
import BottomTabNavigator from './BottomTabNavigator';
import DrawerStack from './DrawerStack';
import SplashScreen from '../Screens/SplashScreen';
import HelpDesk from '../Screens/MoreScreens/HelpDesk';
import AboutUsScreen from '../Screens/MoreScreens/AboutUsScreen';
import ContactUsScreen from '../Screens/MoreScreens/ContactUsScreen';
import MedicineScreens from '../Screens/StoreScreen/MedicineScreens';
import ProductsScreen from '../Screens/StoreScreen/ProductsScreen';
import MedicineDetails from '../Screens/StoreScreen/MedicineDetails';
import ForgotPasswordScreen from '../Screens/ProfileScreens/ForgotPasswordScreen'
import RegisterUserScreen from '../Screens/ProfileScreens/RegisterUserScreen';
import RegisterChildScreen from '../Screens/ProfileScreens/RegisterChildScreen';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'transparentModal' }} useLegacyImplementation={true}>
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='EmailLoginScreen' component={EmailLoginScreenn} />
      <Stack.Screen name='SignupScreen' component={SignupScreen} />
      <Stack.Screen name='RegisterScreen' component={RegisterUserScreen} />
      <Stack.Screen name='RegisterChildScreen' component={RegisterChildScreen} />
      <Stack.Screen name='Helpdesk' component={HelpDesk} />
      <Stack.Screen name='Aboutus' component={AboutUsScreen} />
      <Stack.Screen name='Contactus' component={ContactUsScreen} />
      <Stack.Screen name='Medicinescreen' component={MedicineScreens} />
      <Stack.Screen name='MedicineDetailsscreen' component={MedicineDetails} />
      <Stack.Screen name='ProductsScreen' component={ProductsScreen} />
      <Stack.Screen name='UserProductFogrotPass' component={ForgotPasswordScreen} />
      <Stack.Screen name='BottomNavigator' component={BottomTabNavigator}/>
      <Stack.Screen name='DrawerNavigation' component={DrawerStack}/>
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})