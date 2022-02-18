const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("./app/models/db.js");
const moment = require("moment");



var User = require("./app/models/User.model.js");
const { timeStamp } = require('console');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "server is running"});
})

require("./app/routes/user.routes.js")(app);

var http = require('http').createServer(app);

//moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

// INSERT INTO table_name(today) 
// VALUES(creation_date('07-25-2012','%m-%d-%y')); 

//Begin:  create a new meeting 
app.post("/createnew", (req, res) => {
  const name = req.body.name
  const creation_date = req.body.creation_date
  const start_time = req.body.start_time
  const end_time = req.body.end_time
  const status = req.body.status
  const agenda = req.body.agenda
  const next_things = req.body.next_things

  sql.query('INSERT INTO created_meetings (team_lead, creation_date, start_time, end_time, status, agenda, next_things) VALUES (?,?,?,?,?,?,?)', 
  [name, creation_date, start_time, end_time, status, agenda, next_things], 
  (err, result) => {
    if(err) {
      console.log(err)
    } else {
      res.send("Values Inserted");
    }

  }
  );
});

// End: create a new meeting 


// Begin:  get all the meetings 
app.get('/meetings', (req, res) => {
  sql.query("SELECT * FROM created_meetings", (err, result) => {
    if(err) {
      console.log(err)
    } else {
      res.send(result);
    }
  }); 
});

// End:  get all the meetings 


// here I am trying to get first the data of id = 1 to make a test to see if it is working 
// Begin: get meeting based on id
app.get('/meetings/:id', (req, res) => {
  const id = req.params.id;
  sql.query(`SELECT * FROM created_meetings where id = ?`,[id], (err, result) => {
    if(err) {
      console.log(err)
    } else {
      //console.log(result);
      res.send(result);
    }
  }); 
}); 

// var creation_date;
// var now = creation_date.toLocaleString();

//var now = creation_date.toISOString().replace('Z', '').replace('T', '');


//SELECT TIME_FORMAT("19:30:10", "%H %i %s %p");

 // sql.query(`SELECT TIME_FORMAT(start_time, "%H %i %s %p") FROM created_meetings`, (err, result) => {
  //   if(err){
  //     console.log(err)
  //   } else {
  //     res.send(result);
  //   }
  // });

  //sql.query(`CREATE TRIGGER timestampper BEFORE INSERT ON  created_meetings FOR creation_date SET NEW.timestamp = ${TIME_FORMAT("%H %i %s %p")}`);


// End: update meeting based on id
app.post('/meetings/:id', (req, res) => {
  
  const id = req.params.id;
  const team_lead = req.body.team_lead
  const creation_date = req.body.creation_date
  const start_time = req.body.start_time
  const end_time = req.body.end_time
  const status = req.body.status
  const agenda = req.body.agenda
  const next_things = req.body.next_things
 
  sql.query(`UPDATE created_meetings SET team_lead ='${team_lead}', creation_date = '${creation_date}', start_time = '${start_time}', end_time ='${end_time}', status = '${status}', agenda = '${agenda}', next_things = '${next_things}'  WHERE id = ?`,[id], (err, result) => {
    if(err) {
      console.log(err)
    } else {
      //console.log(result);
      res.send(result);
    }
  }); 
}); 

// End: update meeting based on id 



// Begin: delete meeting based on id

app.delete('/meetings/:id', (req, res) => {
  const id = req.params.id;
  sql.query("DELETE FROM created_meetings WHERE id = ?", [id], (err, result) => {
    if(err){
      console.log(err)
    } else {
      res.send(result);
    }
  })
})

// End: delete meeting based on id



const port = process.env.PORT || 8081;

http.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

module.exports.httpObject = http;