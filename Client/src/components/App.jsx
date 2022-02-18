import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../components/store/store";

import { Provider } from "react-redux";
import store from "./store/store";

import Navbar from './NavBar/Navbar';
import Signin from './Login/Login';
import Signup from './Register/Register';
import created from './CreateNew/createnew'
import View from './View/view';
import Modify from '../components/Modify/modify';
import About from '../components/FirstEntry/aboutus';
import Forgot from '../components/forgetpassword/forgot';
import Modifyall from '../components/Modify/modifyall'


const App = () => {
    return(
        <Provider store={store}>
        <ConnectedRouter history={history}>
        <Navbar/>
        <Switch>
            <Route path="/" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <Route exact path="/createnew" component={created}/>
            <Route exact path="/view/:id" component={View}/>
            <Route exact path='/modify' component={Modifyall}/>
            <Route exact path="/modify/:id" component={Modify}/>
            <Route exact path ="/aboutus" component ={About}/>
            <Route exact path="/forgot" component={Forgot}/>
            <Redirect from="*" to="/" />  
        </Switch>
        </ConnectedRouter>
        </Provider>
    )
}

export default App;