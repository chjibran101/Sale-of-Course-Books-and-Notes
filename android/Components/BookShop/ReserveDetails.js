import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  ScrollView,
  TextInput,
  StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function ReDetails({ navigation, route }) {
  const [images, setImages] = useState([]);
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
    bw,
    colored,
    original,
    bill
  } = route.params;

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });

    function getImages() {
      console.log('id is ' + id);

      const formData = new FormData();
      formData.append('bid', id);

      fetch('http://192.168.43.146/API%20Sample/api/Customer/getimages', {
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
          setImages(data2);
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    }

    getImages();
  }, []);

  function updateStatus(val) {
    if (val == 'Canceled') {
      const formdata = new FormData();
      formdata.append('Bid', id);
      formdata.append('status', val);
      formdata.append('buyer', buyer);
      formdata.append('seller', seller);
      formdata.append('Bill', bill);

      fetch('http://192.168.43.146/API%20Sample/api/Customer/reserveresponse', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      })
        .then(response => response.json())
        .then(data2 => {
          console.log(data2);
          navigation.goBack();
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    } else {
      const formdata = new FormData();
      formdata.append('Bid', id);
      formdata.append('Status', val);
      formdata.append('Buyer', buyer);
      formdata.append('seller', seller);
      formdata.append('Bill', bill);

      fetch('http://192.168.43.146/API%20Sample/api/Customer/reserveresponse', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      })
        .then(response => response.json())
        .then(data2 => {
          console.log(data2);
          navigation.goBack();
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    }
  }

  const handleAcceptRequest = () => {
    updateStatus('Accepted');
    Alert.alert('Request Accepted');
  };

  const handleCancelRequest = () => {
    updateStatus('Canceled');
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            showsHorizontalScrollIndicator={true}
            horizontal={true}
            style={{ flexDirection: 'row' }}
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
            }}
          ></FlatList>
        </View>

        <View>
          <ScrollView>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>
              Rs.{'\t' + price}{' '}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>
              {'\t' + title}{' '}
            </Text>

            <View
              style={{
                backgroundColor: 'lightgrey',
                marginTop: 10,

                padding: 4,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }}>
                Details
              </Text>
              <Text style={style.Text}>By : {'\t\t\t\t\t\t\t\t' + author}</Text>
              <Text style={style.Text}>Course : COMPUTER NETWORKS</Text>
              <Text style={style.Text}>Condtion: {'\t\t' + condition}</Text>
              <Text style={style.Text}>Type: {'\t\t\t\t\t\t' + type}</Text>
            </View>

            <Text
              style={{
                color: 'black',
                marginTop: 10,
                fontSize: 16,
                marginLeft: 2,
              }}
            >
            <Text>Black and White Quantity {'\t\t\t\t' +bw+'\n'}</Text>
            
            <Text>Colored Notes Quantity {'\t\t\t\t' +colored+'\n'}</Text>
            <Text>Original Notes Quantity {'\t\t\t\t' +original}</Text>
              Description
            </Text>
            <Text>{'\t\t\t\t' + description}</Text>
            <TextInput style={style.Text}></TextInput>
          </ScrollView>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          onPress={handleAcceptRequest}
          style={{
            marginLeft: 30,
            backgroundColor: '#0047AB',
            padding: 10,
            borderRadius: 3,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Accept Request
          </Text>
        </Pressable>
        <Pressable
          onPress={handleCancelRequest}
          style={{
            marginLeft: 70,
            backgroundColor: '#0047AB',
            padding: 10,
            borderRadius: 3,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Cancel Request
          </Text>
        </Pressable>
      </View>
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
    padding: 2,

    marginRight: 70,
    marginLeft: 5,
    borderColor: 'white',
    marginTop: 7,
  },
  reserve: {
    textAlign: 'center',

    marginTop: 7,
    borderColor: 'white',
    borderWidth: 0.9,
    padding: 5,
    marginRight: 70,
  },
});
