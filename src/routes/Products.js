import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Products = ({ data: { products }, loading, history }) => {
  if (loading || !products) {
    return null;
  }

  const productsWithKey = products.map(p => ({
    ...p,
    key: p.id,
  }));

  return (
    <View>
      <Text style={{ marginTop: 50 }}>this is the products page</Text>
      <TouchableOpacity>
        <Text onPress={() => history.push('/create-product')}>
          Create product
        </Text>
      </TouchableOpacity>
      <FlatList
        data={productsWithKey}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <Text>{item.seller.name}</Text>
            <Image
              style={{ height: 100, width: 100 }}
              source={{ uri: `http://localhost:4000/${item.imageUrl}` }}
            />
          </View>
        )}
      />
    </View>
  );
};

const productsQuery = gql`
  {
    products {
      id
      name
      description
      price
      imageUrl
      seller {
        name
      }
    }
  }
`;

export default graphql(productsQuery)(Products);
