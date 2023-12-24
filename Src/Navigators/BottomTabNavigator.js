import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { lazy } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen';
import DoctorsScreen from '../Screens/DoctorsScreen'
import ParentingTipsndArticles from '../Screens/ParentingTipsndArticles'
import DrawerStack from './DrawerStack'
import StoreScreen from '../Screens/StoreScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MoreScreen from '../Screens/MoreScreen'
import VaccineDetails from '../Screens/VaccineDetails'
const { width, height } = Dimensions.get('window')
import { getFontSize } from '../Utils/UiComps'
import { BlackColor, LightBlack, LightBlueColor, LightBottomBlackColor } from '../Components/Colors'
import ParentingTipsandBlogs from '../Screens/ParentingTipsandBlogs';

const BottomStack = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const CustomButton = ({ children, onPress }) => (
        <TouchableOpacity

            onPress={onPress}
            style={{ top: -height * 0.04, justifyContent: 'center', alignItems: 'center', width: width * 0.18, height: width * 0.18, borderRadius: 100, backgroundColor: LightBlueColor, elevation: 42 }}
        >
            <View style={{ width: width * 0.18, height: width * 0.18, }}>
                {children}
            </View>
        </TouchableOpacity>
    )
    return (
        <BottomStack.Navigator screenOptions={({ route }) => ({ headerShown: false,
        // tabBarItemStyle:{borderTopColor:LightBlueColor,borderTopWidth:1}
        })} initialRouteName='Home'>
            <BottomStack.Screen name='Vaccine Data' component={VaccineDetails}
                options={
                    {
                        tabBarIcon: (tabinfo) => {
                            return (tabinfo.focused ? <Image
                                source={require('../Assets/doc.png')}
                                style={{ height: width * 0.06, resizeMode: 'contain', width: width * 0.06 }}
                            /> : <Image
                                source={require('../Assets/docs.png')}
                                style={{ height: width * 0.06, width: width * 0.06 }}
                            />)
                        },
                        // tabBarStyle:{borderTopColor:'red',borderTopWidth:1,},
                        tabBarActiveTintColor: BlackColor,
                        tabBarInactiveTintColor: LightBottomBlackColor,
                        tabBarLabelStyle: { fontFamily: 'Fredoka-Medium', textAlign: 'center' }
                        // tabBarLabel:"",
                    }
                } />
            <BottomStack.Screen name='Dr' component={DoctorsScreen}
                options={
                    {
                        tabBarIcon: (tabinfo) => {
                            return (!tabinfo.focused ? <Image
                                source={require('../Assets/drio.png')}
                                style={{ height: width * 0.06, resizeMode: 'contain', width: width * 0.06 }}
                            /> : <Image
                                source={require('../Assets/dri.png')}
                                style={{ height: width * 0.06, width: width * 0.06 }}
                            />)
                        },
                            tabBarActiveTintColor: BlackColor,
                            tabBarInactiveTintColor: LightBottomBlackColor,
                            tabBarLabelStyle: { fontFamily: 'Fredoka-Medium', textAlign: 'center' }
                    }
                } />
                <BottomStack.Screen name='Home' component={HomeScreen}
                    options={
                        {
                            tabBarIcon: (tabinfo) => {
                                return ( <Image
                                    source={require('../Assets/house.png')}
                                    style={{ height: width * 0.084, resizeMode: 'contain', width: width * 0.084 }}
                                />)
                            },
                            tabBarLabel: '',
                            tabBarButton: (props) => (
                                <CustomButton {...props} />
                            )
                        }
                    } />
            <BottomStack.Screen name='Blogs' component={ParentingTipsandBlogs}
                options={
                    {
                        tabBarIcon: (tabinfo) => {
                            return (tabinfo.focused ? <Image
                                source={require('../Assets/blog.png')}
                                style={{ height: width * 0.06, resizeMode: 'contain', width: width * 0.06 }}
                            /> : <Image
                                source={require('../Assets/blo.png')}
                                style={{ height: width * 0.06, width: width * 0.06 }}
                            />)
                        },
                        tabBarActiveTintColor: BlackColor,
                        tabBarInactiveTintColor: LightBottomBlackColor,
                        tabBarLabelStyle: { fontFamily: 'Fredoka-Medium', textAlign: 'center' }
                        // tabBarLabel:"",
                    }
                } />
            <BottomStack.Screen name='More' component={MoreScreen}
                options={
                    {
                        tabBarIcon: (tabinfo) => {
                            return (tabinfo.focused ? <Image
                                source={require('../Assets/more.png')}
                                style={{ height: width * 0.07, resizeMode: 'contain', width: width * 0.07 }}
                            /> : <Image
                                source={require('../Assets/mor.png')}
                                style={{ height: width * 0.07, width: width * 0.07 }}
                            />)
                        },
                        // tabBarItemStyle:{backgroundColor:'red'},
                        tabBarActiveTintColor: BlackColor,
                        tabBarInactiveTintColor: LightBottomBlackColor,
                        tabBarLabelStyle: { fontFamily: 'Fredoka-Medium', textAlign: 'center' }
                    }
                } />
        </BottomStack.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})