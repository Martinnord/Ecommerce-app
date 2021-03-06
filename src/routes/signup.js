import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '../components/TextField';
import { JWT_TOKEN } from '../constants';

const defaultState = {
  values: {
    name: '',
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authWrapper: {
    backgroundColor: '#FFFFFF',
    width: 330,
    padding: 40,
    borderRadius: 5,
  },
  authHeader: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    paddingBottom: 15,
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#F0F3F7',
    marginBottom: 15,
  },
  buttonContainer: {
    backgroundColor: '#66AAE2',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  authText: {
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: '600',
  },
  authRedirect: {
    textAlign: 'center',
    color: '#4A90E2',
    paddingTop: 15,
    fontWeight: '600',
  },
});

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
        // i.e. password: value is the same thing as [key] :value
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
        variables: this.state.values,
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

    await AsyncStorage.setItem(JWT_TOKEN, response.data.signup.token);
    this.setState(defaultState);
    this.props.history.push('/products');
  };

  redirectToLogin = () => {
    this.props.history.push('/login');
  };

  render() {
    const { errors, values: { name, email, password } } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.authWrapper}>
            <Text style={styles.authHeader}>Signup</Text>
            <View style={styles.lineStyle} />
            <TextField
              value={name}
              name="name"
              onChangeText={this.onChangeText}
            />
            {errors.email && <Text>{errors.email}</Text>}
            <TextField
              value={email}
              name="email"
              returnKeyType="next"
              keyboardType="email-address"
              onChangeText={this.onChangeText}
            />
            {errors.password && <Text>{errors.password}</Text>}
            <TextField
              value={password}
              name="password"
              returnKeyType="go"
              onChangeText={this.onChangeText}
              secureTextEntry
            />
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText} onPress={this.submit}>
                Signup
              </Text>
            </TouchableOpacity>
            <Text style={styles.authText}>Already have an account?</Text>
            <Text
              style={styles.authRedirect}
              title="Signup"
              onPress={this.redirectToSignup}
            >
              Login!
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
