import  React from 'react';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import Axios from 'axios';
import { API } from "../configs";
import Swal from 'sweetalert2';
import {Nav, NavDropdown, Form, FormControl, Button, Row, Col} from "react-bootstrap";




 export default class Modify extends React.Component  {
   Swal = require('sweetalert2');

  constructor(props) {
    super(props);
    this.state = {
      team_lead: '',
      creation_date: '',
      start_time: '',
      end_time: '',
      status: '',
      agenda: '',
      next_things: '',
      redirect: false
    }
    this.onChangeTeamLead = this.onChangeTeamLead.bind(this);
    this.onChangeCreationDate = this.onChangeCreationDate.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeAgenda = this.onChangeAgenda.bind(this);
    this.onChangeNextThings = this.onChangeNextThings.bind(this);

  }

 

  componentDidMount(){
    axios.get(`http://localhost:8081/meetings/`+this.props.match.params.id)
    .then(response => {
      const data = response.data[0]; 
      this.setState({
      team_lead: data.team_lead,
      creation_date: data.creation_date,
      start_time: data.start_time,
      end_time:data.end_time,
      status: data.status,
      agenda: data.agenda,
      next_things: data.next_things,
      id : this.props.match.params.id,
      });
      //console.log(data.team_lead);
      
    })
    .catch(function(error) {
      console.log(error);
    })
  }
  

  onChangeTeamLead(e){
    this.setState({
      team_lead: e.target.value
    })
  }

  onChangeCreationDate(e){
    this.setState({
      creation_date: e.target.value
    })
  }
  
  onChangeStartTime(e){
    this.setState({
      start_time: e.target.value
    })
  }

  onChangeEndTime(e){
    this.setState({
      end_time: e.target.value
    })
  }

  onChangeStatus(e){
    this.setState({
      status: e.target.value
    })
  }

  onChangeAgenda(e){
    this.setState({
      agenda: e.target.value
    })
  }

  onChangeNextThings(e){
    this.setState({
      next_things: e.target.value
    })
  }

 

     onSubmit = (e) => {
    e.preventDefault();   
    const obj = {
      team_lead: this.state.team_lead,
      creation_date: this.state.creation_date,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      status: this.state.status,
      agenda: this.state.agenda,
      next_things: this.state.next_things
    };
    
    console.log(obj);
    //console.log(this.props.match.params.id)
    if(this.state.team_lead == '' || this.state.creation_date == '' || this.state.start_time == '' || this.state.end_time == '' || this.state.status == '' || this.state.agenda == '' || this.state.next_things == '' ){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'All Fields are required',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
    axios.post(`http://localhost:8081/meetings/`+this.props.match.params.id ,obj)
    .then(this.setState({redirect: true}));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Your Meeting is updated',
      showConfirmButton: false,
      timer: 1500
    })
    this.props.history.push('/aboutus') ; 
  }
}

        render(){
          return(
            <div>
            <br/><br/><br/>

<form class="container border rounded " onSubmit={this.onSubmit}>
  <fieldset>
  <legend>Modify Meeting Details</legend>
  <br/>

  <Form.Row>
    
    <Form.Group as={Col} controlId="formGridMeetingId">
      <Form.Label> Meeting ID </Form.Label>    
      <Form.Control  type="text" value={this.state.id} readonly=""/>
    </Form.Group>


    <Form.Group as={Col} controlId="formGridTeamLead">
        <Form.Label>Team Lead</Form.Label>  
        <Form.Control  name='name' value={this.state.team_lead} onChange={this.onChangeTeamLead}/>
    </Form.Group>

</Form.Row>


<Form.Row>
        
        <Form.Group as={Col} controlId="formGridDate">
            <Form.Label>Date</Form.Label>  
            <Form.Control type="date" name="creation_date" value={this.state.creation_date} onChange={this.onChangeCreationDate} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridStartTime">
            <Form.Label>Start Time</Form.Label>  
            <Form.Control type="time"  name="start_time" value={this.state.start_time} onChange={this.onChangeStartTime} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridStartTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control type="time"  name="end_time" value={this.state.end_time} onChange={this.onChangeEndTime} />
        </Form.Group>
    </Form.Row> 

    <Form.Group controlId="formGridStatus">
            <Form.Label>Status Until Now</Form.Label> 
            <Form.Control name="status" value={this.state.status} onChange={this.onChangeStatus}  rows="5" />    
        </Form.Group> 

        <Form.Group controlId="formGridNext">
        <Form.Label>Agenda</Form.Label>
        <Form.Control name="agenda" value={this.state.agenda} onChange={this.onChangeAgenda}  rows="5"/>
    </Form.Group>  

    <Form.Group controlId="formGridNext">
        <Form.Label>What Next</Form.Label>
        <Form.Control  name="next_things" value={this.state.next_things} onChange={this.onChangeNextThings}   rows="5"/>
    </Form.Group>    
<br/>
<Button type="submit" variant="outline-success"> Update</Button>

<br />
<br/>
</fieldset>
</form>
<br />
</div>
           
      )
      
}

}
