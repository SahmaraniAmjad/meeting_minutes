import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../components/store/store";

import { Provider } from "react-redux";
import store from "./store/store";

import Navbar from "./NavBar/Navbar";
import Signin from "./Login/Login";
import Signup from "./Register/Register";
import CreateNew from "./CreateNew/createnew";
import View from "./View/view";
import Modify from "../components/Modify/modify";
import AboutUs from "../components/FirstEntry/aboutus";
import ForgotPassword from "../components/ForgotPassword/forgot";

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/forgot" exact component={ForgotPassword} />
          <Route exact path="/createnew" component={CreateNew} />
          <Route exact path="/view" component={View} />
          <Route exact path="/modify" component={Modify} />
          <Route exact path="/aboutus" components={AboutUs} />

          <Redirect from="*" to="/" />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
