import { push } from 'connected-react-router';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import {Nav, NavDropdown, Form, FormControl, Button, Row, Col} from "react-bootstrap";

import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
//import { SuccessAlert } from '../components/Alerts'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { created } from './MeetingActions';
import Axios from 'axios';
import { API } from "../configs";
import { history } from "../store/store";




const Create = () => {
  const Swal = require('sweetalert2');
  let history = useHistory();
  const [meeting , setMeeting] = useState({
    name: "",
    creation_date: "",
    start_time: "",
    end_time: "",
    status: "",
    agenda: "",
    next_things: ""
});

const { name, creation_date, start_time, end_time, status, agenda, next_things} = meeting;

const onInputChange = e => {
  setMeeting({ ...meeting, [e.target.name]: e.target.value });
};

const onSubmit = async e => {
  e.preventDefault();
  if( name == '' || creation_date == '' || start_time == '' || end_time == '' || status == '' || agenda == '' || next_things == '' ){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'All Fields are required',
      showConfirmButton: false,
      timer: 1500
    })

  } else {
    await axios.post("http://localhost:8081/createnew", meeting);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Your Meeting is saved',
      showConfirmButton: false,
      timer: 1500
    })
    history.push("/aboutus");
  }
  
}

  const getMeetings = () => {
    const apiUrl = `${API}/meetings`
  Axios.get(apiUrl).then((response) => {
    setMeeting(response.data);
    //history.push('/aboutus');
      //return < Redirect to="aboutus" />
    
  });

  }

        return(
            <div>
            <br/><br/><br/>

<form class="container border rounded " onSubmit={e => onSubmit(e)}>
  <fieldset>
    <legend>Fill Meeting Details</legend>
    <br />
    
    <Form></Form>
    
    <Form.Row>
        <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Team Lead</Form.Label>  
            <Form.Control type="text" name='name' onChange={e => onInputChange(e)} value={name} />   
        </Form.Group>
    </Form.Row>

    <Form.Row>

        <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Date</Form.Label>  
            <Form.Control type="date" name='creation_date' onChange={e => onInputChange(e)} value={creation_date} />   
        </Form.Group>

        <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>Start Time</Form.Label>  
            <Form.Control type="time" name="start_time" value={start_time} onChange={e => onInputChange(e)} />   
        </Form.Group>

        <Form.Group as={Col} controlId="formBasicEmail">
            <Form.Label>End Time</Form.Label>  
            <Form.Control type="time" name="end_time" value={end_time} onChange={e => onInputChange(e)} />   
        </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridStatus">
            <Form.Label>Status Until Now</Form.Label> 
            <Form.Control  name="status" value={status} onChange={e => onInputChange(e)} rows="5" />    
        </Form.Group> 

        <Form.Group controlId="formGridNext">
        <Form.Label>Agenda</Form.Label>
        <Form.Control  name="agenda" value={agenda} onChange={e => onInputChange(e)} rows="5"/>
    </Form.Group>  

    <Form.Group controlId="formGridNext">
        <Form.Label>What Next</Form.Label>
        <Form.Control   name="next_things" value={next_things} onChange={e => onInputChange(e)} rows="5"/>
    </Form.Group>  
   <br/>
  <Button type="submit" variant="outline-primary">Submit</Button>
<br />
<br/>
</fieldset>
</form>
<br />
            </div>
      );
}

export default Create;