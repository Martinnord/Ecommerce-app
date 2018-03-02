import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { ImagePicker } from 'expo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';
import TextField from '../components/TextField';

const defaultState = {
  values: {
    name: '',
    description: '',
    price: '',
    imageUrl: '',
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

class CreateProduct extends React.Component {
  state = defaultState;

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
    const { name, description, price, imageUrl } = this.state.values;
    const image = new ReactNativeFile({
      uri: imageUrl,
      type: 'image/png',
      name: 'i-am-a-name',
    });
    console.log('image', image)
    let response;
    try {
      response = await this.props.mutate({
        variables: {
          name,
          description,
          price,
          image,
        },
      });
    } catch (err) {
      console.log('err happened');
      console.log(err);
      // this.setState({
      //   errors: {
      //     email: 'Already taken',
      //   },
      //   isSubmitting: false,
      // });
      // return;
    }
    console.log('response', response);

    // await AsyncStorage.setItem(TOKEN_KEY, response.data.signup.token);
    // this.setState(defaultState);
    // this.props.history.push('/products');
    this.setState({ isSubmitting: false });
  };

  // redirectToLogin = () => {
  //   this.props.history.push('/login');
  // };

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.onChangeText('imageUrl', result.uri);
    }
  };

  render() {
    const { values: { name, description, imageUrl, price } } = this.state;


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.authWrapper}>
            <Text style={styles.authHeader}>Create Product</Text>
            <View style={styles.lineStyle} />
            <TextField value={name} name="name" onChangeText={this.onChangeText} />
            <TextField
              value={description}
              name="description"
              onChangeText={this.onChangeText}
            />
            <TextField
              value={price}
              name="price"
              onChangeText={this.onChangeText}
            />
            <View>
              <TouchableOpacity style={styles.buttonContainer}>
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 200, height: 200 }}
                  />
                ) : (null) }
                <Text style={styles.buttonText} onPress={this.pickImage}>
                  Select image
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText} onPress={this.submit}>
                Create Product
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const createProductMutation = gql`
  mutation ($name: String!, $description: String!, $price: Float!, $image: Upload!) {
    createProduct(name: $name, description: $description, price: $price, image: $image) {
      id
    }
  }
`;

export default graphql(createProductMutation)(CreateProduct);
