import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BlackColor, LightBlack, LightBlueColor, WhiteColor } from '../../Components/Colors'
import { BlueButton, BlueButtonLoadingUI, UIBgKidFoot, getFontSize } from '../../Utils/UiComps'
const { width, height } = Dimensions.get('window')
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const RegisterChildScreen = ({ navigation }) => {
  const [FatherName, SetFatherName] = useState('')
  const [MotherName, SetMotherName] = useState('')
  const [Adress, SetAddress] = useState('')
  const [MobileNumber, SetMobileNumber] = useState('')
  const [EmailId, SetEmailId] = useState('')
  const [isLoading, SetIsLoading] = useState(false)
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [DobOfChild, SetDobOfChild] = useState()
  const [TOBOfChild, SetTOBOfChild] = useState()

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    let TempDate = new Date(currentDate);
    // console.log(currentDate)
    let FTime=((TempDate.getHours())<10?('0'+TempDate.getHours()):(TempDate.getHours()))+':'+((TempDate.getMinutes())<10?('0'+TempDate.getMinutes()):(TempDate.getMinutes()))
    let FDate =((TempDate.getDate())<10?('0'+TempDate.getDate()):(TempDate.getDate()))+ '-' + ((TempDate.getMonth()+1)<10?('0'+(TempDate.getMonth()+1)):(TempDate.getMonth()+1)) +'-'+ TempDate.getFullYear() 
    // console.log(FTime)
    SetTOBOfChild(FTime)
    SetDobOfChild(FDate)
  };

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
  const HandleFunc = () => {
    try {
      navigation.navigate('RegisterChildScreen')
    }
    catch (Err) {
      console.log(Err)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: WhiteColor, }}>
      <View style={{ flex: 1,zIndex:2 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: 'center', marginTop: height * 0.05 }}>
            <Text style={{ fontFamily: 'Fredoka-SemiBold', color: LightBlueColor, fontSize: getFontSize(24) }}>Register your Kid</Text>
            <Image source={require('../../Assets/RegsiterKid.png')} style={{ resizeMode: 'contain', rmarginTop: width * 0.04, width: width * 0.6, height: width * 0.6, opacity: 0.9 }} />
          </View>
          <View style={{ alignItems: 'center', marginTop: width * 0.04 }}>
            <View style={{ marginTop: width * 0.02 }}>
              <Text style={styles.TextinputTitle}>{'Child Name :-'}</Text>
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
                <TouchableOpacity style={[styles.TectInputViewSplit, { marginVertical: width * 0.01 }]}  onPress={showTimepicker}>
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
              <Text style={styles.TextinputTitle}>{'Child Weight :-'}</Text>
              <View style={[styles.TectInputView, { marginVertical: width * 0.01 }]}>
                {/* <AntDesign name="user" size={24} color={LightBlack} /> */}
                <MaterialCommunityIcons name="weight-gram" size={24} color={LightBlack} />
                <TextInput
                  placeholder='Enter weight'
                  value={SetAddress}
                  keyboardType='number-pad'
                  onChangeText={(txt) => SetAddress(txt)}
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
      <UIBgKidFoot/>
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