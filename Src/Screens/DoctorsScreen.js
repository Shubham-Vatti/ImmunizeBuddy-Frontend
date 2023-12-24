import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, WhiteColor } from '../Components/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AppLoadingScreen, LightBlueLine, ScreenLogoHeader, ScreenWithoutDrawerHeader, getFontSize } from '../Utils/UiComps'
import { Base_Url } from '../Utils/AppFeatures'
// import { Rating } from '@rneui/themed';
import { Rating, AirbnbRating } from 'react-native-ratings';
const { width, height } = Dimensions.get('window')

const DoctorsScreen = ({ navigation }) => {
  const [Doctordata, SetDoctordata] = useState([])
  const [isLoading, SetisLoading] = useState(false)
  useEffect(() => {
    GetDoctorList()
  }, [])
  const GetDoctorList = async () => {
    try {
      SetisLoading(true)
      await fetch(`${Base_Url}/doctor-Store/doctor-details`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          SetisLoading(false)
          SetDoctordata(result.doctor_data)
          // console.log(result.dr_rating)
        })
        .catch((error) => {
          SetisLoading(false)
          console.log(error)
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor, paddingHorizontal: width * 0.024, width }}>
      <View style={{ paddingVertical: height * 0.02 }}>
        {/* <ScreenLogoHeader navigation={navigation} /> */}
        <ScreenWithoutDrawerHeader navigation={navigation}/>
      </View>
      <LightBlueLine />
      <View style={{ flex: 1 }}>
        <FlatList
          data={Doctordata}
          renderItem={({ item }) => {
            console.log(item.dr_rating)
            return (
              <View style={{ flexDirection: 'row', backgroundColor: WhiteColor, paddingVertical: width * 0.06, borderBottomColor: LightBlack, borderBottomWidth: 1, paddingHorizontal: width * 0.03, borderRadius: width * 0.02, marginVertical: width * 0.03, justifyContent: "space-between" }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Image
                      source={{ uri: item.doctor_pic }}
                      style={{ width: width * 0.2, height: width * 0.2, resizeMode: "contain" }}
                    />
                  </View>
                  <View style={{ marginLeft: width * 0.02, flexDirection: 'column', justifyContent: "space-between" }}>
                    <View>
                      <Text style={{ fontFamily: 'Fredoka-Medium', color: LightBlack, fontSize: getFontSize(13) }}>professional doctor</Text>
                      <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14), marginTop: width * 0.01 }}>{item.doctor_name}</Text>
                      <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(13), color: LightBlack }}>{item.doctor_specialist}</Text>
                    </View>
                    <View>
                      <AirbnbRating
                        // showRating
                        // type==
                        count={5}
                        isDisabled
                        showRating={false}
                        ratingContainerStyle={{paddingVertical: 10,left:-width*0.026}}
                        defaultRating={item.dr_rating}
                        size={width*0.04}
                        // readonly
                        // onFinishRating={item.dr_rating}
                        // ratingCount={5}
                        // imageSize={20}
                        // startingValue={0}
                        // // jumpValue={item.dr_rating}
                        // // style={{left}}
                        // // onStartRating={item.dr_rating}
                        // // jumpValue={item.dr_rating}
                        // // ={item.dr_rating}
                        // style={{ paddingVertical: 10,left:-width*0.024 }}
                      />
                      {/* <Rating showRating fractions="{1}"
                        imageSize={20}
                        startingValue={item.dr_rating} readonly={true} /> */}
                      {/* <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(13), color: LightBlack }}>{"Fees :- " + item.doctor_fees}</Text> */}
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={{backgroundColor:LightBlueColor,padding:width*0.02,alignSelf:'flex-end',borderRadius:width*0.02}}
                
                onPress={() => navigation.navigate('Drdetails', {
                  Ddata: item
                })}
                >
                  <Text style={{color:WhiteColor,fontFamily:'Fredoka-Medium'}}>Appointment</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity>
                  <Text>Book Now</Text>
                </TouchableOpacity> */}
                {/* <View>
                  <Image
                  source={require('../Assets/tap.png')}
                  style={{width:width*0.1,height:width*0.1,resizeMode:"contain"}}
                  />
                </View> */}
              </View>
            )
          }}
        />

      </View>
      {isLoading && <AppLoadingScreen />}
    </View>
  )
}

export default DoctorsScreen

const styles = StyleSheet.create({})