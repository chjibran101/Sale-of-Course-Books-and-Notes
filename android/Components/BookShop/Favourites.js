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

export default function Favourites({route})
{
const [Favourites,setFavourites]=useState([])

const {un,rolee}=route.params;

function fetchlist(){
  console.log("Role is "+rolee)
    const formData=new FormData();
    formData.append("arid_num",un);
    if(rolee==="Student")
    {
    fetch('http://192.168.43.146/API%20Sample/api/Customer/fetchlist', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
        timeout: 300000,
      })
        .then(response => response.json())
        .then(data2 => {
          console.log(data2);
          setFavourites(data2);
          console.log('wishlist books are  are  ' + Favourites);
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
      }
      else{
        fetch('http://192.168.43.146/API%20Sample/api/Customer/fetchAdminList', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          timeout: 300000,
        })
          .then(response => response.json())
          .then(data2 => {
            console.log(data2);
            setFavourites(data2);
            console.log('wishlist books are  are  ' + JSON.stringify(Favourites));
          })
          .catch(error => {
            console.error('Error From Server is ' + error);
          });
      }
}

useEffect(()=>{
  console.log(un);
  fetchlist();
      

},[])

    return(

        <View>

            <FlatList
        data={Favourites}
        renderItem={({item}) => (
          <View style={styles.btn}>
            <Image
              source={{
                uri:
                  'http://192.168.43.146/API Sample/content/images/' +
                  item.image,
              }}
              style={styles.img}
            />
            <View style={{flex: 1, marginLeft: 20}}>
              <Text style={styles.txt}>{item.title}</Text>
              <Text style={styles.txt}>{item.price}</Text>
              <Text style={styles.txt}>{item.condition}</Text>
              <Text style={styles.txt}>{item.author}</Text>
            </View>
       
          </View>
        )}
      />
        </View>
    )
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#D3D3D3',
    padding: 1,
  },
  img: {width: 120, height: 120, borderRadius: 8, marginTop: 15},
  txt: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  dropdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContent: {
    backgroundColor: '#FFF',
    width: 300,
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 150,
    marginTop: 10,
  },
  closeButton: {
    padding: 10,

    borderRadius: 5,
  },
  buttonText: {
    color: '#0047AB',
    fontSize: 16,
  },
  sellButton: {
    marginRight: 4,
    backgroundColor: '#0047AB',
    padding: 10,
    
    marginTop: 30,
    marginRight: 10,
    marginLeft: 10,
    marginBottom:60
  },
  sellButtonText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});