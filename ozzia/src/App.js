import React from 'react';
// import Navbar from './components/layout/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import intro from './components/dashboard/intro';
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Profile from './components/profile/profile';
import UserProfile from './components/profile/UserProfile';
import Home from './components/dashboard/home';
import SpecificPost from './components/dashboard/SpecificPost';
import Subbed from './components/dashboard/Subbed';
import SelectiveHome from './components/dashboard/SelectiveHome';
import CreatePost from './components/profile/CreatePost';

function App() {
  return (
      <BrowserRouter>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component = { intro } />
          <Route path="/signup" component = { Signup } />
          <Route path="/login" component = { Login } />
          <Route path="/profile/:id" component = { UserProfile } />
          <Route path="/profile" component = { Profile } />
          <Route path="/home/:tag" component = { SelectiveHome } />
          <Route path="/subbed" component = { Subbed } />
          <Route path="/post/:id" component = { SpecificPost } />
          <Route path="/home" component = { Home } />
          <Route path="/create" component = { CreatePost } />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
