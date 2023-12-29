


// const OpenGallery = () => {
//     request(Platform.OS == 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(async () => {
//         setprofilepicModal(false)
//         const Result = await launchImageLibrary(Options)
//         // console.log(Result.assets[0], 'asdasdhaiosdhaioshdiosh')
//         SetUserProfilePic(Result.assets[0])
//         // SetImage1(Result.assets[0])
//     })
// }


// const UpdateVaccineData=async()=>{
//     try{
//         var data=new FormData();
//         data.append('"pic',{
//             uri: UserProfilePic.uri,
//             type: UserProfilePic.type,
//             name: UserProfilePic.fileName,
//             fileName: 'image'
//           })
//           await fetch(`${Base_Url}/Approval-Reject/Update-Aprroval-rejection-data/?uid=${vaccinedata._id}&id=${LoginID}`,{
//             method:"POST",
//             headers: { "Authorization": `Bearer ${AuthToken}` },
//           })
//           .then((res)=>res.json())
//           .then((result)=>{
//             navigation.goBack()
//           })
//           .catch((err)=>{ 
//             console.log(err)
//           })
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// }

import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { BlackColor, LightBlueColor, LightBottomBlackColor, LightLightBlueColor, WhiteColor } from '../Components/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AppLoadingScreen, UIBgKidFoot, getFontSize } from '../Utils/UiComps'
import { PERMISSIONS, RESULTS, check, request} from 'react-native-permissions'
import { launchCamera } from 'react-native-image-picker'
import { Base_Url } from '../Utils/AppFeatures'
import { ContextProvider } from './StateManagment/ContextState'

const HomeScreen2 = ({ navigation, route }) => {
    const { vaccinedata } = route.params;
    console.log(vaccinedata)
    const [UserProfilePic,SetUserProfilePic]=useState('')
    const { AuthToken, SetAuthToken } = useContext(ContextProvider)  //Authtoken UseContext
    const { LoginID, SetLoginID } = useContext(ContextProvider)
    const { UserEmailID, SEtUserEmailID } = useContext(ContextProvider)
    const [isLoading,SetisLoading]=useState(false)

    const UserUploadData=async()=>{
        try{SetisLoading(true)
            var data=new FormData()
            data.append("pic",{
                uri: UserProfilePic.uri,
                type: UserProfilePic.type,
                name: UserProfilePic.fileName,
                fileName: 'image'})
            await fetch(`${Base_Url}/Approval-Reject/Update-Aprroval-rejection-data/?uid=${LoginID}&id=${vaccinedata._id}`,{
                method:"POST",
                body:data,
                headers:{
                    "Authorization": `Bearer ${AuthToken}`,
                    "Content-Type": "multipart/form-data",
                    "Accept":"*/*"}
            })
            .then((res)=>res.json())
            .then((result)=>{
                SetisLoading(false)
                navigation.goBack()
                console.log(result)
            })
            .catch((err)=>{
                SetisLoading(false)
                console.log(err)
            })
        }
        catch(err)
        {
            SetisLoading(false)
            console.log(err)
        }
    }
    let Options = {
        saveToPhotos: true,
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.8,
    }
    const OpenCamera = async () => {
        // alert('aaa')
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
                            // setprofilepicModal(false)
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
                        // setprofilepicModal(false)
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
    return (
        <View style={{ flex: 1, backgroundColor: WhiteColor }}>
            <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: height * 0.03, zIndex: 2, paddingHorizontal: width * 0.04 }}>
                <TouchableOpacity style={{ zIndex: 3 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="leftcircleo" size={24} color="black" />
                    {/* <AntDesign name="left" size={24} color={BlackColor} /> */}
                </TouchableOpacity>
                <View style={{ paddingLeft: width * 0.04 }}>
                    <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(22), textAlign: 'center' }}>Upload Image</Text>
                </View>
            </View>
            <View style={{alignItems:"center"}}>
                <Text style={{fontFamily:"Fredoka-Medium",fontSize:getFontSize(14)}}>Upload Baby Vaccine Certificate :- </Text>
                <TouchableOpacity style={{width:width*0.88,height:width*0.6,backgroundColor:LightLightBlueColor,borderRadius:width*0.02,borderWidth:1,borderColor:LightBlueColor,borderStyle:"dashed",alignItems:"center",justifyContent:"center",marginTop:width*0.02}}
                onPress={()=>OpenCamera()}
                >
                    {UserProfilePic?<Image source={{uri:UserProfilePic.uri}} style={{resizeMode:"cover",width:width*0.88,height:width*0.6,borderRadius:width*0.02}}/>:<Text style={{fontFamily:"Fredoka-Medium",color:LightBlueColor}}>Upload Image</Text>}
                </TouchableOpacity>
            </View>
            <View style={{alignItems:"center",marginTop:width*0.04,paddingHorizontal:width*0.036}}>
                <Text style={{fontFamily:"Fredoka-Regular",fontSize:getFontSize(14),color:BlackColor}}>Vaccine Name :- <Text style={{fontFamily:"Fredoka-Medium"}}>{vaccinedata.Vaccine_name}</Text></Text>
            </View>
            <View style={{alignItems:"center",marginTop:width*0.04,paddingHorizontal:width*0.04}}>
                <Text style={{fontFamily:"Fredoka-Regular",fontSize:getFontSize(14),color:BlackColor}}>Vaccine Details :- <Text style={{fontFamily:"Fredoka-Medium"}}>{vaccinedata.Vaccine_Details}</Text></Text>
            </View>
            <TouchableOpacity style={{backgroundColor:LightBlueColor,paddingVertical:width*0.04,width:width*0.8,borderRadius:width*0.02,elevation:4,alignItems:"center",marginTop:width*0.04,alignSelf:"center",marginBottom:width*0.04}}
            onPress={()=>{
                if(UserProfilePic)
                {
                    UserUploadData()
                }
                else{
                    alert("Upload vaccine Certificate")
                }
            }}
            >
                <Text style={{fontFamily:'Fredoka-Medium',textAlign:"center",fontSize:getFontSize(14),color:WhiteColor}}>Upload Certificate</Text>
            </TouchableOpacity>
            </ScrollView>
            {isLoading&&<AppLoadingScreen/>}
        </View>
    )
}

export default HomeScreen2

const styles = StyleSheet.create({})