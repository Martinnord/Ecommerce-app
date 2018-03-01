import React from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Signup from './Signup';
import Login from './Login';
import Products from './Products';
import CheckToken from './checkToken';

export default () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/checkToken" component={CheckToken} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/" component={Login} />
      <Route exact path="/products" component={Products} />
    </Switch>
  </NativeRouter>
);
