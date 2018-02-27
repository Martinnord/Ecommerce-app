import React from 'react';
import { AsyncStorage, View, Text, Button } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '../components/TextField';

const defaultState = {
  values: {
    name: '',
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

class Signup extends React.Component {
  state = {
    values: {
      name: '',
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
    let response;
    try {
      response = await this.props.mutate({
        variables: this.state.values
      });
    } catch (err) {
      this.setState({
        errors: {
          email: 'Email is already taken',
        },
        isSubmitting: false,
      });
      return;
    }

    await AsyncStorage.setItem('@ecommerce/token', response.data.signup.token);
    this.setState(defaultState);
    this.props.history.push('/products');
  };

  redirectToLogin = () => {
    this.props.history.push('/login');
  };

  render() {
    const { errors, values: { name, email, password } } = this.state;

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
          <TextField
            value={name}
            name="name"
            onChangeText={this.onChangeText}
          />
          {errors.email && <Text>{errors.email}</Text>}
          <TextField
            value={email}
            name="email"
            onChangeText={this.onChangeText}
          />
          <TextField
            value={password}
            name="password"
            onChangeText={this.onChangeText}
            secureTextEntry
          />
          <Button title="Signup" onPress={this.submit} />
          <Text>Already have an account?</Text>
          <Button title="Login" onPress={this.redirectToLogin} />
        </View>
      </View>
    );
  }
}

const signupMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default graphql(signupMutation)(Signup);
