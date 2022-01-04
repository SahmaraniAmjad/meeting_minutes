import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import Register from '../Register/Register';
import CreateNew from '../CreateNew/createnew';
import AboutUs from '../AboutUs/aboutus';
import { Button } from 'react-bootstrap';

const ForgotPassword = ()=>{
  return (
    
    <div >
        <form action="/action_page.php" method="post" >
            
        <div class="ui placeholder segment">
  <div class="ui center aligned basic segment">
    <div class="column">
      <div class="ui form">
        <div class="required field">
          <div class="ui left icon input">
            <input type="text" placeholder="Username" required></input>
            <i class="user icon "></i>
          </div>
        </div>
        <div class="required field">
          <div class="ui left icon input">
            <input type="text" placeholder="RepeatUsername" required></input>
            <i class="user icon "></i>
          </div>
        </div>
        
        <Link to="/">
        <div type="submit" class="ui inverted primary button">Done</div>
        </Link>
       
      </div>
      
    </div>
    
  </div>
</div>
</form>
 </div>
  )
}


export default ForgotPassword
