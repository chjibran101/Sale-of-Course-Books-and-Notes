import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import StarRating from 'react-native-star-rating';

export default function Notifi({route, navigation}) {
  const [username, setUsername] = useState('');
  const [books, setBooks] = useState([]);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState([]);
  const [rating, setRating] = useState(0);
  function getTitles() {
    const {un} = route.params;
    setUsername(un);

    const formData = new FormData();
    formData.append('Buyer', un);

    fetch(
      'http://192.168.43.146/API%20Sample/api/Customer/GetNotifications',
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
        console.log('Data 2 is' + JSON.stringify(data2));
        setBooks(data2);
      })
      .catch(error => {
        console.error('Error From Server is ' + error);
      });
  }
  useEffect(() => {
  

    getTitles();
  }, []);

  const handleRatePress = book => {
    setSelectedBook(book);
    setRatingModalVisible(true);
  };

  const handleRatingSubmit = () => {
    // Handle rating submission here
    alert(`Rating ${rating} submitted for book ${selectedBook.title}`);
    setRatingModalVisible(false);

    // navigation.navigate('Main',{username});

    const formData = new FormData();
    formData.append('arid_num', selectedBook.sale_regNo);
    formData.append('rater_arid_num', selectedBook.buyer_regNo);
    formData.append('rate', rating);
    formData.append('b_id', selectedBook.id);

    fetch('http://192.168.43.146/API%20Sample/api/Customer/updateRating', {
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
      getTitles();
  };

  return (
    <View>
<FlatList
  data={books}
  renderItem={({ item }) => {
    const { title, author, status, image, accepted } = item;
    const canceled = status === 'Canceled';
    const isTitleLong = title.length > 10;

    return (
      <View style={style.itemContainer}>
        <Image
          source={{
            uri:
              'http://192.168.43.146/API Sample/content/images/' + image,
          }}
          style={style.img}
        />
        <View style={style.itemDetails}>
          <Text style={style.txt2}>{title}</Text>
          <Text style={style.txt2}>{`By ${author}`}</Text>
          {canceled ? (
            <Text style={[style.txt2, { color: 'red' }]}>
              Canceled
            </Text>
          ) : (
            <Text style={[style.txt2, { color: 'green' }]}>
              Accepted
            </Text>
          )}
        </View>
        <View style={style.buttonsContainer}>
          {canceled ? (
            <Pressable
              onPress={() => {
                navigation.navigate('Chat', {
                  buyer: username,
                  seller: item.sale_regNo,
                });
              }}
              style={style.chatBtn}
            >
              <Text style={style.btnText}>Chat</Text>
            </Pressable>
          ) : (
            <>
              <Pressable
                onPress={() => {
                  navigation.navigate('Chat', {
                    buyer: username,
                    seller: item.sale_regNo,
                  });
                }}
                style={style.chatBtn}
              >
                <Text style={style.btnText}>Chat</Text>
              </Pressable>
              {item.rate === 0 ? (
                <Pressable
                  onPress={() => handleRatePress(item)}
                  style={style.rateBtn}
                >
                  <Text style={style.btnText}>Rate</Text>
                </Pressable>
              ) : item.rate === 1 ? (
                <Text style={{ color: 'orange' }}>Rated</Text>
              ) : null}
            </>
          )}
        </View>
      </View>
    );
  }}
  keyExtractor={(item, index) => index.toString()}
/>



      <Modal
        visible={ratingModalVisible}
        onRequestClose={() => setRatingModalVisible(false)}>
        <View style={style.ratingModalContainer}>
          <Text style={style.ratingModalTitle}>Rate Book</Text>
          <Text style={style.ratingModalBookTitle}>
            {selectedBook && selectedBook.title}
          </Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            fullStarColor="orange"
            selectedStar={rating => setRating(rating)}
          />
          <Pressable
            style={style.ratingModalSubmitButton}
            onPress={handleRatingSubmit}>
            <Text style={style.ratingModalSubmitButtonText}>Submit</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginTop: 1,
    backgroundColor: '#D3D3D3',
    padding: -10,
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginVertical: 12,
    marginHorizontal: 10,
  },
  itemDetails: {
    flex: 1,
    marginVertical: 20,
  },
  txt2: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  buttonsContainer: {
    marginLeft: 'auto',
    marginRight: 10,
    alignItems: 'flex-end',
  },
  chatBtn: {
    backgroundColor: '#0047AB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  rateBtn: {
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
  },
  btnText2: {
    color: 'Black',
  },

  ratingModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  ratingModalBookTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  ratingModalSubmitButton: {
    backgroundColor: '#0047AB',
    paddingHorizontal: 25,
    paddingVertical: 11,
    borderRadius: 5,
    marginTop: 20,
  },
  ratingModalSubmitButtonText: {
    color: '#fff',
  },
});
