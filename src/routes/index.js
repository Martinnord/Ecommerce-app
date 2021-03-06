import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Signup from './Signup';
import Login from './Login';
import Products from './Products';
import Product from './Product';
import CheckToken from './checkToken';
import CreateProduct from './CreateProduct';

export default () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={CheckToken} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/product/:id" component={Product} />
      <Route exact path="/create-product" component={CreateProduct} />
    </Switch>
  </NativeRouter>
);
