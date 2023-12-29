import { Button, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, LightBottomBlackColor, LightLightBlueColor, WhiteColor } from '../../Components/Colors'
import { BlueButton, BlueButtonLoadingUI, UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { Modal } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Base_Url } from '../../Utils/AppFeatures'
import { ContextProvider } from '../StateManagment/ContextState'

const RegisterChildScreen = ({ navigation }) => {
  const [ChildName, SetChildName] = useState('')
  // const [MotherName, SetMotherName] = useState('')
  const [Childweight, SetChildweight] = useState('')
  const [ChildBirthplace, SetChildBirthplace] = useState('')
  const [EmailId, SetEmailId] = useState('')
  const [isLoading, SetIsLoading] = useState(false)
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DobOfChild, SetDobOfChild] = useState()
  const [TOBOfChild, SetTOBOfChild] = useState()
  const [profilepicModal, setprofilepicModal] = useState(false)
  const [UserProfilePic, SetUserProfilePic] = useState('')
  const [Usergender, SetUsergender] = useState('')
  const { LoginID, SetLoginID } = useContext(ContextProvider)
  const { AuthToken, SetAuthToken } = useContext(ContextProvider)  //Authtoken UseContext

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    let TempDate = new Date(currentDate);
    // console.log(currentDate)
    let FTime = ((TempDate.getHours()) < 10 ? ('0' + TempDate.getHours()) : (TempDate.getHours())) + ':' + ((TempDate.getMinutes()) < 10 ? ('0' + TempDate.getMinutes()) : (TempDate.getMinutes()))
    let FDate = ((TempDate.getDate()) < 10 ? ('0' + TempDate.getDate()) : (TempDate.getDate())) + '-' + ((TempDate.getMonth() + 1) < 10 ? ('0' + (TempDate.getMonth() + 1)) : (TempDate.getMonth() + 1)) + '-' + TempDate.getFullYear()
    // console.log(FTime)
    SetTOBOfChild(FTime)
    SetDobOfChild(FDate)
  };


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
                SetUserProfilePic(imageUri)
                // console.log('Inside = ', imageUri);
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
      SetUserProfilePic(Result.assets[0])
      // SetImage1(Result.assets[0])
    })
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const UpdateUsersStatus=async()=>{
    try{
      var data=JSON.stringify({
        is_childregistered:true
      })
      await fetch(`${Base_Url}/Auth-User/Update-Oauth-Status/${LoginID}`,{
        method:"PATCH",
        body:data,
        headers:{"Content-Type":"application/json"}
      })
      .then((res)=>res.json())
      .then((result)=>{
        if(result.type=="sucessfully Data saved")
        {
          console.log(result)
          SetIsLoading(false)
          navigation.navigate('BottomNavigator')
          // navigation.navigate('RegisterChildScreen')
        }
        else{
          SetIsLoading(false)
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    catch(err)
    {
      console.log(err)
    }
  }

  const SubmitchildDetails = async () => {
    try {
      if (ChildName.trim()) {
        if (Usergender) {
          if (UserProfilePic) {
            if (DobOfChild) {
              if (TOBOfChild) {
                if (ChildBirthplace.trim()) {
                  if (Childweight.trim()) {
                    SetIsLoading(true)
                    var data = new FormData();
                    data.append("child_name", ChildName.trim())
                    data.append("child_DOB", DobOfChild)
                    data.append("child_TOB", TOBOfChild)
                    data.append("child_gender", Usergender)
                    data.append("child_weight", Childweight.trim())
                    data.append("birth_place", ChildBirthplace.trim())
                    data.append("child_profile_pic", {
                      uri: UserProfilePic.uri,
                      type: UserProfilePic.type,
                      name: UserProfilePic.fileName,
                      fileName: 'image'
                    })
                    await fetch(`${Base_Url}/Child-Api/Register`, {
                      method: "POST",
                      headers: { "Authorization": `Bearer ${AuthToken}` },
                      body:data
                    })
                    .then((res)=>res.json())
                    .then((result)=>{
                      if(result.type=="child registration successfully")
                      {
                        console.log(result)
                        UpdateUsersStatus()
                      }
                      else{
                        SetIsLoading(false)
                      }
                    })
                  }
                  else {
                    alert("Please enter your child weight")
                  }
                }
                else {
                  alert("Please enter your child birth place")
                }
              }
              else {
                alert("Please select your child Time of Birth")
              }
            }
            else {
              alert("Please select your child Date of Birth")
            }
          }
          else {
            alert("Please select your child profile")
          }
        }
        else {
          alert("Please select your child gender")
        }
      }
      else {
        alert("please enter your child name")
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  const HandleFunc = () => {
    try {
      SubmitchildDetails()
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
            <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24) }}>Register your Kid</Text>
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
            {/* <Image source={require('../../Assets/RegsiterKid.png')} style={{ resizeMode: 'contain', rmarginTop: width * 0.04, width: width * 0.6, height: width * 0.6, opacity: 0.9 }} /> */}
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
              <Text style={styles.TextinputTitle}>{'Child Name :-'}</Text>
              <View style={[styles.TectInputView, { marginVertical: width * 0.01 }]}>
                <AntDesign name="user" size={24} color={LightBlack} />
                <TextInput
                  placeholder='Sample Name'
                  value={ChildName}
                  onChangeText={(txt) => SetChildName(txt)}
                  placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                />
              </View>
            </View>
            <View style={{ marginTop: width * 0.02, flexDirection: 'row', width: width * 0.88, alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.TextinputTitle}>{'Child DOB :-'}</Text>
                <TouchableOpacity style={[styles.TectInputViewSplit, { marginVertical: width * 0.01 }]} onPress={showDatepicker}>
                  <AntDesign name="calendar" size={24} color={LightBlack} />
                  <TextInput
                    editable={false}
                    placeholder='Date of birth'
                    value={DobOfChild}
                    placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.TextinputTitle}>{'Child TOB :-'}</Text>
                <TouchableOpacity style={[styles.TectInputViewSplit, { marginVertical: width * 0.01 }]} onPress={showTimepicker}>
                  <AntDesign name="clockcircleo" size={24} color={LightBlack} />
                  <TextInput
                    editable={false}
                    value={TOBOfChild}
                    placeholder='Time of birth'
                    placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                timeZoneName='IN'
                // is24Hour={true}
                onChange={onChange}
              />
            )}
            <View style={{ marginTop: width * 0.02 }}>
              <Text style={styles.TextinputTitle}>{'Birth Place :-'}</Text>
              <View style={[styles.TectInputView, { marginVertical: width * 0.01 }]}>
                {/* <AntDesign name="user" size={24} color={LightBlack} /> */}
                <MaterialIcons name="place" size={24} color={LightBlack} />
                <TextInput
                  placeholder='Enter Child birth place'
                  value={ChildBirthplace}
                  // keyboardType='number-pad'
                  onChangeText={(txt) => SetChildBirthplace(txt)}
                  placeholderTextColor={LightBlack} style={styles.TextInputDesign}
                />
              </View>
            </View>
            <View style={{ marginTop: width * 0.02 }}>
              <Text style={styles.TextinputTitle}>{'Child Weight :-'}</Text>
              <View style={[styles.TectInputView, { marginVertical: width * 0.01 }]}>
                {/* <AntDesign name="user" size={24} color={LightBlack} /> */}
                <MaterialCommunityIcons name="weight-gram" size={24} color={LightBlack} />
                <TextInput
                  placeholder='Enter weight'
                  value={Childweight}
                  keyboardType='number-pad'
                  onChangeText={(txt) => SetChildweight(txt)}
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

export default RegisterChildScreen

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
  },
  TectInputViewSplit: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: LightBlack,
    borderWidth: 1,
    width: width * 0.42,
    paddingHorizontal: width * 0.04
  }
})