import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
export default function Changepass({route,navigation}) {

  const un = route.params;
  const [password, setpassword] = useState();
console.log(un)
function changepassword()
{
  const formData = new FormData();
  formData.append('arid_num',un);
  formData.append('password', password);
 

  fetch('http://192.168.43.146/API%20Sample/api/Customer/updatePassword', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
if(data=='Updated')
{
  Alert.alert("Success","Password Changed Successfully")
}
  }
    )
    .catch(error => {
      console.error('Error From Server ' + error);
    });
}

  return (
    <View>
      {/* <Text
        style={{marginTop: 40, marginLeft: 10, color: 'black', fontSize: 15}}>
        {' '}
        Enter New Password{' '}
      </Text> */}

      <TextInput
        style={{
          borderColor: 'black',
          borderWidth: 0.6,
          marginLeft: 60,
          marginRight: 60,
          marginTop: 100,
        }}
        placeholder="Enter Old Password  "
        placeholderTextColor={'black'}
        onChangeText={v => {
          setpassword(v);
        }}></TextInput>



<TextInput
        style={{
          borderColor: 'black',
          borderWidth: 0.6,
          marginLeft: 60,
          marginRight: 60,
          marginTop: 40,
        }}
        placeholder="Enter New Password "
        placeholderTextColor={'black'}
        onChangeText={v => {
          setpassword(v);
        }}></TextInput>


      <View style={{flexDirection: 'row', marginTop: 20, padding: 10}}>
        <Pressable
          onPress= {changepassword}>
          <Text
            style={{
              fontSize: 17,
              color: 'white',
              marginTop: 5,
              marginLeft: 80,
              backgroundColor: '#0047AB',
              padding: 10,
            }}>
            Update Paswword
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
