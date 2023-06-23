import React, {useState} from 'react';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, Image, Pressable, Alert} from 'react-native';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
export default function App({navigation, route}) {
  const [images, setimages] = useState([]);

  const [bww, setbww] = useState(false);
  const [bwquant, setbwquant] = useState(0);

  const [coloredd, setcoloredd] = useState(false);
  const [coloredquant, setcoloredquant] = useState(0);

  const [org, setorg] = useState(false);
  const [orgquant, setorgquant] = useState(0);

//   const [bill, setbill] = useState([]);
//   const [bill2, setbill2] = useState(0);

let bill1=0
let bill2=0
let bill3=0

  const {
    id,
    title,
    type,
    author,
    price,
    condition,
    isDonated,
    description,
    code,
    buyer,
    seller,
    balance,
    id1,
    bw,
    colored,
    original,
  } = route.params;

  function saveRecordToDatabase(bil) {
    const formData = new FormData();
    formData.append('Bid', id);
    console.log(id);
    formData.append('Buyer', buyer);
    formData.append('Seller', seller);
    formData.append('Book', null);
    formData.append('bw', bwquant);
    formData.append('colored', coloredquant);
    formData.append('org', orgquant);
    formData.append('Bill', bil);

    fetch('http://192.168.43.146/API%20Sample/api/Customer/ReserveBook', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data2 => {
        if (data2 == 'Already') {
          Alert.alert('Reserved', 'Book reserved Already');
        } else if (data2 == 'Reservation Request Sent') {
          Alert.alert('Success', 'Book reserved');
        }
      })
      .catch(error => {
        console.error('Error From Server is ' + error);
      });
  }

  function Reserve() {
    if (bw > 0 && bwquant > 0) {
     bill1= parseInt(bw) * parseInt(bwquant);
      console.log("Bw Bill Is "+bill1)
    }
    if (colored > 0 && coloredquant > 0) {
     bill2 = parseInt( colored) * parseInt(coloredquant);
      console.log("Colored Bill Is "+bill2)
     
    }
    if (original > 0 && orgquant > 0) {
      bill3 = parseInt( original) * parseInt(orgquant);
    //   bill.push(bill3);

    }

 const Totalbill=parseInt(bill1)+parseInt(bill2)+parseInt(bill3)
 console.log("Total Bill IS "+Totalbill)

    if (balance >= Totalbill) {
   
    //   Alert.alert("Bill is", Totalbill);
      saveRecordToDatabase(Totalbill);
    } else {
      Alert.alert('Insufficient balance');
    }
  }

  return (
    <View style={{marginTop: 20, marginLeft: 20}}>
      {/* <Text>Han jee {bw + '' + colored + '' + original} </Text> */}
      {bw > 0 && (
        <View>
          <Text>Black and white Notes</Text>
          <CheckBox
            style={{marginTop: 20}}
            value={bww}
            onValueChange={() => {
              setbww(!bww);
            }}
          />
        </View>
      )}
      {colored > 0 && (
        <View>
          <Text style={{marginTop: 20}}>Colored Notes</Text>
          <CheckBox
            style={{marginTop: 20}}
            value={coloredd}
            onValueChange={() => {
              setcoloredd(!coloredd);
            }}
          />
        </View>
      )}
      {original > 0 && (
        <View>
          <Text>Original Notes</Text>
          <CheckBox
            value={org}
            onValueChange={() => {
              setorg(!org);
              setorgquant(1)
            }}
          />
        </View>
      )}

      {bww === true && (
        <TextInput
          style={style.tcode}
          onChangeText={v => setbwquant(v)}></TextInput>
      )}
      {coloredd === true && (
        <TextInput
          style={style.tcode2}
          onChangeText={v => setcoloredquant(v)}></TextInput>
      )}
      {/* {org === true && (
        <TextInput
          style={style.tcode3}
          onChangeText={v => setorgquant(v)}></TextInput>
      )} */}
      <View>
        <Pressable onPress={Reserve} style={style.btn}>
          <Text style={style.btntxt}>Reserve</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  tcode: {
    backgroundColor: 'lightgrey',
  },
  tcode2: {
    backgroundColor: 'lightgrey',
    marginTop: 20,
  },
  tcode3: {
    backgroundColor: 'lightgrey',
    marginTop: 20,
  },
  btntxt: {
    fontSize: 15,

    color: 'white',

    textAlign: 'center',

    borderColor: '#0A2647',
  },
  btn: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 4,
    marginTop: 60,
    marginLeft: 120,
    marginRight: 120,
    marginBottom: 100,
    backgroundColor: '#0047AB',
  },
});
