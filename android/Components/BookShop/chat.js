import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';

const ChatScreen = ({route}) => {
  const [message, setMessage] = useState('');
  const [buyerr, setbuyerr] = useState('');
  const [sellerr, setsellerr] = useState('');

  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      text: 'Hello, i am interested buying the Book',

      sender: 'Jibran',
      reciever: 'Ahmed',
    },
    {
      id: 2,
      text: 'Oky,why not sure !',

      sender: 'Ahmed',
      reciever: 'Jibran',
    },
    {
      id: 3,
      text: 'Umm , i Have Seen that the Price is little bit high can You please negotiate',

      sender: 'Jibran',
      reciever: 'Sarosh',
    },
  ]);

  const[id,setid]=useState(4)

  // const handleSubmit = () => {
  //   setChatHistory([
  //     ...chatHistory,
  //     {id: chatHistory.length + 1, text: message, user: 'self'},
  //   ]);
  //   setMessage('');
  // };

  useEffect(() => {
    // const buyer = localStorage.getItem('buyer')
    const {buyer, seller} = route.params;
    setbuyerr(buyer);
    setsellerr(seller);

    console.log('Buyer is ' + buyer);
    console.log('seller is ' + seller);



    function data2() {

  
  
      const formData = new FormData();
      formData.append('sender', buyer);
      formData.append('reciever', seller);
  
      fetch('http://192.168.43.146/API%20Sample/api/Customer/getMessages', {
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
          if(data!=null)
          {
            setChatHistory(data)
          }
      }
        )
        .catch(error => {
          console.error('Error From Server ' + error);
        });
    }


data2();

  }, []);

  const handleSubmit = async (text) => {
    if (message.trim() !== '') {
    setChatHistory([
      ...chatHistory,
      {
        id: id+1,
        text: text,
        sender: buyerr,
        reciever: sellerr,
      },
    ]);
    setMessage('');
 

    try {
      const formData = new FormData();
      formData.append('sender', buyerr);
      formData.append('reciever', sellerr);
      formData.append('text', message);
      // formData.append('timest', new Date().toISOString());

      const response = await fetch(
        'http://192.168.43.146/API%20Sample/api/Customer/sendMessage',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (response.ok) {
        const messageData = await response.json();
        // setChatHistory(messageData)
      } else {
        console.log('Failed to send message.');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.chatHistory}
        data={chatHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={[
              styles.chatBubble,
              item.sender === buyerr
                ? styles.selfChatBubble
                : styles.otherChatBubble,
            ]}>
            <Text style={styles.chatText}>{item.text}</Text>
            <Text>{item.time }</Text>
          </View>
        )}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={v => setMessage(v)}
          placeholder="Enter message here"
        />
        <Pressable onPress={()=>{handleSubmit(message)}} style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  chatHistory: {
    flex: 1,
    padding: 10,
  },
  chatBubble: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  button: {
    backgroundColor: '#7FDBFF',

    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 12,
    textAlign: 'center',
  },
  selfChatBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#7FDBFF',
  },
  otherChatBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  chatText: {
    fontSize: 16,
    color: '#333333',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    marginTop: 10,
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default ChatScreen;
