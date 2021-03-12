import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./NavBar";
import NewPostForm from "./NewPostForm";
import ViewPost from "./ViewPost";
import HomeList from "./HomeList";

import logo from './logo.svg';
import './App.css';

function App() {

  function navlinks(){
    let navItems = [];
    navItems=[{title:"Blog",link:"/",active:false},{title:"Add a new post",link:"/new",active:false}]
    return navItems
  }

  return (
    <BrowserRouter>
    <NavBar links={navlinks()}/>
      <Switch>
        <Route exact path="/">
          <HomeList />
        </Route>
        <Route exact path="/new">
          <NewPostForm />
        </Route>
        <Route exact path="/:id">
          <ViewPost />
        </Route>
        <Redirect to="/menu" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
