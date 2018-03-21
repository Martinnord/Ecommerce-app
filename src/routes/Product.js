import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { Font } from 'expo';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment';
import { graphql } from 'react-apollo';
import { JWT_TOKEN } from '../constants';
import jwtDecode from 'jwt-decode';
import gql from 'graphql-tag';

class Product extends React.Component {
  // state = {
  //   userId: null,
  // };

  componentDidMount = async () => {
    // const token = await AsyncStorage.getItem(JWT_TOKEN);
    // const userId = jwtDecode(token);
    // this.setState({
    //   userId,
    // });
    // Font.loadAsync({
    //   'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    // })
  };

  render() {
    console.log(this.props.data)
    console.log(this.props.match.params.id)
    // const { data: { product }, loading } = this.props;
    // if (loading || !product) {
    //   return null;
    // }

    return (
      <View>
        <Text>{JSON.stringify(this.props.data)}</Text>
      </View>
    );
  }
}
export const productQuery = gql`
  query($id: ID!){
    product(id: $id) {
      id
      name
      description
      price
      imageUrl
      createdAt
      seller {
        id
        name
      }
    }
  }
`;

export default graphql(productQuery, {
  skip: props => !props.match.params.id,
  options: props => ({
    variables: { id: props.match.params.id },
  }),
})(Product);
