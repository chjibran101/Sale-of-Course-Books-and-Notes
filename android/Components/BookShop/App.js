import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from '../TaNavigation/MyTabs';

import Details from '../TaNavigation/Details';

import Login from '../BookShop/login';
import AccountSettings from './Accountsettings';
import changepasss from './changepass';
import Reserve from './Reserve';
import chat from './chat';
import ReDetails from './ReserveDetails';
import Notifi from './Notifi';
import Students from './Students';
import Favourites from './Favourites';
import Messages from './Messages';
import courseswishlist from './CoursesWishlist';
import selecttype from './selecttype'

export default function App({route, navigation}) {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}></stack.Screen>
        <stack.Screen
          name="Main"
          component={MyTabs}
          options={{headerShown: false}}></stack.Screen>

        <stack.Screen name="Details" component={Details}></stack.Screen>
        <stack.Screen
          name="Reserve Details"
          component={ReDetails}></stack.Screen>
        <stack.Screen
          name="change Password"
          component={changepasss}></stack.Screen>
        <stack.Screen name="Chat" component={chat}></stack.Screen>
        <stack.Screen
          name="Reservation Requests"
          component={Reserve}></stack.Screen>
        <stack.Screen name="Account" component={AccountSettings}></stack.Screen>
        <stack.Screen name="Notifications" component={Notifi}></stack.Screen>
        <stack.Screen name="Students" component={Students}></stack.Screen>
        <stack.Screen name="Messages" component={Messages}></stack.Screen>
        <stack.Screen name="Favourites" component={Favourites}></stack.Screen>
        <stack.Screen name="CoursesWishlist" component={courseswishlist}></stack.Screen>
        <stack.Screen name="selecttype" component={selecttype}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}
