import React, { useState } from 'react';
import { View, Image, TextInput } from 'react-native';

const HomeHeader = () => {
  const [search ,setsearch]=useState()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:"#0047AB"}}>
   
      <TextInput onChange={(v)=>setsearch(v)} placeholder="Search" style={{ flex: 1, marginLeft: 10 }} />
      <Image source={require('../../Assests/search.png')} style={{ width: 30, height: 30 }} />
      <CustomText name={search} />
    </View>
  );
};

export default HomeHeader;
