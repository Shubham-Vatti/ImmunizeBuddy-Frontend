import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlackColor, LightBlueColor, LightWhite, WhiteColor } from '../Components/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getFontSize } from '../Utils/UiComps'
const { width, height } = Dimensions.get('window')

const StoreScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor }}>
      <View>
        <View>
          <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, textAlign: 'center', marginTop: height * 0.05, fontSize: getFontSize(24) }}>ImmunizeBuddy Store</Text>
        </View>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: width * 0.026, justifyContent: 'space-between', backgroundColor: LightWhite, borderColor: BlackColor, borderWidth: 0.8, width: width * 0.9, borderRadius: width * 0.02 }}>
          <TextInput placeholder='Enter medicine name ...' style={{ fontFamily: 'Fredoka-Regular', width: width * 0.72 }} />
          <TouchableOpacity>
            <Text style={{ fontFamily: 'Fredoka-Medium', color: LightBlueColor, fontSize: getFontSize(14) }}>Search</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{ paddingHorizontal: width * 0.04, marginTop: width * 0.08 }}>
          <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(16), marginTop: width * 0.02 }}>Product Category!</Text>
          <View style={{ marginTop: width * 0.06 }} />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: width * 0.025 }}
          onPress={()=>navigation.navigate('Medicinescreen')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../Assets/medicine.png')} style={{ width: width * 0.08, resizeMode: 'contain', height: width * 0.08 }} />
              <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14), marginLeft: width * 0.02 }}>Medicine</Text>
            </View>
            <AntDesign name="right" size={width * 0.06} color={BlackColor} />
          </TouchableOpacity>
          <View style={{ width: width * 0.92, height: width * 0.001, backgroundColor: BlackColor }} />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: width * 0.025 }}
          onPress={()=>navigation.navigate('ProductsScreen')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../Assets/products.png')} style={{ width: width * 0.08, resizeMode: 'contain', height: width * 0.08 }} />
              <Text style={{ fontFamily: 'Fredoka-Medium', color: BlackColor, fontSize: getFontSize(14), marginLeft: width * 0.02 }}>Products</Text>
            </View>
            <AntDesign name="right" size={width * 0.06} color={BlackColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default StoreScreen

const styles = StyleSheet.create({})