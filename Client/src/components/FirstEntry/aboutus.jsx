import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//import { BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';


const Aboutus = () =>{
        return(
            <div className="contentpadding">
                    <div>
      </div>
      <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Meeting Id</th>
      <th scope="col">Date</th>
      <th scope="col">Start Time</th>
      <th scope="col">End Time</th>
      <th scope="col">Team Lead</th>
    </tr>
  </thead>
  <tbody>
    <tr className="table-active">
      <th scope="row">Active</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
    <tr className="table-active">
      <th scope="row">Active</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr>
  </tbody>
</table>  
</div>
        );
}
export default Aboutus;