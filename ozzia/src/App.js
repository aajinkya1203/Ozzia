import React from 'react';
// import Navbar from './components/layout/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import intro from './components/dashboard/intro';
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Profile from './components/profile/profile';
import Home from './components/dashboard/home';
import CreatePost from './components/profile/CreatePost';

function App() {
  return (
      <BrowserRouter>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component = { intro } />
          <Route path="/signup" component = { Signup } />
          <Route path="/login" component = { Login } />
          <Route path="/profile" component = { Profile } />
          <Route path="/home" component = { Home } />
          <Route path="/create" component = { CreatePost } />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
