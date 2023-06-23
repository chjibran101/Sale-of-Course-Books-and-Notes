import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {FlatList} from 'react-native-gesture-handler';

import {useEffect} from 'react';

export default function Home({route, navigation}) {
  const [loading, setLoading] = useState(true);
  const [searchtext, setsearchtext] = useState();
  //filter usestates

  const [type, settype] = useState(false);
  const [condition, setcondition] = useState();

  const [fUsed, setfUsed] = useState();
  const [fNew, setfNew] = useState();

  const [fbbook, setfbbook] = useState(false);
  const [fbnotes, setfbnotes] = useState(false);

  const [ffrom, setfrom] = useState();
  const [fto, setfto] = useState();

  const [fauth, setfauth] = useState();
  const [fctitle, setfctitle] = useState();

  const [rbval, setrbval] = useState();

  const [ct, setct] = useState();
  const [auth, setauth] = useState();
  const [modal, setmodal] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [imageData, setImageData] = useState();
  const [filePath, setFilePath] = useState({});
  const [ccode, setccode] = useState(['CSCP1013']);
  const [shouldFetchBooks, setShouldFetchBooks] = useState(true);
  const [data, setdata] = useState([]);
  const [showbooks, setshowbooks] = useState(true);

  const [isLoading, setisLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cancel, setcancel] = useState(true);
  const [filteredData, setfilteredData] = useState([]);

  const [ctitle, setctitle] = useState([]);

  const searchdata = text => {
    setSearchTerm(text);
  };

  const handleFilterIconPress = () => {
    setcancel(!cancel);
    setSearchTerm('');
  };

  // const [name, setname] = useState([
  //   {
  //     img: require('../../Assests/DSA.jpg'),
  //     data: 'dsa',
  //     condition: 'New',
  //     ccode: 'CS102',
  //     price: '300',
  //     contct: '032*****90',
  //     author: 'Ken',
  //     cond: 'Book',
  //     desc: 'i m selling book Pf book any wants to buy can contact .',
  //   },

  //   {
  //     img: require('../../Assests/DE.jpg'),
  //     data: 'Differential Equation',
  //     condition: 'New',
  //     ccode: 'CS102',
  //     price: '600',
  //     contct: '032*****90',
  //     author: 'Kenneth Leroy Busbee',
  //     cond: 'Book',
  //     desc: 'i m selling book Pf book any wants to buy can contact .',
  //   },
  //   {
  //     img: require('../../Assests/IICT.jpg'),
  //     data: 'IICT',
  //     condition: 'New',
  //     ccode: 'CS102',
  //     price: '410',
  //     contct: '032*****90',
  //     author: 'Kenneth Leroy Busbee',
  //     cond: 'Notes',
  //     desc: 'i m selling book Pf book any wants to buy can contact .',
  //   },
  //   {
  //     img: require('../../Assests/RN.jpg'),
  //     data: 'React native',
  //     condition: 'New',
  //     ccode: 'CS102',
  //     price: '1200',
  //     contct: '032*****90',
  //     author: 'By :Kenneth Leroy Busbee',
  //     cond: 'Notes',
  //     desc: 'i m selling book Pf book any wants to buy can contact .',
  //   },
  //   {
  //     img: require('../../Assests/OOp.jpg'),
  //     data: 'Object Oriented Programming',
  //     condition: 'New',
  //     ccode: 'CS102',
  //     price: '300',
  //     contct: '032*****90',
  //     author: 'By :Kenneth Leroy Busbee',
  //     cond: 'Book',
  //     desc: 'i m selling book Pf book any wants to buy can contact .',
  //   },
  //   {
  //     img: require('../../Assests/OOp.jpg'),
  //     data: 'OOP',
  //     condition: 'New',
  //     ccode: 'CS102',
  //     price: '300',
  //     contct: '032*****90',
  //     author: 'Kenneth Leroy Busbee',
  //     cond: 'Book',
  //     desc: 'i m selling book Pf book any wants to buy can contact .',
  //   },
  //   {
  //     img: require('../../Assests/OOp.jpg'),
  //     data: 'OOP',
  //     condition: 'New',
  //     ccode: 'CS102',
  //     price: '300',
  //     contct: '032*****90',
  //     author: 'Kenneth Leroy Busbee',
  //     cond: 'Notes',
  //     desc: 'i m selling book Pf book any wants to buy can contact .',
  //   },
  // ]);

  const {name, role} = route.params;
  const formData = new FormData();
  formData.append('arid_num', name);
  function getdata() {
    if (shouldFetchBooks) {
      if (role === 'Student') {
        fetch('http://192.168.43.146/API%20Sample/api/Customer/getBooks', {
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
            setfilteredData(data2);
            console.log('Buy Book data is ' + data);
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
            console.log('data is ' + data);
          })
          .catch(error => {
            console.error('Error From Server is ' + error);
          });
      }
    }
    setShouldFetchBooks(false);
    setshowbooks(true);
  }

  useEffect(() => {
    // Simulate loading delay of 10 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    function gettitles() {
      const {name, role} = route.params;

      const formData = new FormData();
      formData.append('arid_num', name);

      const url =
        role === 'Student'
          ? 'http://192.168.43.146/API%20Sample/api/Customer/getCurrentCourses'
          : 'http://192.168.43.146/API%20Sample/api/Customer/getAdminCourses';

      fetch(url, {
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
          console.log('data is' + ctitle);
        })
        .catch(error => {
          console.error('Error From Server is ' + error);
        });
    }

    gettitles();

    // Refresh the function every five seconds
    // const interval = setInterval(gettitles, 5000);

    // // Cleanup the interval on component unmount
    // return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getdata(); // Call the getData function when the screen becomes active
    }, [shouldFetchBooks]),
  );

  function searchbooks() {
    const searchbooks = data.filter(book => book.data === searchtext);
    setdata([...searchbooks]);
  }

  function Apply() {
    setmodal(false);

    if (type && condition && ffrom && fto && fauth && fctitle) {
      // Filter by all eight criteria
      console.log('Filter by all eight criteria');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.course_title === fctitle &&
            book.author === fauth &&
            book.price <= fto &&
            book.type === 'Book' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.course_title === fctitle &&
            book.author === fauth &&
            book.price <= fto &&
            book.type === 'Book' &&
            book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.course_title === fctitle &&
            book.author === fauth &&
            book.price <= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.course_title === fctitle &&
            book.author === fauth &&
            book.price <= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && ffrom && fto && fauth) {
      // Filter by type, condition, price from, price to, and author
      console.log(
        'Filter by type, condition, price from, price to, and author',
      );
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.author === fauth &&
            book.price <= fto &&
            book.type === 'Book' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.author === fauth &&
            book.price <= fto &&
            book.type === 'Book' &&
            book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.author === fauth &&
            book.price <= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.author === fauth &&
            book.price <= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && ffrom && fto && fctitle) {
      // Filter by type, condition, price from, price to, and course title
      console.log(
        ' Filter by type, condition, price from, price to, and course title',
      );
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.price <= fto &&
            book.type === 'Book' &&
            book.condition === 'Used' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.price <= fto &&
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.price <= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'New' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.price <= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'Used' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && ffrom && fto) {
      // Filter by type, condition, price from, and price to
      console.log('Filter by type, condition, price from, and price to');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.price <= fto &&
            book.type === 'Book' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.price <= fto &&
            book.type === 'Book' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.price <= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.price <= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && ffrom && fauth && fctitle) {
      // Filter by type, condition, price from, author, and course title
      console.log(
        'Filter by type, condition, price from, author, and course title',
      );
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Book' &&
            book.condition === 'Used' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Original Notes' &&
            book.condition === 'New' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Original Notes' &&
            book.condition === 'Used' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && ffrom && fauth) {
      // Filter by type, condition, price from, and author
      console.log('Filter by type, condition, price from, and author');
      if (fbbook && condition == 'Used') {
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Book' &&
            book.condition === 'Used' &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
      } else if (fbnotes && condition == 'Used') {
      }
    } else if (type && condition && ffrom && fctitle) {
      // Filter by type, condition, price from, and course title
      console.log('Filter by type, condition, price from, and course title');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Book' &&
            book.condition === 'Used' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Original Notes' &&
            book.condition === 'New' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Original Notes' &&
            book.condition === 'Used' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && ffrom) {
      // Filter by type, condition, and price from
      console.log('Filter by type, condition, and price from');

      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Book' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Book' &&
            book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Original Notes' &&
            book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= ffrom &&
            book.type === 'Original Notes' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && fto && fauth && fctitle) {
      // Filter by type, condition, price to, author, and course title
      console.log(
        'Filter by type, condition, price to, author, and course title',
      );
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Book' &&
            book.condition === 'Used' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'New' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'Used' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && fto && fauth) {
      // Filter by type, condition, price to, and author
      console.log('Filter by type, condition, price to, and author');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Book' &&
            book.condition === 'Used' &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'New' &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'Used' &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && fto && fctitle) {
      // Filter by type, condition, price to, and course title
      console.log('Filter by type, condition, price to, and course title');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Book' &&
            book.condition === 'Used' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'New' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'Used' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && fto) {
      // Filter by type, condition, and price to
      console.log('Filter by type, condition, and price to');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Book' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Book' &&
            book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price >= fto &&
            book.type === 'Original Notes' &&
            book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && fauth && fctitle) {
      // Filter by type, condition, author, and course title
      console.log('Filter by type, condition, author, and course title');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.condition === 'Used' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.condition === 'New' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && fauth) {
      // Filter by type, condition, and author
      console.log('Filter by type, condition, and author');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.condition === 'Used' &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.author === fauth,
        );
        console.log(condition);
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.condition === 'New' &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.condition === 'Used' &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition && fctitle) {
      // Filter by type, condition, and course title
      console.log('Filter by type, condition, and course title');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.condition === 'Used' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.condition === 'New' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.condition === 'New' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.condition === 'Used' &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && condition) {
      // Filter by type and condition
      console.log('Filter by type and condition');
      if (fbbook && condition == 'Used') {
        const filteredBooks = data.filter(
          book => book.type === 'Book' && book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else if (fbbook && condition == 'New') {
        const filteredBooks = data.filter(
          book => book.type === 'Book' && book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'New') {
        const filteredBooks = data.filter(
          book => book.type === 'Original Notes' && book.condition === 'New',
        );
        setfilteredData(filteredBooks);
      } else if (fbnotes && condition == 'Used') {
        const filteredBooks = data.filter(
          book => book.type === 'Original Notes' && book.condition === 'Used',
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && ffrom && fto && fauth && fctitle) {
      // Filter by type, price from, price to, author, and course title
      console.log(
        'Filter by type, price from, price to, author, and course title',
      );
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.price >= ffrom &&
            book.course_title === fctitle &&
            book.price <= fto &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.price >= ffrom &&
            book.course_title === fctitle &&
            book.price <= fto &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && ffrom && fto && fctitle) {
      // Filter by type, price from, price to, and course title
      console.log('Filter by type, price from, price to, and course title');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.price >= ffrom &&
            book.course_title === fctitle &&
            book.price <= fto,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.price >= ffrom &&
            book.course_title === fctitle &&
            book.price <= fto,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && ffrom && fauth) {
      // Filter by type, price from, and author
      console.log('Filter by type, price from, and author');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.price >= ffrom &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.price >= ffrom &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && ffrom && fctitle) {
      // Filter by type, price from, and course title
      console.log('Filter by type, price from, and course title');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.price >= ffrom &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.price >= ffrom &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && ffrom && fto && fauth) {
      // Filter by type, price from, price to, and author
      console.log('Filter by type, price from, price to, and author');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.price >= ffrom &&
            book.price <= fto &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.price >= ffrom &&
            book.price <= fto &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && ffrom && fto) {
      // Filter by type, price from, and price to
      console.log(' Filter by type, price from, and price to');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' && book.price >= ffrom && book.price <= fto,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.price >= ffrom &&
            book.price <= fto,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && ffrom && fauth && fctitle) {
      // Filter by type, price from, author, and course title
      console.log('Filter by type, price from, author, and course title');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.price >= ffrom &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.price >= ffrom &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && ffrom) {
      // Filter by type and price from
      console.log('Filter by type and price from');
      if (fbbook) {
        const filteredBooks = data.filter(
          book => book.type === 'Book' && book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book => book.type === 'Original Notes' && book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && fto && fauth && fctitle) {
      // Filter by type, price to, author, and course title
      console.log('Filter by type, price to, author, and course title');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.price <= fto &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.price <= fto &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && fto && fauth) {
      // Filter by type, price to, and author
      console.log(' Filter by type, price to, and author');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' && book.price <= fto && book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.price <= fto &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && fto && fctitle) {
      // Filter by type, price to, and course title
      console.log('Filter by type, price to, and course title');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.course_title === fctitle &&
            book.type === 'Book',
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.course_title === fctitle &&
            book.type === 'Original Notes',
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && fto) {
      // Filter by type and price to
      console.log('Filter by type and price to');
      if (fbbook) {
        const filteredBooks = data.filter(
          book => book.type === 'Book' && book.price <= fto,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book => book.type === 'Original Notes' && book.price <= fto,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && fauth && fctitle) {
      // Filter by type, author, and course title
      console.log('Filter by type, author, and course title');
      if (fbbook) {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Book' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type && fauth) {
      // Filter by type and author
      console.log('Filter by type and author');
      if (fbbook) {
        const filteredBooks = data.filter(
          book => book.type === 'Book' && book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      } else {
        const filteredBooks = data.filter(
          book => book.type === 'Original Notes' && book.author === fauth,
        );
        setfilteredData(filteredBooks);
        console.log(filteredata);
      }
    } else if (type && fctitle) {
      // Filter by type and course title
      console.log('Filter by type and course title');
      if (fbbook) {
        const filteredBooks = data.filter(
          book => book.type === 'Book' && book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.type === 'Original Notes' && book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (type) {
      // Filter by type only
      console.log('Filter by type only');
      if (fbbook) {
        const filteredBooks = data.filter(book => book.type === 'Book');
        if (filteredBooks.length > 0) {
          setfilteredData(filteredBooks);
        }
      } else {
        const filteredBooks = data.filter(
          book => book.type === 'Original Notes',
        );
        if (filteredBooks.length > 0) {
          setfilteredData(filteredBooks);
        }
      }
    } else if (condition && ffrom && fto && fauth && fctitle) {
      // Filter by condition, price from, price to, author, and course title
      console.log(
        'Filter by condition, price from, price to, author, and course title',
      );
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.course_title === fctitle &&
            book.condition === 'Used' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.course_title === fctitle &&
            book.condition === 'New' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && ffrom && fto && fauth) {
      // Filter by condition, price from, price to, and author
      console.log('Filter by condition, price from, price to, and author');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.author === fauth &&
            book.condition === 'Used' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.author === fauth &&
            book.condition === 'New' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && ffrom && fto && fctitle) {
      // Filter by condition, price from, price to, and course title
      console.log(
        'Filter by condition, price from, price to, and course title',
      );
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.course_title === fctitle &&
            book.condition === 'Used' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.course_title === fctitle &&
            book.condition === 'Used' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && ffrom && fto) {
      // Filter by condition, price from, and price to
      console.log('Filter by condition, price from, and price to');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.condition === 'Used' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.price <= fto &&
            book.condition === 'New' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && ffrom && fauth && fctitle) {
      // Filter by condition, price from, author, and course title
      console.log('Filter by condition, price from, author, and course title');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.course_title === fctitle &&
            book.author === fauth &&
            book.condition === 'Used' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.course_title === fctitle &&
            book.author === fauth &&
            book.condition === 'New' &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && ffrom && fauth) {
      // Filter by condition, price from, and author
      console.log('Filter by condition, price from, and author');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'Used' &&
            book.author === fauth &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'New' &&
            book.author === fauth &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && ffrom && fctitle) {
      // Filter by condition, price from, and course title
      console.log('Filter by condition, price from, and course title');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'New' &&
            book.course_title === fctitle &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'New' &&
            book.course_title === fctitle &&
            book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && ffrom) {
      // Filter by condition and price from
      console.log('Filter by condition and price from');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book => book.condition === 'Used' && book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book => book.condition === 'New' && book.price >= ffrom,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && fto && fauth && fctitle) {
      // Filter by condition, price to, author, and course title
      console.log('Filter by condition, price to, author, and course title');
      console.log('condition is ' + condition);
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'Used' &&
            book.price <= fto &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'New' &&
            book.price <= fto &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && fto && fauth) {
      // Filter by condition, price to, and author
      console.log('Filter by condition, price to, and author');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'Used' &&
            book.price <= fto &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'New' &&
            book.price <= fto &&
            book.author === fauth,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && fto && fctitle) {
      // Filter by condition, price to, and course title
      console.log('Filter by condition, price to, and course title');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'Used' &&
            book.price <= fto &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else {
      }
    } else if (condition && fto) {
      // Filter by condition and price to
      console.log(' Filter by condition and price to');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book => book.condition === 'Used' && book.price <= fto,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book => book.condition === 'New' && book.price <= fto,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && fauth && fctitle) {
      // Filter by condition, author, and course
      console.log('Filter by condition, author, and course');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'Used' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book =>
            book.condition === 'New' &&
            book.author === fauth &&
            book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && fauth) {
      // Filter by condition and author
      console.log('Filter by condition and author');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book => book.condition === 'Used' && book.author === fauth,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book => book.condition === 'New' && book.author === fauth,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition && fctitle) {
      // Filter by condition and course title
      console.log('Filter by condition and course title');
      console.log('');
      if (condition == 'Used') {
        const filteredBooks = data.filter(
          book => book.condition === 'Used' && book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(
          book => book.condition === 'New' && book.course_title === fctitle,
        );
        setfilteredData(filteredBooks);
      }
    } else if (condition) {
      console.log('condition is ' + condition);
      // Filter by condition only
      console.log('Filter by condition only');
      console.log('');
      if (condition === 'Used') {
        const filteredBooks = data.filter(book => book.condition === 'Used');
        setfilteredData(filteredBooks);
      } else {
        const filteredBooks = data.filter(book => book.condition === 'New');
        setfilteredData(filteredBooks);
      }
    } else if (ffrom && fto && fauth && fctitle) {
      // Filter by price from, price to, author, and course title
      console.log('Filter by price from, price to, author, and course title');
      const filteredBooks = data.filter(
        book =>
          book.price >= ffrom &&
          book.price <= fto &&
          book.author === fauth &&
          book.course_title === fctitle,
      );
      setfilteredData(filteredBooks);
    } else if (ffrom && fto && fauth) {
      // Filter by price from, price to, and author
      console.log(' Filter by price from, price to, and author');
      const filteredBooks = data.filter(
        book =>
          book.price >= ffrom && book.price <= fto && book.author === fauth,
      );
      setfilteredData(filteredBooks);
    } else if (ffrom && fto && fctitle) {
      // Filter by price from, price to, and course title
      console.log(' Filter by price from, price to, and course title');
      const filteredBooks = data.filter(
        book =>
          book.price >= ffrom &&
          book.price <= fto &&
          book.course_title === fctitle,
      );
      setfilteredData(filteredBooks);
    } else if (ffrom && fto) {
      // Filter by price from and price to
      console.log('Filter by price from and price to');
      const filteredBooks = data.filter(
        book => book.price >= ffrom && book.price <= fto,
      );
      setfilteredData(filteredBooks);
    } else if (ffrom && fauth && fctitle) {
      // Filter by price from, author, and course title
      console.log('Filter by price from, author, and course title');
      const filteredBooks = data.filter(
        book =>
          book.price >= ffrom &&
          book.author === fauth &&
          book.course_title === fctitle,
      );
      setfilteredData(filteredBooks);
    } else if (ffrom && fauth) {
      // Filter by price from and author
      console.log('Filter by price from and author');
      const filteredBooks = data.filter(
        book => book.price >= ffrom && book.author === fauth,
      );
      setfilteredData(filteredBooks);
    } else if (ffrom && fctitle) {
      // Filter by price from and course title
      console.log('Filter by price from and course title');
      const filteredBooks = data.filter(
        book => book.price >= ffrom && book.course_title === fctitle,
      );
      setfilteredData(filteredBooks);
      console.log(data);
    } else if (ffrom) {
      // Filter by price from only
      console.log(' Filter by price from only' + ffrom);
      const filteredBooks = data.filter(book => book.price >ffrom);
      setfilteredData(filteredBooks);
      console.log('Filter books by price ' + filteredBooks);
    } else if (fto && fauth && fctitle) {
      // Filter by price to, author, and course title
      console.log('Filter by price to, author, and course title');
      const filteredBooks = data.filter(
        book =>
          book.price >= ffrom &&
          book.course_title === fctitle &&
          book.author === fauth,
      );
      setfilteredData(filteredBooks);
    } else if (fto && fauth) {
      // Filter by price to and author
      console.log('Filter by price to and author');
      const filteredBooks = data.filter(
        book => book.price <= fto && book.author === fauth,
      );
      setfilteredData(filteredBooks);
    } else if (fto && fctitle) {
      // Filter by price to and course title
      console.log('Filter by price to and course title');
      const filteredBooks = data.filter(
        book => book.price >= fto && book.course_title === fctitle,
      );
      setfilteredData(filteredBooks);
    } else if (fto) {
      // Filter by price to only
      console.log(' Filter by price to only');
      const filteredBooks = data.filter(book => book.price <= fto);
      setfilteredData(filteredBooks);
    } else if (fauth && fctitle) {
      // Filter by author and course title
      console.log('Filter by author and course title');
      const filteredBooks = data.filter(
        book => book.course_title === fctitle && book.author === fauth,
      );
      setfilteredData(filteredBooks);
      console.log('');
    } else if (fauth) {
      // Filter by author only
      console.log(' Filter by author only');
      const filteredBooks = data.filter(book => book.author === fauth);
      setfilteredData(filteredBooks);
    } else if (fctitle) {
      // Filter by course title only
      console.log('Filter by course title only');
      const filteredBooks = data.filter(book => book.course_title === fctitle);
      setfilteredData(filteredBooks);
    } else {
      // No filters selected
      console.log('No filters selected');
    }

    setshowbooks(false);
    setcondition(false);
    settype(false);
    setfauth(false);
    setfrom(false);
    setfbbook(false);
    setfbnotes(false);
    setfNew(false);
    setfUsed(false);
    setfto(false);
    setfctitle(false);
  }

  function senddata(data, price, ccode, desc, contct, author, cond) {
    console.log('hello');

    navigation.navigate('Details', {
      data,
      price,
      ccode,
      desc,
      contct,
      author,
      cond,
    });
  }

  function chkmodal() {
    setmodal(true);
  }

  function search(text) {
    if (text === '') {
      // if search term is empty, display all data
      setdata(data);
      setshowbooks(true);
    } else {
      setshowbooks(false);
      setSearchTerm(text);
      console.log(text);
      const filteredBooks = data.filter(
        student => student.title.toLowerCase().startsWith(text.toLowerCase()),
        // student => student.Reg_No.toLowerCase() === searchTerm.toLowerCase()
      );
      setfilteredData(filteredBooks);
    }
  }

  return (
    <View style={{backgroundColor: 'White'}}>
      <Modal visible={modal}>
        <View style={styles.modalBackground}>
          <Text style={styles.title}>Filter Panel</Text>

          <Text style={styles.label}>Category</Text>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Books</Text>
            <CheckBox
              value={fbbook}
              onValueChange={() => {
                settype(true);
                setfbbook(!fbbook);
              }}
              style={styles.checkbox}
            />

            <Text style={styles.checkboxLabel}> Notes</Text>
            <CheckBox
              value={fbnotes}
              onValueChange={() => {
                settype(true);
                setfbnotes(!fbnotes);
              }}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>Copy Notes</Text>
            <CheckBox
         
              style={styles.checkbox}
            />
          </View>

          <Text style={styles.label}>Condition</Text>
          <View style={styles.radioContainer}>
            {/* <RadioButton.Group
              onValueChange={val => setcondition(val)}
              value={condition}>
              <RadioButton.Item label="New" value="New"></RadioButton.Item>
              <RadioButton.Item label="Used" value="Used"></RadioButton.Item>
            </RadioButton.Group> */}
            <Picker
            selectedValue={fctitle}
            onValueChange={v => setfctitle(v)}
            style={styles.picker}>
            <Picker.Item label="Select course title" value="o" />
        
              <Picker.Item label={"10/10"} value={"10/10"} />
              <Picker.Item  label={"9/10"} value={"9/10"} />
              <Picker.Item  label={"8/10"} value={"8/10"} />
              <Picker.Item  label={"7/10"} value={"7/10"} />
              <Picker.Item  label={"6/10"} value={"6/10"} />
              <Picker.Item  label={"5/10"} value={"5/10"} />
          </Picker>
          </View>

          <Text style={styles.label}>Price</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <TextInput
              onChangeText={v => setfrom(v)}
              style={styles.priceInput}
            />
            <Text style={styles.priceLabel}>To</Text>
            <TextInput
              onChangeText={v => setfto(v)}
              style={styles.priceInput}
            />
          </View>

          <Picker
            selectedValue={fctitle}
            onValueChange={v => setfctitle(v)}
            style={styles.picker}>
            <Picker.Item label="Select course title" value=" o" />
            {/* Add the first item */}
            {ctitle.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>

          <TextInput
            placeholder="Author Name"
            onChangeText={v => setfauth(v)}
            style={{backgroundColor: 'white', borderWidth: 0.8}}></TextInput>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                setmodal(false);
                setShouldFetchBooks(true);
              }}
              style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={Apply} style={styles.applyButton}>
              <Text style={styles.buttonText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: '#0047AB',
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 40,
            height: 30,
            marginRight: 10,
            marginLeft: -20,
            marginTop: 10,
          }}
          source={require('../../Assests/mic.png')}
        />
        {/* <View style={{ flex: 1, borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
    <Image style={{ width: 25, height: 25, marginLeft: 10 }} source={require('../../Assests/search.png')} />
    <TextInput 
      style={{ backgroundColor: '#0047AB', flexDirection: 'row',alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0 ,color:"white",fontSize:15,textAlign:'center'}} 
      placeholder="Search Book"

      placeholderTextColor="white"
      onChangeText={(v)=>setsearchtext(v)} />
  </View> */}
        <Pressable onPress={chkmodal}>
          {/* <Image
            style={{width: 40, height: 40, marginLeft: 230,marginTop:10}}
            source={require('../../Assests/chitta.jpeg')}
          /> */}
        </Pressable>
        {!cancel && (
          <View style={styles.searchBar}>
            <Icon name="search" size={20} style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor="#888"
              onChangeText={text => search(text)}
            />
            <Pressable
              style={{
                marginRight: 60,
                position: 'absolute',
                left: 230,
                padding: 10,
              }}
              onPress={() => {
                setcancel(true);
                setshowbooks(true);
                setdata(data);
              }}>
              <Icon name="close" size={30} color="#888" />
            </Pressable>
            <Pressable onPress={chkmodal}>
              <Image
                style={{width: 40, height: 40, marginTop: 5}}
                source={require('../../Assests/chitta.jpeg')}
              />
            </Pressable>
          </View>
        )}
        {/* <Pressable >
          <Icon   style={{width: 40, height: 40, marginLeft: 230,marginTop:10}} name="filter" size={50} color="white" />
          </Pressable> */}

        {cancel && (
          <Pressable onPress={() => setcancel(false)}>
            <Image
              style={{width: 35, height: 35, marginLeft: 290, marginTop: 10}}
              source={require('../../Assests/search.png')}
            />
          </Pressable>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View
          style={{
            marginTop: 30,
            marginBottom: 140,
          }}>
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
            // data={data}
            renderItem={itm => {
              return (
                <View>
                  <Pressable
                    style={styles.btn}
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
                        // buyer: un,
                        seller: itm.item.sale_regNo,
                        balance: itm.item.balance,
                      });
                    }}>
                    {/* <Image style={style.img} source={itm.item.img}></Image> */}
                    <Image
                      key={itm.id}
                      source={{
                        uri:
                          'http://192.168.43.146/API Sample/content/images/' +
                          itm.item.image,
                      }}
                      style={styles.img}
                    />
                    <View style={{marginTop: 20}}>
                      <Text style={styles.txt2}>{itm.item.title}</Text>

                      <Text style={styles.txt2}>By {itm.item.author}</Text>
                      <Text style={styles.txt2}>{itm.item.type}</Text>
                      <Text style={styles.txt2}>Rs. {itm.item.price}</Text>
                    </View>
                  </Pressable>
                </View>
              );
            }}></FlatList>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  img: {width: 120, height: 120, borderRadius: 8, marginTop: 15},
  btn: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#D3D3D3',
    padding: 1,
  },
  cancelIcon: {
    width: 40,
    height: 40,
  },
  trending: {
    width: 120,
    marginTop: 20,

    backgroundColor: '#D3D3D3',
    marginRight: 10,

    alignItems: 'center',
  },
  btn2: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  modalBackground: {
    marginTop: 200,

    alignItems: 'center',
    justifyContent: 'center',
  },
  tcode: {
    borderColor: 'black',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4,
    height: 40,
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: 'white',
    width: 80,
  },
  modalBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  checkbox: {
    alignSelf: 'center',
  },
  txt2: {
    fontSize: 16,
    marginLeft: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  radioContainer: {},
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    marginRight: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  applyButton: {
    backgroundColor: '#0047AB',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#0047AB',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginHorizontal: 10,
    marginTop: 20,
    marginRight: 20,
    paddingHorizontal: 10,

    justifyContent: 'space-between',
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
