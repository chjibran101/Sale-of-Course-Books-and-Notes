import React, {useState} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity,FlatList} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Snackbar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

export default function CoursesWishlist({route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const [title, settitle] = useState();
  const [records, setrecords] = useState();

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handlePlusButton = () => {
    setModalVisible(true);
  };

  

  const handleModalClose = () => {
    setModalVisible(false);
    setShowSnackbar(true);

data2();

getreserve()

  };

  const handleSnackbarDismiss = () => {
    setShowSnackbar(false);
  };

  function gettitles() {
    const {un, role} = route.params;
    console.log(un);
    const formData = new FormData();
    formData.append('arid_num', un);
    if (role === 'Student') {
      fetch(
        'http://192.168.43.146/API%20Sample/api/Customer/getStudentCourses',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      )
        .then(response => response.json())
        .then(data2 => {
          console.log(' students  titles ' + data2);
          console.log('students titles' + selectedItem);
          setSelectedItem(data2);
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    } else {
      fetch('http://192.168.43.146/API%20Sample/api/Customer/getAdminCourses', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => response.json())
        .then(data2 => {
          console.log('course titles are' + data2);
          setSelectedItem(data2);
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      gettitles();
      getreserve()
    }, []),
  );


  function data2() {
    const {un, role} = route.params;
    const formData = new FormData();
    formData.append('buyer', un);
    formData.append('CourseTitle', title);

    fetch('http://192.168.43.146/API%20Sample/api/Customer/addWishlistReserve', {
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
        console.error('Error From Server ' + error);
      });
  }



  function getreserve() {
    const {un, role} = route.params;
    const formData = new FormData();
    formData.append('buyer', un);


    fetch('http://192.168.43.146/API%20Sample/api/Customer/getAddedWishlist', {
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
        setrecords(data)
    
      })
      .catch(error => {
        console.error('Error From Server ' + error);
      });
  }



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Courses Wishlist</Text>

      <FlatList
  data={records}
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
     
      </View>

    </View>
  )}
/>


      <TouchableOpacity style={styles.plusButton} onPress={handlePlusButton}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Item</Text>
            <Picker
              style={styles.picker}
              selectedValue={title}
              onValueChange={(v)=>settitle(v)}>
              {selectedItem.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Snackbar
        visible={showSnackbar}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
        style={styles.snackbar}>
        Reserved
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 32,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  snackbar: {
    marginBottom: 10,
    borderRadius: 5,
    width: 105,
    height: 40,
    left: 150,
  },
});
