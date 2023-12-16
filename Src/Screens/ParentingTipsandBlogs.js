import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlackColor, WhiteColor } from '../Components/Colors'
import { AppLoadingScreen, LightBlueLine, ScreenLogoHeader, getFontSize } from '../Utils/UiComps'
import { Base_Url } from '../Utils/AppFeatures'
const { width, height } = Dimensions.get('window')

const ParentingTipsandBlogs = ({ navigation }) => {
    const [BlogsData, SetBlogsData] = useState([])
    const [isLoading,SetisLoading]=useState(false)

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
                    else{
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
        <View style={{ flex: 1, paddingHorizontal: width * 0.03, width, backgroundColor: WhiteColor }}>
            <View style={{ paddingVertical: height * 0.02 }}>
                <ScreenLogoHeader navigation={navigation} />
            </View>
            <LightBlueLine />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={BlogsData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <Pressable style={({pressed})=>[{ alignItems: 'center',backgroundColor:pressed?"rgba(0,0,0,0.06)":WhiteColor, marginVertical: width * 0.03, elevation: 1 }]}
                            onPress={()=>{navigation.navigate('ParentingData',{
                                parentingdata:item
                            })}}
                            >
                                <Image source={{ uri: item.blog_img }} style={{ width: width * 0.9, backgroundColor: "rgba(0,0,0,0.08)", height: width * 0.6, resizeMode: "contain" }} />
                                <View style={{ padding: width * 0.07 }}>
                                    <Text style={{ fontFamily: 'Fredoka-SemiBold', fontSize: getFontSize(16) }}>{item.blog_tittle}</Text>
                                    <Text style={{ fontFamily: 'Fredoka-Regular', fontSize: getFontSize(14) }}>{item.short_Description}</Text>
                                    <View style={{alignSelf:'flex-end'}}>
                                    <Image source={require('../Assets/read-more.png')} style={{width:width*0.12,height:width*0.12}}/>
                                    </View>
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

export default ParentingTipsandBlogs

const styles = StyleSheet.create({})