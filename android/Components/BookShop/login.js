import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, Image, TouchableOpacity, View, Alert, Dimensions } from 'react-native';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fl1, setfl1] = useState('User name');
  const [fl2, setfl2] = useState('Password');
  const [c1, setc1] = useState(false);
  const [c2, setc2] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  function usrname() {
    setfl1('Type your name Here');
    setc1(true);
  }

  function pass() {
    setfl2('Type your password Here');
    setc2(true);
  }

  function data2() {
    console.log(username);
    console.log(password);

    const formData = new FormData();
    formData.append('arid_num', username);
    formData.append('password', password);

    fetch('http://192.168.43.146/API%20Sample/api/Customer/login', {
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
        if (data == 'Student') {
          navigation.navigate('Main', { name: username, role: "Student" });
        } else if (data == 'Admin') {
          navigation.navigate('Main', { name: username, role: "Admin" });
        } else {
          Alert.alert("Invalid", 'Not Matched');
        }
      })
      .catch(error => {
        console.error('Error From Server ' + error);
      });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../Assests/login.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={fl1}
          placeholderTextColor="black"
          value={username}
          onChangeText={setUsername}
          onFocus={usrname}
        />
        {c1 ? <Text style={styles.floatingLabel}>User name</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={fl2}
          placeholderTextColor="black"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          onFocus={pass}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
        {c2 ? <Text style={styles.floatingLabel}>Password</Text> : null}
      </View>
      <Pressable onPress={data2} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.8,
    height: width * 0.4,
    marginBottom: 20,
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginVertical: 10,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 1,
    fontSize: 18,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
  },
  floatingLabel: {
    position: 'absolute',
    left: 10,
    top: -10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: 14,
    color: 'black',
  },
  button: {
    backgroundColor: '#0047AB',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Gill-Sans',
    paddingLeft: 20,
    paddingRight: 20,
  },
  icon: {
    position: 'absolute',
    top: 21,
    right: 10,
  },
});
