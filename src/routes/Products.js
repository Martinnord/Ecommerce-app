import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Products extends React.Component {
  state = {
    userId: null
  }

  componentDidMount = async () => {
    this.setState({
      userId: await AsyncStorage.getItem('userId'),
    });
  }

  render() {
    const { data: { products }, loading, history } = this.props;
    if (loading || !products) {
      return null;
    }

    const productsWithKey = products.map(p => ({
      ...p,
      key: p.id,
    }));

    const styles = StyleSheet.create({
      image: {},
    });

    return (
      <View>
        <Text style={{ marginTop: 50 }}>this is the products page</Text>
        <TouchableOpacity>
          <Text onPress={() => history.push('/create-product')}>
            Create product
          </Text>
        </TouchableOpacity>
        <FlatList
          keyExtractor={item => item.id}
          data={productsWithKey}
          renderItem={({ item }) => (
            <View>
              <Image
                style={{ height: 100, width: 100 }}
                source={{ uri: `http://localhost:4000/${item.imageUrl}` }}
              />
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text>{item.seller.name}</Text>
              {this.state.userId === item.seller.id ? (
                <View>
                  <Button title="edit" onPress={() => 5} />
                </View>
              ) : null}
            </View>
          )}
        />
      </View>
    );
  }
}
export const productsQuery = gql`
  {
    products {
      id
      name
      description
      price
      imageUrl
      seller {
        id
        name
      }
    }
  }
`;

export default graphql(productsQuery)(Products);
