import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import {Picker} from '@react-native-picker/picker';
export default function App({route}) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [aridnums, setaridnums] = useState([]);
  const [bid, setbid] = useState();


  function getData() {
    const formData = new FormData();
    formData.append('arid_num', route.params.name);

    fetch('http://192.168.43.146/API%20Sample/api/Customer/forSaleBooks', {
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
        setBooks(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error From Server: ' + error);
        setIsLoading(false);
      });
  }


  function sold() {
    setIsDropdownOpen(!isDropdownOpen);

    const formData = new FormData();
    formData.append('Buyer', selectedItem);
    formData.append('Bid', bid);
    formData.append('Seller', route.params.name);

    fetch('http://192.168.43.146/API%20Sample/api/Customer/markSold', {
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
        if(data==="Sold")
        {
getData();
        }
      })
      .catch(error => {
        console.error('Error From Server is ' + error);
      });
  

}

  const handleDropdownToggle = id => {
    setIsDropdownOpen(!isDropdownOpen);
    setbid(id);
    console.log(bid);

    if (bid != null) {
      const formData = new FormData();
      formData.append('Buyer', selectedItem);
      formData.append('Bid', bid);
      formData.append('Seller', route.params.name);
      fetch('http://192.168.43.146/API%20Sample/api/Customer/markSold', {
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
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData(); // Call the getData function when the screen becomes active
    }, [])
  );

  // useEffect(() => {
  //   getData();

  //   // const interval = setInterval(() => {
  //   //   getData();
  //   // }, 5000); // Fetch data every 5 seconds

  //   // return () => {
  //   //   clearInterval(interval);
  //   // };
  // }, []);

  useEffect(() => {
    const {name, role} = route.params;

    console.log('name is ' + name);
    console.log('role  is ' + role);
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
        setaridnums(data2);
        setSelectedItem(data2[0]?.regNo1)
        console.log("first regnum is"+selectedItem)
      })
      .catch(error => {
        console.error('Error From Server ' + error);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{marginTop: 20}}>
      <Modal visible={isDropdownOpen} animationType="slide" transparent={true}>
        <View style={styles.dropdownContainer}>
          {/* Dropdown content */}
          <View style={styles.dropdownContent}>
            <Picker
              selectedValue={selectedItem}
              onValueChange={value => setSelectedItem(value)}>
              {aridnums.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.regNo1}
                  value={item.regNo1}
                />
              ))}
            </Picker>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.closeButton} onPress={sold}>
                <Text style={styles.buttonText}>Sell</Text>
              </Pressable>
              <Pressable
                style={styles.closeButton}
                onPress={handleDropdownToggle}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
  data={books.sort((a, b) => (a.sold === 'No' ? -1 : 1))}
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
        <Text style={styles.txt}>By {item.author}</Text>
        {item.sold === 'Yes' && (
          <Text style={styles.txt2}>Sold to {item.buyer_regNo}</Text>
        )}
      </View>
      {item.sold === 'Yes' ? (
        <Text style={styles.sellButton2}>Sold</Text>
      ) : (
        <Pressable
          style={styles.sellButton}
          onPress={() => handleDropdownToggle(item.id)}>
          <Text style={styles.sellButtonText}>Sell</Text>
        </Pressable>
      )}
    </View>
  )}
/>

    </View>
  );
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
  txt: {
    fontSize: 15,
    marginLeft: 10,

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
  sellButton2: {
    marginRight: 4,
  
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
