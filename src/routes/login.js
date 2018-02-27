import React from 'react';
import { AsyncStorage, View, Text, Button } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '../components/TextField';

const defaultState = {
  values: {
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

class Login extends React.Component {
  state = {
    values: {
      email: '',
      password: '',
    },
    errors: {},
    isSubmitting: false,
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });
    const response = await this.props.mutate({
      variables: this.state.values,
    });

    const { payload, error } = response.data.login;}

    if (payload) {
      await AsyncStorage.setItem('@ecommerce/token', payload.token);
      this.setState(defaultState);
      this.props.history.push('/products');
    } else {
      this.setState({
        errors: {
          [error.field]: error.message
        },
        isSubmitting: false
      });
    }
  };

  redirectToSignup = () => {
    this.props.history.push('/signup');
  };

  render() {
    const { errors, values: { email, password } } = this.state;

    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ width: 200 }}>
          {errors.email && <Text>{errors.email}</Text>}
          <TextField
            value={email}
            name="email"
            onChangeText={this.onChangeText}
          />
          {errors.password && <Text>{errors.password}</Text>}
          <TextField
            value={password}
            name="password"
            onChangeText={this.onChangeText}
            secureTextEntry
          />
          <Button title="Login" onPress={this.submit} />
          <Text>Don't have an account?</Text>
          <Button title="Signup" onPress={this.redirectToSignup} />
        </View>
      </View>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload {
        token
      }
      error {
        field
        message
      }
    }
  }
`;

export default graphql(loginMutation)(Login);
