import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
export default function Messages({route, navigation}) {

const[data,setdata]=useState([])
const[namee,setnamee]=useState()
useFocusEffect(
  React.useCallback(() => {
    const { name, role } = route.params;
    setnamee(name)
    console.log('name is ' + name);
    console.log('role is ' + role);
    const formData = new FormData();
    formData.append('reciever', name);

    fetch('http://192.168.43.146/API%20Sample/api/Customer/getMessagesList', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data2 => {
        console.log(data2);
        setdata(data2);
      })
      .catch(error => {
        console.error('Error From Server ' + error);
      });

    return () => {
      // Clean up any necessary resources here
    };
  }, [])
);


  return (
    <View>
     <FlatList
        
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View >
          <Pressable style={style.btn} onPress={()=>{navigation.navigate('Chat',{buyer:namee,seller:item.regNo1});}}>
            <Text style={style.txt2}>{item.name}</Text>
            <Text style={style.txt2}>{item.regNo1}</Text>
            <Text style={style.txt3}>{item.lastMessage}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const style=StyleSheet.create({
  btn: {
 
    marginTop: 5,
    backgroundColor: '#D3D3D3',
    padding: 20,

 
  },
  txt2: {
    fontSize: 16,
    marginLeft: 10,
   
    padding: 6,
    fontWeight:"bold"
  },
  txt3: {
    fontSize: 16,
    marginLeft: 10,
   
    padding: 6,
  },
})