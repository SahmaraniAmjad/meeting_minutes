import { React, useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {Form, Button, Col} from "react-bootstrap";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const View = () => {
  const [meetings, setMeetings] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadMeetings();
  }, [])

  const handlePrint = (event) => {
    event.preventDefault();
      html2canvas(document.querySelector("#capture")).then(canvas => {
        debugger
        //pagesplit: true;
         const imgData = canvas.toDataURL('image/png');
         const pdf = new jsPDF('l', 'pt', 'legal');
         pdf.addImage(imgData, 'PNG', 10, 75);
         pdf.save("Meeting Minutes.pdf"); 
     });
  }

  const loadMeetings = async () => {
    const result = await axios.get(`http://localhost:8081/meetings/${id}`);
    setMeetings(result.data);
    //console.log(result);
  }
        return (
          <div>

<br/><br/><br/>


 
 {
   meetings.map((meeting) => (
    <form class="container border rounded">
  <fieldset>
    <legend>View Meeting Details</legend>
    <br/>
    
    <Form id="capture">
    <Form.Row>
    
        <Form.Group as={Col} controlId="formGridMeetingId">
          <Form.Label> Meeting ID </Form.Label>    
          <Form.Control  value={meeting.id} readonly=""/>
        </Form.Group>
  

        <Form.Group as={Col} controlId="formGridTeamLead">
            <Form.Label>Team Lead</Form.Label>  
            <Form.Control value={meeting.team_lead} id="inputDefault" readonly=""/>
        </Form.Group>

    </Form.Row>

    <Form.Row>
        
        <Form.Group as={Col} controlId="formGridDate">
            <Form.Label>Date</Form.Label>  
            <Form.Control type="Date" id="inputDefault" value={meeting.creation_date} readonly="" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridStartTime">
            <Form.Label>Start Time</Form.Label>  
            <Form.Control type="time" id="inputDefault" value={meeting.start_time} readonly="" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridStartTime">
            <Form.Label>End Time</Form.Label>
            <Form.Control type="time" id="inputDefault" value={meeting.end_time} readonly="" />
        </Form.Group>
    </Form.Row> 

    <Form.Group controlId="formGridStatus">
        <Form.Label>Status Until Now</Form.Label> 
        <Form.Control id="StatusUntilNow" value={meeting.status} readonly="" rows="5" />    
    </Form.Group>  

    <Form.Group controlId="formGridAgenda">
        <Form.Label>Agenda</Form.Label>
        <Form.Control id="inputDefault" value={meeting.agenda} readonly="" rows="5"/>
    </Form.Group>

    <Form.Group controlId="formGridNext">
        <Form.Label>What Next</Form.Label>
        <Form.Control id="inputDefault" value={meeting.next_things} readonly="" rows="5"/>
    </Form.Group>
   <br/>
</Form>
  <Link to='/aboutus'>
    <Button variant="outline-danger">Close</Button>
  </Link>
  {" "}
    <Button variant="outline-primary" onClick={handlePrint}>Save as PDF</Button>
<br />
<br />
</fieldset>
</form>
   ))
 }
 <br />
</div>

        );
}
export default View;