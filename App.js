import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './Src/Navigators/AuthStack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ContextState from './Src/Screens/StateManagment/ContextState'

const App = () => {
  return (
    <ContextState>
    <GestureHandlerRootView style={{flex:1}}>
    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
    </GestureHandlerRootView>
    </ContextState>
  )
}

export default App

const styles = StyleSheet.create({})