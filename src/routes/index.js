import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Switch, Route, Link } from 'react-router-native';

import Signup from './Signup';
import Login from './Login';
import Products from './Products';

export default () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/products" component={Products} />
    </Switch>
  </NativeRouter>
);
