import React from 'react';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import Axios from 'axios';
import { API } from "../configs";
import Swal from 'sweetalert2';
import {Nav, NavDropdown, Form, FormControl, Button, Row, Col} from "react-bootstrap";


 export default class Modifyall extends React.Component  {
   Swal = require('sweetalert2');

  constructor(props) {
    super(props);
    this.state = {
      selectedMeeting: {
        team_lead: '',
        creation_date: '',
        start_time: '',
        end_time: '',
        status: '',
        agenda: '',
        next_things: '',
        redirect: false,
      },
      allMeetings: []
    }
    
    this.updateSelectedMeeting = this.updateSelectedMeeting.bind(this);
  }

  getAllIds () {
    axios.get(`http://localhost:8081/meetings/`)
    .then(response => {
      this.setState({allMeetings: response.data});
      if(response.data.length){
        this.setState({selectedMeeting: response.data[0]})
      }
    });
  }

  showMeetingInfo(meeting) {
    this.setState({selectedMeeting:JSON.parse(meeting)})
    
  }

  componentDidMount(){
    this.getAllIds();
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
    })
    .catch(function(error) {
      console.log(error);
    })
  }

     onSubmit = (e) => {
    e.preventDefault();  
    const obj = {
      team_lead: this.state.selectedMeeting.team_lead,
      creation_date: this.state.selectedMeeting.creation_date,
      start_time: this.state.selectedMeeting.start_time,
      end_time: this.state.selectedMeeting.end_time,
      status: this.state.selectedMeeting.status,
      agenda: this.state.selectedMeeting.agenda,
      next_things: this.state.selectedMeeting.next_things
    };
    
    if(this.state.team_lead == '' || this.state.creation_date == '' || this.state.start_time == '' || this.state.end_time == '' || this.state.status == '' || this.state.agenda == '' || this.state.next_things == '' ){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'All Fields are required',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
    axios.post(`http://localhost:8081/meetings/`+ this.state.selectedMeeting.id,obj)
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
  
updateSelectedMeeting(attribute, value) {
  console.log(attribute, value);
  const updated = {...this.state.selectedMeeting, [attribute]: value}
  this.setState({selectedMeeting: updated})
}
render()
{
  
  return(
    <div>
   <br/><br/><br/>
<form class="container border rounded " onSubmit={this.onSubmit}>
  <fieldset>
  <legend>Modify Meeting Details</legend>
  <br />
    

 <Form.Row>
  
 <Form.Group as={Col} controlId="formGridTeamLead">
  <Form.Label> Meeting ID </Form.Label> 
  <Form.Control as="select"  onChange={(e) => this.showMeetingInfo(e.target.value)} class="ui search dropdown form-control" id="readOnlyInput" type="text" placeholder="Meeting ID" readonly="" costum>
  {this.state.allMeetings.map(meeting => <option value={JSON.stringify(meeting)} >{`M00${meeting.id}`}</option>)}
  </Form.Control>
  </Form.Group>
  

  <Form.Group as={Col} controlId="formGridTeamLead">
            <Form.Label>Team Lead</Form.Label>  
            <Form.Control   name='name' value={this.state.selectedMeeting.team_lead} onChange={(e) => this.updateSelectedMeeting('team_lead', e.target.value)}/>
        </Form.Group>

  </Form.Row>


  <Form.Row>
        
        <Form.Group as={Col} controlId="formGridDate">
            <Form.Label>Date</Form.Label>  
            <Form.Control name="creation_date" value={this.state.selectedMeeting.creation_date} onChange={(e) => this.updateSelectedMeeting('creation_date', e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridStartTime">
            <Form.Label>Start Time</Form.Label>  
            <Form.Control  name="start_time" value={this.state.selectedMeeting.start_time} onChange={(e) => this.updateSelectedMeeting('start_time', e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridStartTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control name="end_time" value={this.state.selectedMeeting.end_time} onChange={(e) => this.updateSelectedMeeting('end_time', e.target.value)} />
        </Form.Group>
    </Form.Row> 


    <Form.Group controlId="formGridStatus">
        <Form.Label>Status Until Now</Form.Label> 
        <Form.Control   name="status" value={this.state.selectedMeeting.status} onChange={(e) => this.updateSelectedMeeting('status', e.target.value)} rows="5" />    
    </Form.Group>  

    <Form.Group controlId="formGridAgenda">
        <Form.Label>Agenda</Form.Label>
        <Form.Control  name="agenda" value={this.state.selectedMeeting.agenda} onChange={(e) => this.updateSelectedMeeting('agenda', e.target.value)} rows="5"/>
    </Form.Group>

    <Form.Group controlId="formGridNext">
        <Form.Label>What Next</Form.Label>
        <Form.Control name="next_things" value={this.state.selectedMeeting.next_things} onChange={(e) => this.updateSelectedMeeting('next_things', e.target.value)} rows="5"/>
    </Form.Group>
<br/>
<Button type="submit" variant="outline-success">Update</Button>
</fieldset>
<br/>
</form>
<br/>
</div>

)}
}