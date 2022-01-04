import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import "./nav.css";
import { Form } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { signout } from "../Authentication/UserActions";
import jwt from "jwt-decode";
import { signinUserSuccess, signoutUser } from "../Authentication/UserReducer"

import CreateNew from '../CreateNew/createnew';
import AboutUs from '../FirstEntry/aboutus';
import Modify from '../Modify/modify';
import Login from '../Login/Login';
import { Navbar as NavBar } from "react-bootstrap";

const Navbar = ({ loggedin, email }) => {
  const dispatch = useDispatch();
  usif(user.exp * 1000 <= dateNow.getTime()) {
        signOut();
      } else {
        dispatch(signinUserSuccess(user.email));
      }
    }
  });
  const signOut = () => {
    dispatch(signout());
  };
    return (
<NavBar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/">
        <NavBar.Brand href="#home">Meeting Minutes</NavBar.Brand>
      </Link>
      <NavBar.Toggle aria-controls="responsive-navbar-nav" />
      <NavBar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/aboutus">
            <Nav.Link href="#features">Details</Nav.Link>
          </Link>
          <Link to="/createnew">
            <Nav.Link href="#features">Create New</Nav.Link>
          </Link>
          <Link to="/modify">
            <Nav.Link href="#features">Modify</Nav.Link>
          </Link>
          Welcome:&nbsp;
          {email}
          <Link to="/" onClick={signOut}>
            <Nav.Link href="#features"> Sign out</Nav.Link>
          </Link>
        </Nav>
      </NavBar.Collapse>
    </NavBar>
          
        )}

        
        
    
    
  
</div> eEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      const user = jwt(token);
      var dateNow = new Date();

      


    );
};

const mapDispatchToProp = {
  signout,
};

const mapStateToProps = (state) => ({
  loggedin: state.users.loggedin,
  email: state.users.email,
});

export default connect(mapStateToProps, mapDispatchToProp)(Navbar);

