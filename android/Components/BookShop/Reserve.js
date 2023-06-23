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
import {FlatList} from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native'; 
export default function Reserve({route, navigation}) {
  const [un, setun] = useState();
  const [books, setbooks] = useState([]);



  function getdata() {
    const un = route.params;
    setun(un);

    const formData = new FormData();
    formData.append('username', un);

    fetch('http://192.168.43.146/API%20Sample/api/Customer/Requests', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        console.log('result for Details' +JSON.stringify(result));
        setbooks(result);
      })
      .catch(error => {
        console.error('Error From Server is ' + error);
      });
  }




  useFocusEffect(
    React.useCallback(() => {
      getdata(); // Call the getData function when the screen becomes active
    }, [])
  );

  return (
    <View>
      <FlatList
        data={books}
        // data={name}
        renderItem={itm => {
          return (
            <View>
              <Pressable
                style={style.btn}
                onPress={() => {
                  navigation.navigate('Reserve Details', {
                        id: itm.item.id,
                        title: itm.item.title,
                        type: itm.item.type,
                        author: itm.item.author,
                        price: itm.item.price,
                        condition: itm.item.condition,
                        isDonated: itm.item.isDonated,
                        description: itm.item.description,
                        code: itm.item.course_code,
                        seller: un,
                        buyer: itm.item.buyer,
                        bw:itm.item.bw1,
                        colored:itm.item.colored1,
                        original:itm.item.original1,
                        bill:itm.item.bill
                  });
                }}>
                {/* <Image style={style.img} source={itm.item.img}></Image> */}
                <Image
                  key={itm.id}
                  source={{
                    uri:
                      'http://192.168.43.146/API Sample/content/images/' +
                      itm.item.image,
                  }}
                  style={style.img}
                />
                <View style={{marginTop: 20}}>
                  <Text style={style.txt2}>{itm.item.title}</Text>

                  <Text style={style.txt2}>By {itm.item.author}</Text>
                  <Text style={style.txt2}>{itm.item.type}</Text>
                  {/* <Text style={style.txt2}>Rs. {itm.item.price}</Text> */}
                </View>
              </Pressable>
            </View>
          );
        }}></FlatList>
    </View>
  );
}
const style = StyleSheet.create({
  txt: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 10,
  },
  btn: {
    flexDirection: 'row',
    marginTop: 1,
    backgroundColor: '#D3D3D3',
    padding: -10,
  },
  trending: {
    width: 130,
    marginTop: 10,
    height: 150,
    backgroundColor: '#0f3e96',
    marginRight: 8,

    alignItems: 'center',
  },
  btn2: {
    width: 80,
    height: 70,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 5,
  },
  txt2: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0047AB',
    width: 350,
    marginLeft: 15,
  },
  searchInput: {
    fontSize: 15,
    color: 'white',
  },
  searchButton: {
    marginTop: 5,
  },
});
