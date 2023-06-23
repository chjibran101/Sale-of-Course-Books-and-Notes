import React from 'react';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import StarRating from 'react-native-star-rating';

import { DrawerLayoutAndroid } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ route, navigation }) {
  const drawerRef = React.useRef(null);

  const [bg, setbg] = useState(
    'linear-gradient(to bottom right, #36a3f7, #00bcd4, #2979ff, #3f51b5)',
  );
  const [vbg, setvbg] = useState();
  const [bg2, setbg2] = useState();
  const [bg3, setbg3] = useState();
  const [bg4, setbg4] = useState();
  const [bg5, setbg5] = useState();
  const [isadmin, setisadmin] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [trending, settrending] = useState([]);

  const [data, setdata] = useState([]);
  const [details, setdetails] = useState([]);
  const [un, setun] = useState();
  const [balance, setbalance] = useState(0);
  const [nameee, setnamee] = useState();
  const [passd, setpassd] = useState();
  const [rating, setrating] = useState();
  const [lname, setlname] = useState();
  const [rolee, setrolee] = useState();

  const [one, setone] = useState(false);

  const myFunctionRef = useRef(null);

  const handlePress = itemId => {
    // console.log(itemId);
    // setPressedItems(prevState => {
    //   if (prevState.includes(itemId)) {
    //     return prevState.filter(id => id !== itemId);
    //   } else {
    //     return [...prevState, itemId];
    //   }
    // });

    const updatewishlist = () => {
      const formData = new FormData();
      formData.append('arid_num', un);
      formData.append('bid', itemId);

      fetch('http://192.168.43.146/API%20Sample/api/Customer/updatewishlist', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
        timeout: 300000,
      })
        .then(response => response.json())
        .then(data2 => {
          console.log(data2);
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    };

    updatewishlist();
    if (myFunctionRef.current) {
      myFunctionRef.current(); // Call the function outside the useEffect
    }
  };




  //searcharea

  //drawer function

  function drawer() {
    drawerRef.current.openDrawer();
  }

  useEffect(() => {
    // const username = route.params;
    const { name, role } = route.params;
    console.log('name is ' + name);
    console.log('role  is ' + role);

    setun(name);
    setrolee(role);

    // setun(username.username);
    setun(name);
    const formData = new FormData();
    // formData.append('username', username.username);
    formData.append('arid_num', name);
    if (role === 'Admin') {
      setisadmin(true);
    }



    function getnames() {
      if (role === 'Student') {
        fetch('http://192.168.43.146/API%20Sample/api/Customer/getnames', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          timeout: 300000,
        })
          .then(response => response.json())
          .then(result => {
            console.log('result for Details' + result);
            setdetails(result);

            // setbalance(details[0]?.balance);
            // setnamee(details[0]?.St_firstname);
            // setlname(details[0]?.St_lastname);
            // setpassd(details[0]?.password);
            // setrating(details[0]?.rating);
          })
          .catch(error => {
            console.error('Error From Server is ' + error);
          });
      } else {
        fetch('http://192.168.43.146/API%20Sample/api/Customer/getadmin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          timeout: 300000,
        })
          .then(response => response.json())
          .then(result => {
            console.log('result for Details' + result);
            setdetails(result);
            // setbalance(details[0]?.balance);
            // setnamee(details[0]?.name);

            // setpassd(details[0]?.password);
            // setrating(details[0]?.rating);
          })
          .catch(error => {
            console.error('Error From Server is ' + error);
          });
      }
    }





    function getdata() {
      if (role === 'Student') {
        fetch('http://192.168.43.146/API%20Sample/api/Customer/getBooks', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          timeout: 300000,
        })
          .then(response => response.json())
          .then(data2 => {
            console.log(data2);
            setdata(data2);
            console.log('Books are  ' + JSON.stringify(data));
          })
          .catch(error => {
            console.error('Error From Server is ' + error);
          });
      } else {
        fetch('http://192.168.43.146/API%20Sample/api/Customer/getAdminBooks', {
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
            setdata(data2);
            console.log('Books are ' + data);
          })
          .catch(error => {
            console.error('Error From Server is ' + error);
          });
      }
    }
    myFunctionRef.current = getdata;
    function trending() {
      if (role === 'Student') {
        fetch(
          'http://192.168.43.146/API%20Sample/api/Customer/getTrendingBooks',
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
            console.log(data2);
            if (data != null) {
              settrending(data2);

              setone(true);
              console.log('Trending Books are  ' + data);
              console.log('One is  ' + one);
            }
          })
          .catch(error => {
            console.error('Error From Server is ' + error);
          });
      } else {
        fetch('http://192.168.43.146/API%20Sample/api/Customer/getAdminBooks', {
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
            settrending(data2);
            console.log('Trending Books are  ' + data);
          })
          .catch(error => {
            console.error('Error From Server is ' + error);
          });
      }
    }
    trending();
    if (setone) {
      getdata();
    }
    getnames();
  }, []);
  console.log(details, 'details>>>');
  renderStarIcon = (index, value) => {
    if (value >= index) {
      return <Icon name="star" />;
    } else if (value >= index - 0.5) {
      return <Icon name="star-half-o" />;
    } else {
      return <Icon name="star-o" />;
    }
  };
  useEffect(() => {
    setbalance(details[0]?.balance);
    setnamee(details[0]?.St_firstname);
    setlname(details[0]?.St_lastname);
    setpassd(details[0]?.password);
    setrating(details[0]?.rating);
  }, [details]);
  function Students() {
    navigation.navigate('Students');
  }
  //   useEffect(()=>{
  //   function search()
  //   {

  //     if(searchQuery!=null)
  //     {
  //     const searchbooks = data.filter(
  //       book =>
  //         book.name===searchQuery
  //     );
  //     setname([...searchbooks]);
  //     }
  //   }
  //   search()
  //  } ,[])

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={() => (
        <View style={{ backgroundColor: vbg }}>
          <View style={{ marginBottom: -160, marginTop: 10 }}>
            {details.map(detail => (
              <View key={detail.id}>
                {!isadmin && (
                  <Text style={{ marginTop: 100, fontSize: 20, color: 'black' }}>
                    {' '}
                    {detail.St_firstname + '\t' + detail.St_lastname}
                  </Text>
                )}



                {isadmin && (
                  <Text style={{ marginTop: 100, fontSize: 20, color: 'black' }}>
                    {' '}
                    {un}
                  </Text>
                )}

                {!isadmin && (
                  <Text style={{ marginTop: 15, fontSize: 15, color: 'black' }}>
                    {' '}
                    {un}
                  </Text>
                )}
                <Text style={{ marginTop: 50, fontSize: 15, color: 'black' }}>
                  {' '}
                  Rating {detail.rating}
                </Text>
                <StarRating
                  starStyle={{ marginRight: 2 }}
                  disabled={false}
                  maxStars={5}
                  rating={rating}
                  starSize={15}
                  fullStarColor={'orange'}
                  emptyStarColor={'orange'}
                  halfStarEnabled={true}
                  renderStarIcon={this.renderStarIcon}
                  containerStyle={{ justifyContent: 'flex-start' }}
                  starPadding={2}
                />

              </View>
            ))}
            <Text>
              {'\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' +
                balance}
            </Text>
          </View>
          <View
            style={{
              marginTop: 160,
              borderWidth: 0.6,
              borderColor: 'black',
            }}></View>
          {/* <Text>First Drawer Screen</Text> */}
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Image
              style={{ width: 30, height: 30, marginLeft: 10, marginTop: 15 }}
              source={require('../../Assests/reserve.jpeg')}></Image>
            <Pressable
              onPress={() => {
                navigation.navigate('Reservation Requests', un);
              }}
              style={{
                marginTop: 10,
                marginLeft: -4,
                backgroundColor: bg,
                paddingRight: 10,
                borderRadius: 5,
                paddingLeft: 30,
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 10

              }}>
              <Text>Reservation Requests</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Image
              style={{ width: 35, height: 35, marginLeft: 5, marginTop: 15 }}
              source={require('../../Assests/noti.png')}></Image>
            <Pressable
              onPress={() => {
                navigation.navigate('Notifications', { un, rolee });
              }}
              style={{
                marginTop: 20,
                marginLeft: -2,
                backgroundColor: bg4,
                paddingRight: 100,
                borderRadius: 5,
                paddingLeft: 30,
                paddingTop: 10,
                paddingBottom: 10,
              }}>


              <Text>Notifications</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 11 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ width: 30, height: 30, marginLeft: 6, marginTop: 20 }}
                source={require('../../Assests/messages.jpeg')}></Image>
              <Pressable
                onPress={() => {
                  navigation.navigate('Messages', { name: un, role: rolee });
                }}
                style={{
                  marginTop: 10,
                  marginLeft: 25,
                  backgroundColor: bg4,
                  paddingRight: 100,
                  borderRadius: 5,
                  paddingLeft: 15,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                <Text>Messages</Text>




              </Pressable>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 11 }}>
            {isadmin && (
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{ width: 50, height: 50, marginLeft: 1, marginTop: 10 }}
                  source={require('../../Assests/studentss.jpeg')}></Image>
                <Pressable
                  onPress={Students}
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    backgroundColor: bg4,
                    paddingRight: 100,
                    borderRadius: 5,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  <Text>Students</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* <View style={{flexDirection: 'row', marginTop: 20}}>
            <Image
              style={{width: 40, height: 40, marginLeft: 4}}
              source={require('../../Assests/Fvt.png')}></Image>
            <Pressable
              onPress={() => navigation.navigate('Favourites', {un, rolee})}
              style={{
                marginLeft: 2,
                backgroundColor: bg2,
                paddingRight: 10,
                borderRadius: 5,
                paddingLeft: 30,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <Text>Favourites</Text>
            </Pressable>
          </View> */}


          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Image
              style={{ width: 40, height: 40, marginLeft: 4 }}
              source={require('../../Assests/Fvt.png')}></Image>
            <Pressable
              onPress={() => {
                navigation.navigate('CoursesWishlist', { un, rolee });
              }}
              style={{
                marginTop: 10,
                marginLeft: 37,
              }}>
              <Text>Courses Wishlist</Text>
            </Pressable>
          </View>



          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Image
              style={{ width: 35, height: 35, marginLeft: 3, marginTop: 6 }}
              source={require('../../Assests/setttings.jpeg')}></Image>
            <Pressable
              onPress={() => {
                navigation.navigate('Account', { un, nameee, lname, passd });
              }}
              style={{
                marginTop: 10,
                marginLeft: 37,
              }}>
              <Text>Account Setting</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Image
              style={{ width: 30, height: 30, marginLeft: 10, marginTop: 10 }}
              source={require('../../Assests/logout.jpeg')}></Image>
            <Pressable
              style={{
                marginLeft: 10,
                backgroundColor: bg5,
                paddingRight: 10,
                borderRadius: 5,
                paddingLeft: 30,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <Text
                style={{ color: 'black' }}
                onPress={() => {
                  navigation.goBack('login');
                }}>
                LogOut
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      statusBarBackgroundColor={'#0047AB'}>
      <View style={{ backgroundColor: 'White' }}>
        <View
          style={{
            backgroundColor: '#0047AB',
            flexDirection: 'row',
            padding: 10,
          }}>
          <Pressable onPress={drawer}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../Assests/mic.png')}></Image>
          </Pressable>
          {/* <Image
            style={{width: 30, height: 30, marginLeft: 310}}
            source={require('../../Assests/search.png')}></Image> */}
          {/* <View>
            {enabled && (
              <TextInput
                style={style.searchInput}
                placeholder="Search Book "
                placeholderTextColor="white"
                value={searchQuery}
                onChangeText={v => setSearchQuery(v)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            )}

            {/* 
{isCancelled && (
        <Pressable onPress={handleCancel}>
          <Image
            source={require('../../Assests/cancelicon.png')}
            style={{ width: 20, height: 20, marginLeft: 10 }}
          />
        </Pressable>
      )} */}
          {/* 
            {searchhide && (
              <Pressable
                onPress={() => {
                  setenabled(true);
                  setsearchhide(false);
                  setcancel(true);
                }}
                style={style.searchButton}>
                <Image
                  style={{width: 40, height: 35, marginLeft: 300}}
                  source={require('../../Assests/search.png')}></Image>
              </Pressable>
            )}

            {cancel && (
              <Pressable
                onPress={() => {
                  setenabled(false);
                  setsearchhide(true);
                  setcancel(false);
                }}
                style={style.searchButton}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 270,
                    marginTop: -20,
                  }}
                  source={require('../../Assests/cancelicon.png')}></Image>
              </Pressable>
            )} }
          </View> */}
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 6,
              marginTop: 10,
              fontWeight: 'bold',
              color: 'purple',
              marginBottom: 4,
            }}>
            Trending
          </Text>
        </View>
        <View style={{ backgroundColor: '#717DCD' }}>
          <FlatList
            horizontal
            data={trending}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginHorizontal: 8,
                }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Details', {
                      id: item.id,
                      title: item.title,
                      type: item.type,
                      author: item.author,
                      price: item.price,
                      condition: item.condition,
                      isDonated: item.isDonated,
                      description: item.description,
                      code: item.course_title,
                      buyer: un,
                      seller: item.sale_regNo,
                      balance: balance,
                    });
                  }}
                  style={style.trending}>
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={{
                        uri:
                          'http://192.168.43.146/API Sample/content/images/' +
                          item.image,
                      }}
                      style={style.img2}
                    />
                    <Text style={style.txt}>{item.title}</Text>
                  </View>
                  <View style={{ marginTop: 2, alignItems: 'center' }}>
                    <StarRating
                      starStyle={{ marginRight: 2 }}
                      disabled={false}
                      maxStars={5}
                      rating={item.rating}
                      starSize={15}
                      fullStarColor={'orange'}
                      emptyStarColor={'orange'}
                      halfStarEnabled={true}
                      renderStarIcon={this.renderStarIcon}
                      containerStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                      starPadding={2}
                    />
                  </View>
                </Pressable>
              </View>
            )}
          />
        </View>

        <View
          style={{
            marginTop: 5,
            marginBottom: 540,
          }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            // data={name}
            renderItem={itm => {
              return (
                <View>
                  <Pressable
                    style={style.btn}
                    onPress={() => {
                      navigation.navigate('Details', {
                        id: itm.item.id,
                        title: itm.item.title,
                        type: itm.item.type,
                        author: itm.item.author,
                        price: itm.item.price,
                        condition: itm.item.condition,
                        isDonated: itm.item.isDonated,
                        description: itm.item.description,
                        code: itm.item.course_title,
                        buyer: un,
                        seller: itm.item.sale_regNo,
                        balance: balance,
                        id1: itm.item.id1,
                        bw: itm.item.bw,
                        colored: itm.item.colored,
                        original: itm.item.original
                      });
                    }}>
                    {/* <Image style={style.img} source={itm.item.img}></Image> */}
                    <Image
                      source={{
                        uri:
                          'http://192.168.43.146/API Sample/content/images/' +
                          itm.item.image,
                      }}
                      style={style.img}
                    />

                    <View style={{ marginTop: 20 }}>
                      <Text style={style.txt2}>{itm.item.title}</Text>

                      <Text style={style.txt2}>Author {itm.item.author}</Text>
                      <Text style={style.txt2}>{itm.item.type}</Text>
                      <Text style={style.txt3}>
                        {/* {itm.item.price} */}
                        {/* {itm.item.donatedPrice === 'No' ? (
                          `Rs. ${itm.item.price}`
                        ) : (
                          <Text>
                            <Text style={style.strikeThrough}>
                              Rs. {itm.item.price}
                            </Text>{' '}
                            Rs. {itm.item.donatedPrice}
                          </Text>
                        )} */}
                      </Text>
                      {/* <View style={style.sellButton}>
                        <Pressable onPress={() => handlePress(itm.item.id)}>
                          <Icon
                            name={
                              itm.item.id1 !== null
                                ? // pressedItems.includes(itm.item.id)
                                  'heart'
                                : 'heart-o'
                            }
                            size={24}
                            color={
                              itm.item.id1 !== null
                                ? // pressedItems.includes(itm.item.id)
                                  'red'
                                : 'black'
                            }
                            style={style.heartIcon}
                          />
                        </Pressable>
                      </View> */}
                    </View>
                  </Pressable>
                </View>
              );
            }}></FlatList>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
}
const style = StyleSheet.create({
  txt: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  sellButton: {
    marginRight: 10,
    marginLeft: 220,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 10,
  },
  img2: {
    width: 80,
    height: 100,

    marginTop: 2,
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

  },
  txt3: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
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
});
