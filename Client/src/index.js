import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
//import Counter from "./components/counter";
//import App from './App';
import App from './components/App'


console.log('Entered into index.js');

 
// var mysqlConnection =mysql.createConnection(
//   {
//     host: 'localhost',
//     user : 'meetings',
//     password: 'meetings',
//     database : 'meetingsdb'
//   }
// );

// mysqlConnection.connect((err) => {
//   if(!err) {
//     console.log('Connection done');
//   }
//   else{
//     console.log('dbconnection problem');
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
