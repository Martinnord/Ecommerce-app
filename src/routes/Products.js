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
import gql from 'graphql-tag';

class Products extends React.Component {
  state = {
    userId: null,
  };

  componentDidMount = async () => {
    this.setState({
      userId: await AsyncStorage.getItem('userId'),
    });
    Font.loadAsync({
      'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    })
  };

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
      name: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        fontWeight: '700',
      },
      description: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: 'grey',
      },
      price: {
        color: 'green',
        fontSize: 14,
        justifyContent: 'flex-start',
      },
      createdAt: {
        fontFamily: 'Lato-Regular',
        justifyContent: 'flex-end',
        color: 'grey',
      },
      row: {
        display: 'flex',
        flexDirection: 'row',
        margin: 5,
      },
      right: {
        marginLeft: 10,
        marginRight: 30,
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 3,
      },
      test: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });

    return (
      <View>
        <Text style={{ marginTop: 50 }}>this is the products page</Text>
        <TouchableOpacity>
          <Text onPress={() => history.push('/create-product')}>
            Create product
          </Text>
        </TouchableOpacity>
        <List>
          <FlatList
            keyExtractor={item => item.id}
            data={productsWithKey}
            renderItem={({ item }) => (
              <ListItem
                subtitle={
                  <View style={styles.row}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `http://localhost:4000/${item.imageUrl}`,
                      }}
                    />
                    <View style={styles.right}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                      <View style={styles.test}>
                        <Text style={styles.price}>{item.price} kr</Text>
                        <Text style={styles.createdAt}>{moment(item.createdAt).format('dddd h:mm')}</Text>
                      </View>
                      {this.state.userId === item.seller.id ? (
                        <View>
                          <Button title="edit" onPress={() => 5} />
                        </View>
                      ) : null}
                    </View>
                  </View>
                }
              />
            )}
          />
        </List>
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
      createdAt
      seller {
        id
        name
      }
    }
  }
`;

export default graphql(productsQuery)(Products);
