import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./NavBar";
import ShoppingMenu from "./ShoppingMenu";
import ShoppingCart from "./ShoppingCart";
import ProductDetails from "./ProductDetails";

import logo from './logo.svg';
import './App.css';

function App() {

  function navlinks(){
    let navItems = [];
    navItems=[{title:"Products",link:"/menu",active:false},{title:"Cart",link:"/cart",active:false}]
    return navItems
  }

  return (
    <BrowserRouter>
    <NavBar links={navlinks()}/>
      <Switch>
        <Route exact path="/">

        </Route>
        <Route exact path="/new">

        </Route>
        <Route exact path="/:id">

        </Route>
        <Redirect to="/menu" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
