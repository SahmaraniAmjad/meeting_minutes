import { React, useState, useEffect } from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Table } from "react-bootstrap";
const About = () => {
  const Swal = require('sweetalert2');
  const [meetings, setMeetings] = useState([]);

  useEffect(()=> {
   loadMeetings();
  }, []);

  const loadMeetings  = async () => {
    // /meetings (there is a in server.js a query to get all the meetings)
   const result =  await axios.get("http://localhost:8081/meetings");
    setMeetings(result.data.reverse());
  } 

  const deleteMeeting = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8081/meetings/${id}`);
        Swal.fire({
          icon: 'success',
          title: 'Your Meeting is Deleted',
          showConfirmButton: false,
          timer: 1500
        })
      }
      loadMeetings();
    })
    
    
  };

  return (
      <Table responsive>
  <thead>
    <tr>
      <th scope="col">Meeting ID</th>
      <th scope="col">Team Lead</th>
      <th scope="col">Date</th>
      <th scope="col">Start Time</th>
      <th scope="col">End Time</th>
 
    </tr>
  </thead>
  <tbody>
  {
    meetings.map((meeting, index) => (
      <tr>
      <th scope="row">{meeting.id}</th>
      <td>{meeting.team_lead }</td>
      <td>{meeting.creation_date }</td>
      <td>{meeting.start_time }</td>
      <td>{meeting.end_time }</td>
      <td>
                  <Link to={`/modify/${meeting.id}`}>
                  <Button variant="outline-success" >Edit</Button>
                  </Link>
 
                   {""} {""}
                  <Button variant="outline-danger" onClick={() => deleteMeeting(meeting.id)}> Delete </Button>

                  {" "}
                  <Link to={`/view/${meeting.id}`}>
                  <Button variant="outline-primary" > View </Button>
                  </Link>
                </td>
    </tr>
    ))
  }
  
  </tbody>
</Table>  


    
  )
}

export default About;