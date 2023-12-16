import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlackColor, LightBlack, WhiteColor } from '../Components/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AppLoadingScreen, LightBlueLine, ScreenLogoHeader, getFontSize } from '../Utils/UiComps'
import { Base_Url } from '../Utils/AppFeatures'
const { width, height } = Dimensions.get('window')

const DoctorsScreen = ({ navigation }) => {
  const [Doctordata, SetDoctordata] = useState([])
  const [isLoading,SetisLoading]=useState(false)
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
          console.log(result)
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
        <ScreenLogoHeader navigation={navigation} />
      </View>
      <LightBlueLine />
      <View style={{ flex: 1 }}>
        <FlatList
          data={Doctordata}
          renderItem={({ item }) => {
            return (
              <Pressable style={({ pressed }) => [{ flexDirection: 'row', backgroundColor: pressed ? "rgba(0,0,0,0.06)" : WhiteColor, paddingVertical: width * 0.06, borderBottomColor: LightBlack, borderBottomWidth: 1, paddingHorizontal: width * 0.03, borderRadius: width * 0.02, marginVertical: width * 0.03,justifyContent:"space-between" }]}
              onPress={()=>navigation.navigate('Drdetails',{
                Ddata:item
              })}
              >
                <View style={{flexDirection:'row'}}>
                <View>
                  <Image
                    source={{ uri: item.doctor_pic }}
                    style={{ width: width * 0.2, height: width * 0.2, resizeMode: "contain" }}
                  />
                </View>
                <View style={{ marginLeft: width * 0.02, flexDirection: 'column', justifyContent: "space-between" }}>
                  <View>
                    <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14) }}>{item.doctor_name}</Text>
                    <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(13), color: LightBlack }}>{item.doctor_specialist}</Text>
                  </View>
                  <View>
                    <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(13), color: LightBlack }}>{"Fees :- " + item.doctor_fees}</Text>
                  </View>
                </View>
                </View>
                {/* <TouchableOpacity>
                  <Text>Book Now</Text>
                </TouchableOpacity> */}
                <View>
                  <Image
                  source={require('../Assets/tap.png')}
                  style={{width:width*0.1,height:width*0.1,resizeMode:"contain"}}
                  />
                </View>
              </Pressable>
            )
          }}
        />

      </View>
      {isLoading&&<AppLoadingScreen/>}
    </View>
  )
}

export default DoctorsScreen

const styles = StyleSheet.create({})