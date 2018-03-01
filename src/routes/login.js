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
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

// TODO: Add all this crap to a CSS file
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

    const { payload, error } = response.data.login;

    if (payload) {
      await AsyncStorage.setItem(JWT_TOKEN, payload.token);
      this.setState(defaultState);
      this.props.history.push('/products');
    } else {
      this.setState({
        errors: {
          [error.field]: error.message,
        },
        isSubmitting: false,
      });
    }
  };

  redirectToSignup = () => {
    this.props.history.push('/signup');
  };

  render() {
    const { errors, values: { email, password } } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.authWrapper}>
            <Text style={styles.authHeader}>Login</Text>
            <View style={styles.lineStyle} />
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
                Login
              </Text>
            </TouchableOpacity>
            <Text style={styles.authText}>Don't have an account?</Text>
            <Text
              style={styles.authRedirect}
              title="Signup"
              onPress={this.redirectToSignup}
            >
              Signup!
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
