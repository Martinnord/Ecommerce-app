import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { JWT_TOKEN } from '../constants';

class CheckToken extends React.Component {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem(JWT_TOKEN);

    if (!token) {
      this.props.history.push('/signup');
      return;
    }

    let response;
    try {
      response = await this.props.mutate();
    } catch (err) {
      this.props.history.push('/signup');
      return;
    }

    const { refreshToken: { token: newToken } } = response.data;
    await AsyncStorage.setItem(JWT_TOKEN, newToken);
    this.props.history.push('/products');
  };

  render() {
    return <Text>...loading</Text>;
  }
}

const refreshTokenMutation = gql`
  mutation {
    refreshToken {
      token
      userId
    }
  }
`;

export default graphql(refreshTokenMutation)(CheckToken);
