import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from 'react-native';

export default function AccountSettings({route,navigation}) {

 const  {un,nameee,lname,passd}=route.params;
  const [username, setusername] = useState();
  const [password, setpassword] = useState();

  function navigate() {
  
    navigation.navigate('change Password',un);
  }

  return (
    <View>
      <Text
        style={{marginTop: 40, marginLeft: 10, color: 'black', fontSize: 15}}>
        {' '}
        Username{' '}
      </Text>

      <TextInput
        style={{
          borderColor: 'black',
          borderWidth: 0.6,
          marginLeft: 30,
          marginRight: 60,
          marginTop: 20,
          textAlign:'center'
        }}
        placeholder={nameee+"\t"+lname}
        placeholderTextColor={'black'}
        editable={false}></TextInput>

      <Text
        style={{marginTop: 40, marginLeft: 10, color: 'black', fontSize: 15}}>
        Arid-No{' '}
      </Text>

      <TextInput
        style={{
          borderColor: 'black',
          borderWidth: 0.6,
          marginLeft: 30,
          marginRight: 60,
          marginTop: 20,
          textAlign:'center'
        }}
        placeholder={un}
        placeholderTextColor={'black'}
        editable={false}></TextInput>

      <Text
        style={{marginTop: 40, marginLeft: 10, color: 'black', fontSize: 15,}}>
        Password
      </Text>

      <TextInput
        style={{
          borderColor: 'black',
          borderWidth: 0.6,
          marginLeft: 30,
          marginRight: 60,
          marginTop: 20,
          textAlign:'center'
        }}
        placeholder={passd}
        placeholderTextColor={'black'}
        editable={false}></TextInput>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 90,
          borderWidth: 0.7,
          borderColor: 'black',
          padding: 10,
        }}>
        <Pressable onPress={navigate}>
          <Text
            style={{
              fontSize: 17,
              color: 'black',
              marginTop: 5,
              marginLeft: 80,
            }}>
            Change Paswword
          </Text>
        </Pressable>
        <Image
          style={{width: 50, height: 40}}
          source={require('../../Assests/arrow.png')}></Image>
      </View>
    </View>
  );
}
