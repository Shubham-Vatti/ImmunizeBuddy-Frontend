import { Dimensions, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, LightBottomBlackColor, LightLightBlueColor, WhiteColor } from '../../Components/Colors'
import { BlueButton, BlueButtonLoadingUI, UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { Modal } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { ContextProvider } from '../StateManagment/ContextState'
import { useFocusEffect } from '@react-navigation/native';
import { Base_Url } from '../../Utils/AppFeatures'
const RegisterUserScreen = ({ navigation, route }) => {
  const [FatherName, SetFatherName] = useState('')
  const [MotherName, SetMotherName] = useState('')
  const [Adress, SetAddress] = useState('')
  const [MobileNumber, SetMobileNumber] = useState('')
  const [EmailId, SetEmailId] = useState('')
  const [isLoading, SetIsLoading] = useState(false)
  const [profilepicModal, setprofilepicModal] = useState(false)
  const [UserProfilePic, SetUserProfilePic] = useState('')
  const [Usergender, SetUsergender] = useState('')
  const [apimodal, SetAPIModal] = useState(false)
  const { AuthToken, SetAuthToken } = useContext(ContextProvider)  //Authtoken UseContext
  const { emailId } = route.params;
  const [PicsData,SetPicsData]=useState('')

  // useFocusEffect(
  //   useCallback(() => {
  //     const GetUserprofile = async () => {
  //       await fetch(`${Base_Url}/Parents-Api/Get-data`, {
  //         method: "GET",
  //         headers: { "Authorization": `Bearer ${AuthToken}` }
  //       })
  //         .then((res) => res.json())
  //         .then((result) => {
  //           if (result.type == "Parens data not found") {
  //             SetAPIModal(true)
  //             SetFatherName(null)
  //             SetMotherName(null)
  //             SetAddress(null)
  //             SetMobileNumber(null)
  //             SetEmailId(null)
  //             SetUsergender(null)
  //             SetUserProfilePic(null)
  //           }
  //           else if(result.type=="successfully get parents data") {
  //             SetFatherName(result.parent_data.your_name)
  //             SetMotherName(result.parent_data.partner_name)
  //             SetAddress(result.parent_data.address)
  //             SetMobileNumber(result.parent_data.mobile_no + '')
  //             SetEmailId(result.parent_data.email_id)
  //             SetUsergender(result.parent_data.your_gender)
  //             SetUserProfilePic(result.parent_data.profile_pic)
  //             navigation.navigate('RegisterChildScreen')
  //           }
  //           console.log('--Result--', result.parent_data.mobile_no)
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //         })
  //     }
  //     GetUserprofile();
  //     return()=>{

  //       SetFatherName(null)
  //       SetMotherName(null)
  //       SetAddress(null)
  //       SetMobileNumber(null)
  //       SetEmailId(null)
  //       SetUsergender(null)
  //       SetUserProfilePic(null)
  //     }
  //   }, [])

  // )

  const UpdateUsersStatus = async () => {
    try {
      var data = JSON.stringify({
        is_parentregistered: true
      })
      await fetch(`${Base_Url}/Auth-User/Update-Oauth-Status/${emailId.user_data._id}`, {
        method: "PATCH",
        body: data,
        headers: { "Content-Type": "application/json" }
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.type == "sucessfully Data saved") {
            console.log(result)
            navigation.navigate('RegisterChildScreen')
          }
          else {
            SetIsLoading(false)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  const SubmitUserData = async () => {
    try {
      if (UserProfilePic) {
        if (Usergender) {
          if (FatherName.trim()) {
            if (MotherName.trim()) {
              if (Adress.trim()) {
                if (MobileNumber.trim()) {
                  if (emailId) {
                    SetIsLoading(true)
                    var data = new FormData();
                    data.append("your_gender", Usergender)
                    data.append("your_name", FatherName.trim());
                    data.append("partner_name", MotherName.trim())
                    data.append("address", Adress.trim())
                    data.append("mobile_no", MobileNumber)
                    data.append("email_id", emailId.user_data.email)
                    data.append("profile_pic",{
                      uri: UserProfilePic.uri,
                      type: UserProfilePic.type,
                      name: UserProfilePic.fileName,
                      fileName: 'image'})
                    console.log('--data--', data,'--',emailId.auth_token)
                    await fetch(`${Base_Url}/Parents-Api/Register`, {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${emailId.auth_token}`,
                        "Content-Type": "multipart/form-data",
                        "Accept":"*/*"
                      },
                      body:data
                    }).then((res) => res.json())
                      .then((result) => {
                        console.log(result)
                        if (result.type == "Parents data added successfully") {
                          UpdateUsersStatus()
                        }
                        else {
                          SetIsLoading(false)
                        }
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                  }
                  else {
                    alert("Please enter your email address")
                  }
                }
                else {
                  alert("Please enter your mobile number")
                }
              }
              else {
                alert("Please enter your address")
              }
            }
            else {
              alert("Please enter parents name (mother name)")
            }
          }
          else {
            alert("Please enter parents name (father name)")
          }
        }
        else {
          alert("Please select user gender")
        }
      }
      else {
        alert("Please select a user profile")
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  // useEffect(()=>{
  //   console.log('--authtoken--',AuthToken)
  // },[])
  let Options = {
    saveToPhotos: true,
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
    quality: 0.8,
  }
  const OpenCamera = async () => {
    check(PERMISSIONS.ANDROID.CAMERA)
      .then(async (result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            request(Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA, {
              title: "Ypp would like to take a picture of your product",
              message: "Ypp would like to take a picture of your product"
            }).then(async () => {
              setprofilepicModal(false)
              await launchCamera(Options, response => {
                if (response.didCancel) {
                  console.log('User cancelled camera');
                } else if (response.error) {
                  console.log('Camera Error: ', response.error);
                } else {
                  let imageUri = response.uri || response.assets?.[0];
                  //   SetImage1(imageUri)
                  SetPicsData(response)
                  SetUserProfilePic(imageUri)
                  // console.log('Inside = ', imageUri);
                }
              })
            })
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('granteed')
            setprofilepicModal(false)
            await launchCamera(Options, response => {
              if (response.didCancel) {
                console.log('User cancelled camera');
              } else if (response.error) {
                console.log('Camera Error: ', response.error);
              } else {
                let imageUri = response.uri || response.assets?.[0];
                // SetImage1(imageUri)
                  SetPicsData(response)
                SetUserProfilePic(imageUri)
                console.log('Inside = ', imageUri,'--',response);
              }
            })
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log('Inside Error--==', error)
      });
  }

  const OpenGallery = () => {
    request(Platform.OS == 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(async () => {
      setprofilepicModal(false)
      const Result = await launchImageLibrary(Options)
      // console.log(Result.assets[0], 'asdasdhaiosdhaioshdiosh')
      SetPicsData(Result)
      SetUserProfilePic(Result.assets[0])
      // SetImage1(Result.assets[0])
    })
  }

  const HandleFunc = () => {
    try {
      // navigation.navigate('RegisterChildScreen')
      SubmitUserData()
    }
    catch (Err) {
      console.log(Err)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor, }}>
      <Modal
        transparent={true}
        visible={profilepicModal}
        animationType="fade"
        onRequestClose={() => {
          setprofilepicModal(false)
        }}
      >
        <View style={{ flex: 1 }}>
          <Pressable style={{ flex: 1, backgroundColor: LightBlack }} onPress={() => setprofilepicModal(false)} />
          <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: WhiteColor, paddingVertical: width * 0.1, borderTopLeftRadius: width * 0.06, borderTopRightRadius: width * 0.06, position: "absolute", bottom: 0, width, paddingHorizontal: width * 0.18, justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => {
                OpenCamera()
              }}
            >
              <Image
                source={require('../../Assets/camera.png')}
                style={{ width: width * 0.09, height: width * 0.09, resizeMode: 'contain' }} />
              <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(13), color: BlackColor }}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}
              onPress={() => {
                OpenGallery()
              }}
            >
              <Image
                source={require('../../Assets/google-photos.png')}
                style={{ width: width * 0.09, height: width * 0.09, resizeMode: 'contain' }} />
              <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(13), color: BlackColor }}>Photos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ flex: 1, zIndex: 2 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: 'center', marginTop: height * 0.05 }}>
            <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24) }}>Register yourself</Text>
            {UserProfilePic ? <TouchableOpacity
              onPress={() => setprofilepicModal(true)}
              style={{ width: width * 0.44, height: width * 0.44, backgroundColor: LightLightBlueColor, borderColor: BlackColor, marginTop: width * 0.04, borderWidth: 1, alignItems: "center", justifyContent: 'center', borderRadius: 100 }}
            >
              <Image source={{ uri: UserProfilePic.uri }}
                style={{ width: width * 0.44, height: width * 0.44, borderRadius: 1000, resizeMode: 'contain', borderColor: BlackColor, borderWidth: 1, }}
              />
              {/* <AntDesign name="user" size={width * 0.18} color={LightBottomBlackColor} /> */}
              {/* <Image source={require('../../Assets/registerimg.png')} style={{ marginTop: width * 0.04, width: width * 0.6, height: width * 0.6, opacity: 0.9 }} /> */}
              <View style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}>
                <View style={{ width: width * 0.1, height: width * 0.1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: LightBlueColor }}>
                  <FontAwesome5 name="pen" size={width * 0.04} color={WhiteColor} />
                </View>
              </View>
            </TouchableOpacity> : <TouchableOpacity
              onPress={() => setprofilepicModal(true)}
              style={{ width: width * 0.44, height: width * 0.44, backgroundColor: LightLightBlueColor, borderColor: BlackColor, marginTop: width * 0.04, borderWidth: 1, alignItems: "center", justifyContent: 'center', borderRadius: 100 }}
            >
              <AntDesign name="user" size={width * 0.18} color={LightBottomBlackColor} />
              {/* <Image source={require('../../Assets/registerimg.png')} style={{ marginTop: width * 0.04, width: width * 0.6, height: width * 0.6, opacity: 0.9 }} /> */}
              <View style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}>
                <View style={{ width: width * 0.1, height: width * 0.1, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: LightBlueColor }}>
                  <FontAwesome5 name="pen" size={width * 0.04} color={WhiteColor} />
                </View>
              </View>
            </TouchableOpacity>}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: width * 0.06, marginTop: width * 0.06 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: width * 0.28, paddingHorizontal: width * 0.02, paddingVertical: width * 0.01, borderRadius: width * 0.02, backgroundColor: ((Usergender == "Male") || (Usergender == "male")) ? "rgba(0,0,0,0.2)" : WhiteColor, borderColor: BlackColor, borderWidth: 0.6 }}
              onPress={() => SetUsergender('Male')}
            >
              <Image source={require('../../Assets/male.png')} style={{ width: width * 0.1, height: width * 0.1, resizeMode: 'contain' }} />
              <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14) }}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: width * 0.28, paddingHorizontal: width * 0.02, paddingVertical: width * 0.01, borderRadius: width * 0.02, backgroundColor: ((Usergender == "Female") || (Usergender == "female")) ? "rgba(0,0,0,0.2)" : WhiteColor, borderColor: BlackColor, borderWidth: 0.6 }}
              onPress={() => SetUsergender('Female')}
            >
              <Image source={require('../../Assets/sign.png')} style={{ width: width * 0.1, height: width * 0.1, resizeMode: 'contain' }} />
              <Text style={{ color: BlackColor, fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14) }}>Female</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginTop: width * 0.04 }}>
            <View style={{ marginTop: width * 0.02 }}>
              <Text style={styles.TextinputTitle}>{'Parent Name (Father Name) :-'}</Text>
              <View style={[styles.TectInputView, { marginVertical: width * 0.01 }]}>
                <AntDesign name="user" size={24} color={LightBlack} />
                <TextInput
                  placeholder='Sample Name'
                  value={FatherName}
                  onChangeText={(txt) => SetFatherName(txt)}
                  placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                />
              </View>
            </View>
            <View style={{ marginTop: width * 0.02 }}>
              <Text style={styles.TextinputTitle}>{'Parent Name (Mother Name) :-'}</Text>
              <View style={[styles.TectInputView, { marginVertical: width * 0.01 }]}>
                <AntDesign name="user" size={24} color={LightBlack} />
                <TextInput
                  placeholder='Sample Name'
                  value={MotherName}
                  onChangeText={(txt) => SetMotherName(txt)}
                  placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                />
              </View>
            </View>
            <View style={{ marginTop: width * 0.02 }}>
              <Text style={styles.TextinputTitle}>{'Address :-'}</Text>
              <View style={[styles.TectInputView, { marginVertical: width * 0.01 }]}>
                {/* <AntDesign name="user" size={24} color={LightBlack} /> */}
                <Entypo name="location" size={24} color={LightBlack} />
                <TextInput
                  placeholder='Enter address'
                  value={Adress}
                  onChangeText={(txt) => SetAddress(txt)}
                  placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                />
              </View>
            </View>
            <View style={{ marginTop: width * 0.02 }}>
              <Text style={styles.TextinputTitle}>{'Mobile Number :-'}</Text>
              <View style={[styles.TectInputView, { marginVertical: width * 0.01 }]}>
                <Ionicons name="call-outline" size={24} color={LightBlack} />
                <TextInput
                  keyboardType='number-pad'
                  placeholder='9xxxxxxxxx'
                  value={MobileNumber}
                  maxLength={10}
                  onChangeText={(txt) => SetMobileNumber(txt)}
                  placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                />
              </View>
            </View>
            <View style={{ marginTop: width * 0.02 }}>
              <Text style={styles.TextinputTitle}>{'Email Id :-'}</Text>
              <View style={[styles.TectInputView, { marginVertical: width * 0.01 }]}>
                {/* <AntDesign name="user" size={24} color={LightBlack} />
                             */}
                <Entypo name="email" size={24} color={LightBlack} />
                <TextInput
                  placeholder='Sample@gmail.com'
                  value={emailId.user_data.email}
                  editable={false}
                  // onChangeText={(txt) => SetEmailId(txt)}
                  keyboardType='email-address'
                  placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                />
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            {isLoading ? <BlueButtonLoadingUI txt={'Please wait'} /> : <BlueButton txt={'Next'} HandleFunc={HandleFunc} />}
          </View>
        </ScrollView>
      </View>
      <UIBgKidFoot />
    </View>
  )
}

export default RegisterUserScreen

const styles = StyleSheet.create({
  TextinputTitle: { color: BlackColor, fontFamily: 'Fredoka-Regular', fontSize: getFontSize(14.2) },
  TextInputDesign: {
    fontSize: getFontSize(14),
    fontFamily: 'Fredoka-Regular',
    width: width * 0.74,
    paddingHorizontal: width * 0.02
  },
  TectInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: LightBlack,
    borderWidth: 1,
    width: width * 0.88,
    paddingHorizontal: width * 0.04
  }
})