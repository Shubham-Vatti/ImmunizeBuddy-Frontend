import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, WhiteColor } from '../../Components/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AppLoadingScreen, UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
import { Base_Url } from '../../Utils/AppFeatures'
import { ContextProvider } from '../StateManagment/ContextState'

const UserProfileScreen = ({ navigation }) => {
  const { AuthToken, SetAuthToken } = useContext(ContextProvider)  //Authtoken UseContext
  const [parentdata, Setparentdata] = useState()
  const [Childdata, SetChilddata] = useState()
  const [isLoading, SetisLoading] = useState(false)
  const [Profilemodal, SetProfilemodal] = useState('me')
  useEffect(() => {
    getUserProfile()
  }, [])


  const getchildprofile = async () => {
    try {
      await fetch(`${Base_Url}/Child-Api/get-child-details`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${AuthToken}` }
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.type == "successfully get child data") {
            SetChilddata(result.child_data)
            SetisLoading(false)
            // getchildprofile()
          } else {
            SetisLoading(false)
          }
        })
        .catch((err) => {
          SetisLoading(false)
          console.log(err)
        })

    }
    catch (err) {
      console.log(err)
    }
  }

  const getUserProfile = async () => {
    try {
      SetisLoading(true)
      await fetch(`${Base_Url}/Parents-Api/Get-data`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${AuthToken}` }
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.type == "successfully get parents data") {
            Setparentdata(result.parent_data)
            getchildprofile()
          }
          console.log(result, AuthToken)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.024, paddingHorizontal: width * 0.04 }}>
        <TouchableOpacity style={{ zIndex: 3 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="leftcircleo" size={24} color="black" />
          {/* <AntDesign name="left" size={24} color={BlackColor} /> */}
        </TouchableOpacity>
        <View style={{ paddingLeft: width * 0.04 }}>
          <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign: 'center' }}>User Profile</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {(parentdata && Childdata) && <View style={{ marginTop: width * 0.04, paddingHorizontal: width * 0.04 }}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <TouchableOpacity style={{ alignItems: "center" }} onPress={() => SetProfilemodal("me")}>
                <Image source={{ uri: parentdata.profile_pic }} style={{ backgroundColor: LightBlack, borderColor:Profilemodal == "me"?LightBlueColor:BlackColor, borderWidth: 1, width: width * 0.16, height: width * 0.16, borderRadius: 100, resizeMode: 'cover' }} />
                <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Regular', marginTop: width * 0.01, borderBottomColor: Profilemodal == "me" ? BlackColor : WhiteColor, borderBottomWidth: 1 }}>Me</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center", marginLeft: width * 0.03 }} onPress={() => SetProfilemodal("child")}>
                <Image source={{ uri: Childdata.child_profile_pic }} style={{ backgroundColor: LightBlack, width: width * 0.16, height: width * 0.16, borderRadius: 100, resizeMode: 'cover', borderColor: Profilemodal == "child"?LightBlueColor:BlackColor, borderWidth: 1 }} />
                <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Regular', marginTop: width * 0.01, borderBottomColor: Profilemodal == "child" ? BlackColor : WhiteColor, borderBottomWidth: 1 }}>Child</Text>
              </TouchableOpacity>
            </View>

            {Profilemodal == "me" ? <View>
              {/* <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(18), marginTop: width * 0.04 }}>User Profile :-</Text> */}
              <View style={{ alignItems: 'center', marginTop: width * 0.04 }}>
                <Image
                  source={{ uri: parentdata.profile_pic }} style={{ backgroundColor: LightBlack, width, height: width * 0.7, resizeMode: 'cover'}} />
              </View>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>User Name :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{parentdata.your_name}</Text></Text>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>User Gender :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{parentdata.your_gender}</Text></Text>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>Parnter Name :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{parentdata.partner_name}</Text></Text>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>Email Id :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{parentdata.email_id}</Text></Text>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>User Gender :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{parentdata.mobile_no}</Text></Text>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>Address :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{parentdata.address}</Text></Text>
            </View> : <View style={{  }}>
              {/* <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(18) }}>Child Profile :-</Text> */}
              <View style={{ alignItems: 'center', marginTop: width * 0.04 }}>
                <Image
                  source={{ uri: Childdata.child_profile_pic }} style={{  backgroundColor: LightBlack, width, height: width * 0.7, resizeMode: 'cover' }} />
              </View>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>Child Name :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{Childdata.child_name}</Text></Text>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>Child DOB :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{Childdata.child_DOB}</Text></Text>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>Child TOB :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{Childdata.child_TOB}</Text></Text>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>Birth Place :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{Childdata.birth_place}</Text></Text>
              <Text style={{ color: BlackColor, fontFamily: "Fredoka-Regular", marginVertical: width * 0.01 }}>Child Weight :- <Text style={{ color: BlackColor, fontFamily: "Fredoka-Medium" }}>{Childdata.child_weight}</Text></Text>
            </View>}
          </View>}
        </ScrollView>
      </View>
      {isLoading && <AppLoadingScreen />}
    </View>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({})