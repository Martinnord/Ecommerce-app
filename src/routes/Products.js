import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default ({ history }) => (
  <View style={{ 'padding': 50 }}>
    <Text>Products!!!</Text>
    <TouchableOpacity>
      <Text onPress={() => history.push('/create-product')} >Create product</Text>
    </TouchableOpacity>
  </View>
);
