import React from 'react'
import {NavigationContainer} from '@react-navigation/native';

import {View, Text} from 'react-native';

import MyTabs from '../TabNavigation';
const Main = () => {
  return (
    <NavigationContainer>
      <MyTabs></MyTabs>
    </NavigationContainer>
  )
}

export default Main
