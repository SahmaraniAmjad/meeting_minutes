import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { signin } from "../Authentication/UserActions";

import CreateNew from '../CreateNew/createnew';
import AboutUs from '../FirstEntry/aboutus';
import { Button } from 'react-bootstrap';
import './login.css';

const SigninView = ({ signin }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    signin(data);
  };
  
  return (  
    <div >
        <form  onSubmit={handleSubmit(onSubmit)}>
    
        <div class="ui placeholder segment">
  <div class="ui center aligned basic segment">
    <div class="column">
      <div class="ui form">
        <div class="required field">
          <div class="ui left icon input">
            <input 
            type="email" 
            placeholder="Email" 
            name="email"
            ref={register({ required: true })}>
            </input>
            <i class="user icon "></i>
            
          </div>
          <div>{errors.email && <span>Email is required</span>}</div>

        </div>
        <div class="required field">
          <div class="ui left icon input">
            <input
             type="password" 
             placeholder="Password" 
             name="password"
             ref={register({ required: true })}></input>
            <i class="lock icon"></i>
          </div>
          {errors.password && <span>Password is required</span>}
          <div class="inline field">
      <div class="ui checkbox">
        <input type="checkbox" tabindex="0"></input>
        <label className="chk">Remember me</label>
      </div>
    </div>
        
        </div>
      
        <div>
         <button variant="primary" type="submit" class="ui inverted primary button">Login</button>
         </div>
        <span class="psw"><a href="#">Forgot password?</a></span>
      </div>
      
    </div>
    
  <div class="ui horizontal divider">
    Or
  </div>

  <div class="middle aligned column">
    <Link to="/signup">
      <div class="ui big button inverted secondary button ">
        <i class="signup icon"></i>
        Sign Up
      </div>
    </Link>
    </div>
  </div>
</div>
</form>
 </div>
  )
}


const mapDispatchToProp = {
  signin,
}

export default connect(null, mapDispatchToProp)(SigninView);
