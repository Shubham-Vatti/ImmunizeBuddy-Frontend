import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlackColor, LightBlueColor, WhiteColor } from '../Components/Colors'
import { AppLoadingScreen, LightBlueLine, ScreenLogoAndBackIcon, ScreenLogoHeader, ScreenWithoutDrawerHeader, getFontSize } from '../Utils/UiComps'
import { Base_Url } from '../Utils/AppFeatures'
const { width, height } = Dimensions.get('window')

const ParentingTipsandBlogs = ({ navigation }) => {
    const [BlogsData, SetBlogsData] = useState([])
    const [isLoading, SetisLoading] = useState(false)

    useEffect(() => {
        GetBlogs()
    }, []);

    const GetBlogs = async () => {
        try {
            SetisLoading(true)
            await fetch(`${Base_Url}/Blogs-Api/blogs-data`, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.status == 200) {
                        SetisLoading(false)
                        SetBlogsData(result.Blogs_Data)
                    }
                    else {
                        SetisLoading(false)
                    }
                    console.log(result)
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
        <View style={{ flex: 1, paddingHorizontal: width * 0.024, width, backgroundColor: WhiteColor }}>
            <View style={{ paddingVertical: height * 0.02 }}>
                {/* <ScreenLogoAndBackIcon navigation={navigation} />
                 */}
                 <ScreenWithoutDrawerHeader navigation={navigation}/>
            </View>
            <LightBlueLine />
            <View style={{ flex: 1 }}>
                <FlatList
                // pagingEnabled
                // onViewableItemsChanged={({viewableItems})=>console.log('--VIEWABLE ITEMS-- ',viewableItems.length)}
                    data={BlogsData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <Pressable style={({ pressed }) => [{ alignItems: 'center', backgroundColor: pressed ? "rgba(0,0,0,0.06)" : WhiteColor, marginVertical: width * 0.03, elevation: 1, flexDirection: 'row' }]}
                                onPress={() => {
                                    navigation.navigate('ParentingData', {
                                        parentingdata: item
                                    })
                                }}
                            >
                                <Image source={{ uri: item.blog_img }} style={{ width: width * 0.34, backgroundColor: "rgba(0,0,0,0.08)", height: width * 0.34, resizeMode: 'cover' }} />
                                <View style={{ padding: width * 0.07 }}>
                                    <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(14), width: width * 0.5 }}>{item.blog_tittle}</Text>
                                    <Text style={{ fontFamily: 'Fredoka-Regular', fontSize: getFontSize(12), width: width * 0.5 }}>{item.short_Description}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:width*0.01, justifyContent: 'flex-end', }}>
                                        <View>
                                        <View style={{ width: width * 0.022, borderRadius: 100, height: width * 0.022, backgroundColor: LightBlueColor }} />
                                        </View>
                                        <Text style={{ fontFamily: 'Fredoka-Regular', marginLeft: width * 0.01, fontSize: getFontSize(12), color: LightBlueColor }}>Read more</Text>
                                    </View>
                                    {/* <View style={{alignSelf:'flex-end'}}>
                                    <Image source={require('../Assets/read-more.png')} style={{width:width*0.12,height:width*0.12}}/>
                                    </View> */}
                                </View>
                            </Pressable>
                        )
                    }}
                />
            </View>
            {isLoading && <AppLoadingScreen />}
        </View>
    )
}

export default ParentingTipsandBlogs

const styles = StyleSheet.create({})