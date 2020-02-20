import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch  , Route } from 'react-router-dom';
import Home from './components/Home'
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/footer";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import ConfirmEmail from "./components/ConfirmEmail";

function App()  {
      return (
          <div className="App">
              <Router>
                  <Switch>
                      <Route path ="/" exact component={Home} />
                      <Route path="/login" exact component={Login}/>
                      <Route path="/signup" component={Signup}/>
                      <Route path="/login/recover" exact component={ForgetPassword}/>
                      <Route path="/login/recover/token"  component={ConfirmEmail}/>
                      <Route path="/login/reset"  component={ResetPassword}/>
                  </Switch>
              </Router>
              <Footer/>
          </div>
      );

}

export default App;
