
import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'

export const ContextProvider=createContext()

const ContextState = ({children}) => {
    const[AuthToken,SetAuthToken]=useState('')
    const[LoginID,SetLoginID]=useState('')
    const[UserEmailID,SEtUserEmailID]=useState('')
    return (
      <ContextProvider.Provider value={{AuthToken,SetAuthToken,LoginID,SetLoginID,UserEmailID,SEtUserEmailID}}>{children}</ContextProvider.Provider>
    )
}

export default ContextState

const styles = StyleSheet.create({})