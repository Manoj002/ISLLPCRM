import React, { Component } from 'react';
//Provider binds react and redux
import { Provider } from 'react-redux';
//createStore creates a store which contains the reducer and state
//to enable Redux Thunk, use applyMiddleware()
import { createStore, applyMiddleware, compose } from 'redux'
//ReduxThunk is a middleware
import thunk from 'redux-thunk';
import reducers from './src/reducers/Index';
import LoginForm from './src/components/LoginForm';
import Router from './src/Router';

export default class App extends React.Component {

  render() {

    const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
      //the empty object in store is used for so that if we want we can pass any initial state to redux application
      return(
        <Provider store={store}>
          <Router />
        </Provider>
      )
    }
}