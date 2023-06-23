import {StyleSheet, View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Buy from '../TaNavigation/Buy'
import Home from '../TaNavigation/Home';
import SellBook from '../TaNavigation/Sell';
import MyBooks from '../TaNavigation/Mybooks'
import HomeHeader from '../BookShop/HomeHeader';

export default function MyTabs({route}) {
  const {name,role}=route.params

  return (
    <Tab.Navigator


    
      screenOptions={{

        tabBarLabelStyle: {fontSize: 1, fontWeight: 'bold', color: 'white'},
        tabBarStyle: {
     
          fontSize: 20,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{name:name,role:role}}
        
        options={{
      headerStyle:{
backgroundColor:"#0047AB",
       },
// header: () => <HomeHeader />,
       tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
      
       },

          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../Assests/homeicon.jpeg')}></Image>
            
            );
          },
          tabBarLabel:"Home"
        }}
      />
      <Tab.Screen
        name="Buy"
        component={Buy}
        initialParams={{name:name,role:role}}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../Assests/buyyy.jpeg')}></Image>
            );
          },
          headerShown: false,
          tabBarLabel: 'Buy',
          tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
    },
        }}
      />
      <Tab.Screen
        name="Sell"
        component={SellBook}

        initialParams={{name:name,role:role}}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../Assests/sellicon.jpeg')}></Image>
            );
          },
          tabBarLabel: 'Sell',
          tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
    },
        }}
      />

      <Tab.Screen
        name="MyBooks"
        initialParams={{name:name,role:role}}
        component={MyBooks}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../Assests/mybookss.jpeg')}></Image>
            );
          },
          tabBarLabel: 'My Books',
          tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
    },

        }}
      />
      {/* <Tab.Screen name="Add" component={Needy} /> */}
    </Tab.Navigator>
  );
}

const styl = StyleSheet.create({
  txt: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  viw: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
