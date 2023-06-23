import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  StyleSheet,
  View,
  Text,
  Image,
  PermissionsAndroid,
  Modal,
  Alert,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {RadioButton, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import {Pressable} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
// const Stack = createNativeStackNavigator();

export default function App({navigation, route}) {
  // const {name, role} = route.params;
  // console.log("naaaaam is ",name)

  const [ctitles, setctitle] = useState([]);

  const [showcheck, setshowcheck] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  // const [selectedImageType, setSelectedImageType] = useState(null);

  // const [imgpth, setimgpth] = useState();
  // const [imgtyp, setimgtyp] = useState();
  // const [namee, setname] = useState();

  const [btntext, setbtntext] = useState('Sell');
  const [Condtion, setCondtion] = useState('New');
  const [Discount, setDiscount] = useState('');

  const [title, settitle] = useState('');
  const [courseTitle, setcourseTitle] = useState();
  const [author, setauthor] = useState('');
  const [isDonated, setisDonated] = useState('no');
  const [type, settype] = useState('Book');
  const [sale_contact, setsale_contact] = useState();
  const [description, setdescription] = useState();
  const [price, setprice] = useState('');
  const [salearid, setsalarid] = useState();

  const [bw, setbw] = useState(false);
  const [bwprice, setbwprice] = useState(false);

  const [colored, setcolored] = useState(false);
  const [coloredprice, setcoloredprice] = useState('');

  const [org, setorg] = useState(false);
  const [orgprice, setorgprice] = useState('');

  const [images, setImages] = useState([]);
  function gettitles() {
    const {name, role} = route.params;
    setsalarid(name);
    const formData = new FormData();
    formData.append('arid_num', name);
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
          console.log('students titles' + ctitles);
          setctitle(data2);
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
          setctitle(data2);
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    }
  }

  useEffect(() => {}, []);

  useFocusEffect(
    React.useCallback(() => {
      gettitles(); // Call the getData function when the screen becomes active
    }, []),
  );
  // useEffect(() => {

  //   // Call the function initially
  //   gettitles();

  //   // Refresh the data every five seconds
  //   // const intervalId = setInterval(gettitles, 5000);

  //   // // Clear the interval on component unmount to prevent memory leaks
  //   // return () => {
  //   //   clearInterval(intervalId);
  //   // };
  // }, []);

  function managetype(v) {
    console.log('V is ' + v);
    settype(v);
    console.log('Type is ' + type);

    if (v === 'Notes') {
      setshowcheck(true);
    } else {
      setshowcheck(false);
      setorg(false);
      setbw(false);
      setcolored(false);

      setbwprice('');
      setcoloredprice('');
      setorgprice('');
    }
  }

  async function Sell() {
    console.log('inside Sell function');

    if (btntext === 'Sell') {
      console.log(btntext);
      setisDonated('No');
      setDiscount('no');
    } else {
      setisDonated('Yes');
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('arid_num', salearid);
    formData.append('courseTitle', courseTitle);
    formData.append('price', price);
    formData.append('author', author);
    formData.append('isDonated', isDonated);
    formData.append('condition', Condtion);
    formData.append('type', type);
    formData.append('sale_contact', sale_contact);
    formData.append('description', description);
    // formData.append('discount', Discount);
    formData.append('bw', bwprice);
    formData.append('original', orgprice);
    formData.append('colored', coloredprice);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      console.log(image);
      formData.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    }

    console.log(JSON.stringify(formData));

    try {
      const response = await fetch(
        'http://192.168.43.146/API%20Sample/api/Customer/addNewBook3',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      const data = await response.json();
      console.log(data);

      if (data === 'Saved') {
        Alert.alert('Success', 'Book Uploaded');
      } else {
        Alert.alert('Something Wrong', 'Something Wrong');
      }
    } catch (error) {
      console.error('Error From Server: ' + error);
      Alert.alert('Error From Server: ' + error);
    }
  }

  async function opengallery() {
    const result = await launchImageLibrary();
    setImages([
      ...images,
      {
        uri: result.assets[0].uri,
        fileName: result.assets[0].fileName,
        type: result.assets[0].type,
      },
    ]);
    setModalVisible(false);
  }

  async function opencamera() {
    console.log('hiiiiiiiii');
    const grant = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (grant === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('camera permission granted');
      const result = await launchCamera();
      console.log(result);
      if (result.didCancel) {
        console.log('User cancelled the camera operation');
        return; // return early from the function
      }

      if (result.assets && result.assets.length > 0) {
        setImages([
          ...images,
          {
            uri: result.assets[0].uri,
            fileName: result.assets[0].fileName,
            type: result.assets[0].type,
          },
        ]);

        setModalVisible(false);
      } else {
        console.log('No image selected');
      }
    } else {
      console.log('Camera permission denied');
    }
  }

  return (
    <ScrollView>
      <Modal visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Pressable style={styles.modalButton} onPress={opencamera}>
              <Text style={styles.modalButtonText}>Take Picture</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={opengallery}>
              <Text style={styles.modalButtonText}>Choose from gallery</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={[modalVisible == true ? styles.hiddeninp : styles.mainView]}>
        <View
          style={{
            borderColor: 'lightblue ',
            borderRadius: 5,
            borderWidth: 1,
            marginLeft: 10,
            marginRight: 10,
          }}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              style={{width: 125, height: 125, marginLeft: 115}}
              source={require('../../Assests/sellbook.png')}></Image>
          </Pressable>

          <ScrollView horizontal={true}>
            {images.map((image, index) => (
              <Image
                key={index.toString()}
                source={{uri: image.uri}}
                style={styles.img}
              />
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.details}>Title</Text>
          <TextInput
            onChangeText={v => settitle(v)}
            style={styles.tcode}></TextInput>
          <Text style={styles.details}>Course Title</Text>
          <Picker
            selectedValue={courseTitle}
            onValueChange={v => setcourseTitle(v)}
            style={styles.tcode}>
            {ctitles.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
          <Text style={styles.details}>Type</Text>
          <Picker
            selectedValue={type}
            onValueChange={v => managetype(v)}
            style={styles.tcode}>
            <Picker.Item label="Book" value="Book"></Picker.Item>
            <Picker.Item label="Notes" value="Notes"></Picker.Item>
            {/* <Picker.Item
              label="Original Notes"
              value="Original Notes"></Picker.Item> */}
          </Picker>

          {showcheck && (
            <View style={{flexDirection: 'row'}}>
              <Text>BW Notes</Text>
              <CheckBox
                value={bw}
                onValueChange={() => {
                  setbw(!bw);
                }}
              />
              <Text>Colored Notes </Text>
              <CheckBox
                value={colored}
                onValueChange={() => {
                  setcolored(!colored);
                }}
              />
              <Text>Original Notes </Text>
              <CheckBox
                value={org}
                onValueChange={() => {
                  setorg(!org);
                }}
              />
            </View>
          )}

          {bw && (
            <TextInput
              placeholder="Enter Black and white price"
              style={styles.tcode}
              onChangeText={v => setbwprice(v)}></TextInput>
          )}

          {colored && (
            <TextInput
              placeholder="Enter Colored Notes price"
              style={styles.tcode}
              onChangeText={v => setcoloredprice(v)}></TextInput>
          )}

          {org && (
            <TextInput
              placeholder="Enter Original Notes price"
              style={styles.tcode}
              onChangeText={v => setorgprice(v)}></TextInput>
          )}
          <Text style={styles.details}>Author Name</Text>
          <TextInput
            onChangeText={v => setauthor(v)}
            style={styles.tcode}></TextInput>

          {!showcheck && (
            <View>
              <Text
                // style={[btntext == 'Donate' ? styles.hiddeninp : styles.details]}
                style={styles.details}>
                Price
              </Text>
              <TextInput
                style={styles.tcode}
                onChangeText={v => setprice(v)}
                // style={[
                //   btntext == 'Donate' ? styles.hiddeninp : styles.tcode,
                // ]}
              ></TextInput>
            </View>
          )}

          <Text style={styles.details}>Condtion</Text>

          <Picker
            selectedValue={Condtion}
            onValueChange={v => setCondtion(v)}
            style={styles.tcode}>
            {/* <Picker.Item label="10/10" value="10/10"></Picker.Item>
            <Picker.Item label="9/10" value="9/10"></Picker.Item>
            <Picker.Item label="8/10" value="8/10"></Picker.Item>
            <Picker.Item label="7/10" value="7/10"></Picker.Item>
            <Picker.Item label="6/10" value="6/10"></Picker.Item>
            <Picker.Item label="5/10" value="5/10"></Picker.Item> */}

            <Picker.Item label="New" value="New"></Picker.Item>
            <Picker.Item label="Used" value="Used"></Picker.Item>
          </Picker>
          <Text style={styles.details}>Description</Text>
          <TextInput
            onChangeText={v => setdescription(v)}
            multiline={true}
            value={description}
            style={styles.desc}></TextInput>

          {/* <TextInput
            
            onChangeText={v => setprice(v)}
            style={[
              btntext == 'Donate' ? styles.hiddeninp : styles.tcode,
            ]}
          ></TextInput> */}
        </View>

        <Text style={styles.details}>Contact Information</Text>
        <TextInput
          onChangeText={v => setsale_contact(v)}
          placeholder="Required"
          style={styles.tcode}></TextInput>
        {/* 
        <Picker
          selectedValue={Discount}
          onValueChange={v => setDiscount(v)}
          style={[btntext == 'Sell' ? styles.hiddeninp : styles.tcode]}>
    
          <Picker.Item label="Free" value="Free"></Picker.Item>
          <Picker.Item label="75%" value="75%"></Picker.Item>
          <Picker.Item label="50%" value="50%"></Picker.Item>
          <Picker.Item label="25%" value="25%"></Picker.Item>
        </Picker> */}

        <RadioButton.Group
          onValueChange={val => setbtntext(val)}
          value={btntext}>
          <RadioButton.Item label="Sell" value="Sell"></RadioButton.Item>
          <RadioButton.Item label="Donate" value="Donate"></RadioButton.Item>
        </RadioButton.Group>

        <Pressable onPress={Sell} style={styles.btn}>
          <Text style={styles.btntxt}>{btntext + 'Book'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginBottom: 20,
    marginTop: 15,
  },

  body: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
  },
  hiddeninp: {width: 0, height: 0},
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  img: {
    width: 80,
    height: 80,
    marginBottom: 8,

    marginLeft: 20,
  },
  btntxt: {
    fontSize: 15,

    color: 'white',

    textAlign: 'center',

    borderColor: '#0A2647',
  },
  details: {
    fontSize: 15,

    color: 'black',
    marginLeft: 20,
    marginTop: 6,
  },
  tcode: {
    borderColor: 'black',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    height: 30,
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: 'white',
  },
  desc: {
    borderColor: 'black',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 7,

    borderWidth: 0.5,

    marginBottom: 80,
    backgroundColor: 'white',
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
  picker: {
    fontSize: 15,
    marginTop: 2,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 7,
    height: 30,
    borderWidth: 4,
    color: 'black',
  },
  filterPanel: {
    marginTop: 50,

    backgroundColor: 'white',
    padding: 20,
  },
  modalBackground: {
    marginTop: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    padding: 30,
  },
  modalButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 50,
    padding: 50,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
// //const BookImages = () => {
//   const [images, setImages] = useState([]);

//   const handleImagePicker = () => {
//     launchCamera(
//       {
//         mediaType: MediaType.photo,
//         quality: 1,
//         maxWidth: 300,
//         maxHeight: 300,
//       },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         } else {
//           setImages([...images, response.uri]);
//         }
//       },
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Book Images</Text>
//       <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
//         <Text style={styles.buttonText}>Take a photo</Text>
//       </TouchableOpacity>
//       <View style={styles.imagesContainer}>
//         {images.map((uri) => (
//           <Image key={uri} source
