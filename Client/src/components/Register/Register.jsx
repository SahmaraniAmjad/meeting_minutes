import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { signup } from "../Authentication/UserActions";

//import './all.css';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Continue from '../Login/Login';
import Cancel from '../Login/Login';
import './register.css';
import { configureStore } from '@reduxjs/toolkit';
import store from '../store/store';
 


const SignupView = ({ signup }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = (data) => {
    signup(data); 
  };
  return (
    <div>
<form class="container  border rounded " onSubmit={handleSubmit(onSubmit)}>
<div class="ui aligned basic segment">
<div class="column">
<div class="ui form">
    <div class="six wide field">
          <input 
          type="text" 
          placeholder="Enter Name" 
          name="name" 
          ref={register({ required: true })}
          />
          {errors.name && <span className="span">Name is required</span>}
      </div>

      <div class="six wide field">
          <input type="text" 
          placeholder="example@gmail.com" 
          name="email" 
          ref={register({ required: true})}
          />
          {errors.email && <span>Email is required</span>}

      </div>
      <div class="six wide field">
          <input 
          type="password" 
          placeholder="Enter Password" 
          name="password"
          ref={register({ required: true})}  
          />
          { errors.password && <span>Password is required</span>}
      </div>
      <div class="six wide field">
          <input 
          type="password" 
          placeholder="Repeat Password" 
          name="confirmPassword"
          ref={register({
            required: true,
            validate: (value) => 
            value === password.current || "The passwords do not match",
          })} 
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
      </div>

      <div class="six wide field">

        <p>By clicking Sign Up, you agree to our <a href="#">Terms</a>. Learn how we collect, use and share your data in our <a href="#">Data Policy</a> and how we use cookies and similar technology in our <a href="#">Cookies Policy</a>. You may receive SMS Notifications from us and can opt out any time.</p>

    </div>

   
    <div class="ui buttons">
    
  <button class="ui inverted primary button" variant="primary" type="submit">Continue</button>
  <div class="or"></div>
  <Link to ="/">
  <button class="ui inverted secondary button">Cancel</button>
  </Link>

  </div>
</div>
    
</div>
</div>

</form>
    </div>
    

  );
  
};

const mapDispatchToProp = {
  signup,
};

export default connect(null, mapDispatchToProp)(SignupView);

