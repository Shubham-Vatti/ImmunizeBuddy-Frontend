import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlackColor, LightBlack, LightBlueColor, LightWhite, WhiteColor } from '../../Components/Colors'
import { getFontSize } from '../../Utils/UiComps'
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('window')

const Slide = [
  {
    id: 1,
    img: require('../../Assets/m1.jpg'),
    txt: 'Paractemol',
    price: '100'
  },
  {
    id: 2,
    img: require('../../Assets/m2.jpg'),
    txt: 'ZIFI CV 200',
    price: '200'
  },
  {
    id: 3,
    img: require('../../Assets/m3.jpg'),
    txt: 'Ascoril D Plus',
    price: '400'
  },
  {
    id: 4,
    img: require('../../Assets/m4.jpg'),
    txt: 'Paractemol Ip 400',
    price: '10'
  },
  {
    id: 5,
    img: require('../../Assets/m1.jpg'),
    txt: 'Jhandu Bam',
    price: '500'
  },
  {
    id: 6,
    img: require('../../Assets/m2.jpg'),
    txt: 'Zola Skaoemka',
    price: '140'
  },
  {
    id: 7,
    img: require('../../Assets/m3.jpg'),
    txt: 'Qwaaadr sokeqq',
    price: '70'
  },
]
const MedicineScreens = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height * 0.05, marginBottom: height * 0.02, paddingHorizontal: width * 0.04 }}>
        <TouchableOpacity style={{}}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="leftcircleo" size={24} color="black" />
          {/* <AntDesign name="left" size={24} color={BlackColor} /> */}
        </TouchableOpacity>
        <View style={{ paddingLeft: width * 0.04 }}>
          <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24), textAlign: 'center' }}>Medicine Store</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginVertical: height * 0.02 }}>
        <View style={{ backgroundColor: LightWhite, borderColor: BlackColor, borderWidth: 0.6, borderRadius: width * 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: width * 0.04, width: width * 0.94 }}>
          <TextInput placeholder='Search medicines ...' style={{ width: width * 0.7, fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(14) }} />
          <TouchableOpacity>
            <Text style={{ fontFamily: 'Fredoka-Medium', color: LightBlueColor, fontSize: getFontSize(14) }}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1,alignItems:'center' }}>
        <FlatList
          data={Slide}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity style={{ borderColor: LightWhite, borderWidth: 1, borderRadius: width * 0.02, margin: width * 0.04, padding: width * 0.03 }}
              onPress={()=>navigation.navigate('MedicineDetailsscreen')}
              >
                <Image source={item.img} style={{ width: width * 0.3,alignSelf:'center', backgroundColor: LightWhite, height: width * 0.3, resizeMode: 'contain' }} />
                <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14),width:width*0.3,marginTop:width*0.02 }}>{item.txt}</Text>
                <Text style={{ fontFamily: 'Fredoka-Regular', color: BlackColor, fontSize: getFontSize(14),marginTop:width*0.006 }}>{'₹ ' + item.price}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  )
}

export default MedicineScreens

const styles = StyleSheet.create({})