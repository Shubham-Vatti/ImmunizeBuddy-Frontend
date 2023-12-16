import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, WhiteColor } from '../Components/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { UIBgKidFoot, getFontSize } from '../Utils/UiComps'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { Modal } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Base_Url } from '../../Utils/AppFeatures'

const HomeScreen2 = ({ navigation, route }) => {
    const [profilepicModal, setprofilepicModal] = useState(false)
    const [UserProfilePic, SetUserProfilePic] = useState('')
    const { vaccinedata } = route.params;
    console.log(vaccinedata)


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
    return (
        <View style={{ flex: 1, backgroundColor: WhiteColor, paddingHorizontal: width * 0.04 }}>
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
                                alert("ss")
                                // OpenCamera()
                            }}
                        >
                            <Image
                                source={require('../Assets/camera.png')}
                                style={{ width: width * 0.09, height: width * 0.09, resizeMode: 'contain' }} />
                            <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(13), color: BlackColor }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => {
                                OpenGallery()
                            }}
                        >
                            <Image
                                source={require('../Assets/google-photos.png')}
                                style={{ width: width * 0.09, height: width * 0.09, resizeMode: 'contain' }} />
                            <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(13), color: BlackColor }}>Photos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.05, }}>
                <TouchableOpacity style={{ zIndex: 3 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="leftcircleo" size={24} color="black" />
                    {/* <AntDesign name="left" size={24} color={BlackColor} /> */}
                </TouchableOpacity>
                <View style={{ paddingLeft: width * 0.04 }}>
                    <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign: 'center' }}>Upload Doc's</Text>
                </View>
            </View>
            <View>
                <Text style={{ marginTop: width * 0.06, fontFamily: 'Fredoka-SemiBold', fontSize: 18 }}>Upload Your baby vaccination recipt : -</Text>
            </View>
            <Text style={{ fontFamily: 'Fredoka-Medium', fontSize: getFontSize(14), marginTop: width * 0.02 }}>{vaccinedata.Vaccine_name}</Text>
            <TouchableOpacity style={{ backgroundColor: LightBlueColor, width: width * 0.4, paddingVertical: width * 0.02, borderRadius: 100, flexDirection: "row", height: width * 0.4, justifyContent: "center", alignSelf: 'center', marginTop: width * 0.2, alignItems: "center" }}
                onPress={() =>OpenCamera()}
            >
                <Image source={require('../Assets/camera.png')} style={{ width: width * 0.06, height: width * 0.06, resizeMode: 'contain' }} />
                <Text style={{ fontFamily: 'Fredoka-Medium', color: WhiteColor, fontSize: getFontSize(14), marginLeft: width * 0.01 }}>Upload</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen2

const styles = StyleSheet.create({})