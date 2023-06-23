import React, {useState} from 'react';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, Image, Pressable, Alert} from 'react-native';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import {useEffect} from 'react';
export default function App({navigation, route}) {
  const [images, setimages] = useState([]);
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
    original
  } = route.params;

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
console.log(balance)
    function getimages() {
      console.log('id is ' + id);

      const formData = new FormData();
      formData.append('bid', id);

      fetch('http://192.168.43.146/API%20Sample/api/Customer/getImages', {
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
          // const d=JSON.stringify(data2)
          setimages(data2);
          // console.log('data is '+ JSON.stringify( images));
          // console.log(images)
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    }

    getimages();
  }, []);

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(prevState => !prevState);
  };

  function saveRecordToDatabase() {
    const formData = new FormData();
    formData.append('Bid', id);
    console.log(id);
    formData.append('Buyer', buyer);
    formData.append('Seller', seller);
    formData.append('Book', 1);
    formData.append('bw', null);
    formData.append('colored', null);

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
  function alert() {
    if(type==="Notes")
    {

      navigation.navigate("selecttype",{  
          id: id,
        title: title,
        type: type,
        author: author,
        price: price,
        condition: condition,
        isDonated: isDonated,
        description: description,
        code: code,
        buyer: buyer,
        seller: seller,
        balance: balance,
        id1: id1,
        bw:bw,
        colored:colored,
        original:original})

    }
    else{
    Alert.alert('Confirm', 'Are you sure you want to reserve this Book?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          saveRecordToDatabase(); // replace with your database function
    },
      },
    
    ]);
  }
  }
  return (
    <ScrollView>
      <View>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            showsHorizontalScrollIndicator={true}
            horizontal={true}
            style={{flexDirection: 'row'}}
            data={images}
            renderItem={itm => {
              return (
                <View>
                  <Image
                    key={itm.id}
                    source={{
                      uri:
                        'http://192.168.43.146/API Sample/content/images/' +
                        itm.item.image,
                    }}
                    style={style.img}
                  />
                </View>
              );
            }}></FlatList>
        </View>

        <View>
          <ScrollView>
          {bw>0 &&(
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
            Black and white Notes Rs.{'\t' + bw }{' '}
            </Text>
          )}
          {colored>0 &&(
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
            Colored Notes Rs.{'\t' + colored }{' '}
            </Text>
          )}
          {original>0 &&(
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
            Original Notes Rs.{'\t' + original }{' '}
            </Text>
          )}
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
              {'\t' + title}{' '}
            </Text>
            {/* <Pressable onPress={handlePress} style={{marginLeft:350}}>
              <Icon
                name={id1!==null ? 'heart' : 'heart-o'}
                size={24}
                color={id1!==null ? 'red' : 'black'}
                style={style.heartIcon}
              />
            </Pressable> */}

            <View
              style={{
                backgroundColor: 'lightgrey',
                marginTop: 10,

                padding: 4,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>
                Details
              </Text>
              <Text style={style.Text}>By : {'\t\t\t\t\t\t\t\t' + author}</Text>
              <Text style={style.Text}>Course : {code}</Text>
              <Text style={style.Text}>Condtion: {'\t\t' + condition}</Text>
              <Text style={style.Text}>Type: {'\t\t\t\t\t\t' + type}</Text>
            </View>

            {/* <Text
              style={{
                borderBottomColor: 'grey',
                borderWidth: 0.2,
                padding: 10,
              }}>
              For Donation: {'\t\t\t\t' + isDonated}
            </Text> */}
            <Text
              style={{
                color: 'black',
                marginTop: 10,
                fontSize: 16,
                marginLeft: 2,
              }}>
              Description
            </Text>
            <Text>{'\t\t\t\t' + description}</Text>
            <TextInput style={style.Text}></TextInput>
          </ScrollView>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          onPress={() => {
            navigation.navigate('Chat', {buyer: buyer, seller: seller});
          }}
          style={{
            marginLeft: 50,
            backgroundColor: '#0047AB',
            padding: 10,
            borderRadius: 3,
          }}>
          <Text
            style={{
              color: 'white',
              marginRight: 30,
              marginLeft: 30,
              fontWeight: 'bold',
            }}>
            Chat
          </Text>
        </Pressable>
        <Pressable
          onPress={alert}
          style={{
            marginLeft: 70,
            backgroundColor: '#0047AB',
            padding: 10,
            borderRadius: 3,
          }}>
          <Text
            style={{
              color: 'white',
              marginRight: 10,
              marginLeft: 10,
              fontWeight: 'bold',
            }}>
            Reserve
          </Text>
        </Pressable>
      </View>
      {/* <View
              style={{
                marginTop: 190,
                backgroundColor: '#0A2647',
                flexDirection: 'row',
                paddingTop: 0,
                paddingBottom: 20,
              }}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Chat');
                }}
                style={style.btn}>
                <Text style={style.btntxt}>Chat Seller </Text>
              </Pressable>
              <Pressable onPress={alert} style={style.reserve}>
                <Text style={style.btntxt}>Reserve Book</Text>
              </Pressable>
            </View> */}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  img: {
    width: 400,
    height: 200,
    marginRight: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  Text: {fontSize: 15, marginTop: 15, marginRight: 10, marginLeft: 10},
  btntxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',

    textAlign: 'center',

    borderColor: '#0A2647',
  },
  btn: {
    textAlign: 'center',

    borderWidth: 0.9,
    padding: 5,

    marginRight: 70,
    marginLeft: 20,
    borderColor: 'white',
    marginTop: 7,
  },
  reserve: {
    textAlign: 'center',

    marginTop: 7,
    borderColor: 'white',
    borderWidth: 0.9,
    padding: 5,
    marginLeft: 20,
  },
});
