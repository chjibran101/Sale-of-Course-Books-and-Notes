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
  Modal,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {FlatList} from 'react-native-gesture-handler';

export default function Students() {
  const [data, setdata] = useState([]);
  const [name, setname] = useState();
  const [reg, setreg] = useState();
  const [balance, setbalance] = useState();
  const [tempbalance, settempbalance] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setsearchTerm] = useState('');
  const [filteredData, setfilteredData] = useState([]);
  const [showbooks, setshowbooks] = useState(true);
  const [isLoading, setisLoading] = useState(false);


  function getdata() {
    //   const {name, role} = route.params;
    //   const formData = new FormData();
    //   formData.append('username', name);

    fetch('http://192.168.43.146/API%20Sample/api/Customer/getStudents', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      // body: formData,
    })
      .then(response => response.json())
      .then(data2 => {
        console.log(data2);
        setdata(data2);
        console.log('Buy Book data is ' + data2);
      })
      .catch(error => {
        console.error('Error From Server is ' + error);
      });
  }

  useEffect(() => {
  

    getdata();
  }, []);

  function updatebalance() {
    settempbalance(balance+tempbalance)
    console.log(tempbalance)
    const formData = new FormData();
    formData.append('arid_no', reg);
    formData.append('balance', balance);
    formData.append('oldbalance', tempbalance);
    fetch('http://192.168.43.146/API%20Sample/api/Customer/addBalance', {
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
        if(data==="Added")
        {
      Alert.alert("Success","Balance Added")
        }
      
      })
      .catch(error => {
        console.error('Error From Server is ' + error);
      });
  


    }

  function searchdata(text) {
    if (text === '') {
      // if search term is empty, display all data
      setdata(data);
      setshowbooks(true);
    } else {
      setshowbooks(false);
      setsearchTerm(text)
      console.log(text);
      const filteredBooks = data.filter(
        student => student.Reg_No.toLowerCase().startsWith(text.toLowerCase())
        // student => student.Reg_No.toLowerCase() === searchTerm.toLowerCase()
      );
      setfilteredData(filteredBooks);
    }
  }
  return (
    <View>
      <Modal visible={modalVisible}>
        <View>
          <View>
            <Text
              style={{
                marginTop: 40,
                marginLeft: 10,
                color: 'black',
                fontSize: 15,
              }}>
              Name
            </Text>
            <TextInput
              style={{
                borderColor: 'black',
                borderWidth: 0.6,
                marginLeft: 30,
                marginRight: 60,
                marginTop: 20,
                textAlign: 'center',
              }}
              editable={false}
              placeholder={name}></TextInput>
            <Text
              style={{
                marginTop: 40,
                marginLeft: 10,
                color: 'black',
                fontSize: 15,
              }}>
              Reg-No
            </Text>
            <TextInput
              style={{
                borderColor: 'black',
                borderWidth: 0.6,
                marginLeft: 30,
                marginRight: 60,
                marginTop: 20,
                textAlign: 'center',
              }}
              editable={false}
              placeholder={reg}></TextInput>
            <Text
              style={{
                marginTop: 40,
                marginLeft: 10,
                color: 'black',
                fontSize: 15,
              }}>
              Amount
            </Text>
            <TextInput
              style={{
                borderColor: 'black',
                borderWidth: 0.6,
                marginLeft: 30,
                marginRight: 60,
                marginTop: 20,
                textAlign: 'center',
              }}
              placeholder={
                typeof tempbalance === 'number' ? tempbalance.toString() : ''
              }
              onChangeText={v => {
                setbalance(v);
              }}></TextInput>

            <Pressable
              style={{
                backgroundColor: '#0047AB',
                borderRadius: 5,

                padding: 10,
                marginTop: 40,
                marginLeft: 90,
                backgroundColor: '#0047AB',
                marginRight: 100,
                marginBottom: 20,
              }}
              onPress={() => {
                updatebalance();
                setModalVisible(false);
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontFamily: 'Gill-Sans',
                }}>
                Add Amount
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={style.searchBar}>
        <Icon name="search" size={20} style={style.searchIcon} />
        <TextInput
          style={style.input}
          placeholder="Search"
          placeholderTextColor="#888"
          onChangeText={(text) => searchdata(text)}
        />
        {/* <Pressable onPress={searchdata} style={style.button}>
          <Text style={style.buttonText}>Search</Text>
        </Pressable> */}
      </View>
      <FlatList
        data={showbooks ? data : filteredData}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setisLoading(true);
              setTimeout(() => {
                // Update your state here after 5 seconds
                setshowbooks(true);
                setisLoading(false);
              }, 2000);
            }}
          />
        }
        renderItem={itm => {
          return (
            <View>
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                  setbalance(itm.item.balance);
                  setname(itm.item.St_firstname + '\t' + itm.item.St_lastname);
                  setreg(itm.item.Reg_No);
                  settempbalance(itm.item.balance);
                }}
                style={style.btn}>
                {/* <Image style={style.img} source={itm.item.img}></Image> */}
                {/* <Image
                    key={itm.id}
                    source={{
                      uri:
                        'http://192.168.43.146/API Sample/content/images/' +
                        itm.item.image,
                    }}
                    style={style.img}

                  /> */}
                <View style={{marginTop: 20}}>
                  <Text style={style.txt2}>
                    {itm.item.St_firstname + '\t' + itm.item.St_lastname}
                  </Text>

                  <Text style={style.txt2}>{itm.item.Reg_No}</Text>
                  <Text style={style.txt2}>{itm.item.balance}</Text>
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
  button: {
    backgroundColor: '#0047AB',
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Gill-Sans',
    paddingLeft: 5,
    paddingRight: 5,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  searchIcon: {
    color: '#888',
  },
});
