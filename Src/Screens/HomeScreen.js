import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, WhiteColor } from '../Components/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AppLoadingScreen, LightBlueLine, ScreenLogoHeader, ScreenWithoutDrawerHeader, getFontSize } from '../Utils/UiComps'
const { width, height } = Dimensions.get('window')
import { useFocusEffect } from '@react-navigation/native';
import { Base_Url } from '../Utils/AppFeatures'
import { ContextProvider } from './StateManagment/ContextState'
const HomeScreen = ({ navigation }) => {
  const [VaccineList, SetVaccineList] = useState([])
  const { AuthToken, SetAuthToken } = useContext(ContextProvider)  //Authtoken UseContext
  const { LoginID, SetLoginID } = useContext(ContextProvider)
  const { UserEmailID, SEtUserEmailID } = useContext(ContextProvider)

  useFocusEffect(
    useCallback(() => {
      const GetVaccineDatas = async () => {
        try {
          await fetch(`${Base_Url}/Approval-Reject/get-approval-data`, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.type == "Sucessfully Data gets") {
                SetVaccineList(result.Vaccine_List)
              }
              else {

              }
              // console.log(LoginID)
            })
            .catch((err) => {
              console.log(err)
            })
        }
        catch (Err) {
          console.log(Err)
        }
      }
      GetVaccineDatas();
      return () => {

      }
    }, [])
  )




  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor, width }}>
      <View style={{ paddingHorizontal: width * 0.024 }}>
        {/* <ScreenLogoHeader navigation={navigation} /> */}
        <View style={{ paddingVertical: height * 0.02}}>
        <ScreenWithoutDrawerHeader navigation={navigation}/>
        </View>
        <LightBlueLine/>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={VaccineList}
          renderItem={({ item }) => {
            return (
              <Pressable style={({pressed})=>[{ alignItems: 'center', marginVertical: width * 0.02,backgroundColor:pressed?"rgba(0,0,0,0.06)":WhiteColor,width:width*0.9,alignSelf:'center',borderRadius:width*0.02 }]}
              onPress={()=>navigation.navigate('NewHome',{
                vaccinedata:item
              })}
              
              >
                <View style={{ borderColor: LightBlack, borderWidth: 1, padding: width * 0.02, borderRadius: width * 0.02, width: width * 0.9 }}>
                  <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(14) }}>{item.Vaccine_name}</Text>
                  <View style={{ alignSelf: 'flex-end', marginTop: width * 0.01 }}>
                    <FlatList
                      data={item.Assigned_user}
                      renderItem={({ item }) => {
                        if (item.userId && item.userId == LoginID) {
                          return (
                            <View style={{ flexDirection: 'row', backgroundColor: 'lightgreen', width: width * 0.5, borderRadius: 100, alignItems: "center" }}>
                              <Image source={require('../Assets/checked.png')} style={{ width: width * 0.08, height: width * 0.08, resizeMode: 'contain' }} />
                              <Text style={{ fontFamily: "Fredoka-Medium", marginLeft: width * 0.01, width: width * 0.4 }}>Vaccine Data Approved</Text>
                            </View>
                          )
                        }
                      }}
                    />
                    {/* {item.Assigned_user.map((ele)=>{
                  if(ele.userId&&ele.userId==LoginID)
                  {
                    return(
                      // console.log('Approved')
                      <View style={{flexDirection:'row',backgroundColor:'lightgreen',width:width*0.5,borderRadius:100,alignItems:"center"}}>
                        <Image source={require('../Assets/checked.png')} style={{width:width*0.08,height:width*0.08,resizeMode:'contain'}}/>
                        <Text style={{fontFamily:"Fredoka-Medium",marginLeft:width*0.01,width:width*0.4}}>Vaccine Data Approved</Text>
                      </View>
                    )
                  }
                  else if(ele.userId&&ele.userId!=LoginID){
                    return(
                      <TouchableOpacity style={{backgroundColor:LightBlueColor,width:width*0.3,paddingVertical:width*0.02,borderRadius:width*0.02,flexDirection:"row",justifyContent:"center",alignSelf:'flex-end',alignItems:"center"}}>
                        <Image source={require('../Assets/camera.png')} style={{width:width*0.06,height:width*0.06,resizeMode:'contain'}}/>
                        <Text style={{fontFamily:'Fredoka-Medium',color:WhiteColor,fontSize:getFontSize(14),marginLeft:width*0.01}}>Upload</Text>
                      </TouchableOpacity>
                      )
                  }
                })} */}
                  </View>
                </View>
              </Pressable>
            )
          }}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})