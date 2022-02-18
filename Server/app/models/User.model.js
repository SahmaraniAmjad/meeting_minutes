const { isNull, _, result } = require("lodash");
const sql = require("./db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthConfig = require("../config/auth.config.js");
var mysql = require("mysql");

const User = function (User) {
  this.id = User.id;
  this.name = User.name;
  this.email = User.email;
  this.password = User.password;
};

User.socketDisconnect = function (socketID) {
  console.log("User Disconnected :" + socketID);

  sql.query(
    "DELETE FROM Socket Where id = ?",
    [socketID],
    function (error, data) {
      if (error) throw error;
    }
  );
};


User.SocketConnect = function (userData) {
  console.log("socketconnect method");
  const io = require("socket.io")(require("../../server.js").httpObject, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User socketid: " + socket.id);
    socket.emit("Welcome", "Hello and Welcome to the server");

    sql.query(
      `SELECT user_id FROM Socket WHERE user_id='${userData.id}'`,
      function (error, data) {
        if (error) throw error;
        sql.query(
          "Insert into Socket(id,user_id) values (?,?)",
          [socket.id, userData.id],
          function (error, data) {
            if (error) throw error;
          }
        );
      }
    );
    socket.on("disconnect", () => {
      User.socketDisconnect(socket.id);
    });
  });
}; 


//get user by email
User.getByEmail = (email, result) => {
  sql.query("SELECT * FROM user WHERE email = ?", email, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      result(null, res[0]);
    }
  });
};

//get user by id
User.getById = (id, result) => {
  sql.query("SELECT * FROM user WHERE id = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      result(null, res[0]);
    }
  });
}; 

//get logged in user details
  User.getLoggedInUser = (userData, result) => {
  userId = userData.userId;
  User.getById(userId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else if (_.isNil(res)) {
      result("User not found", null);
    } else {
      result(null, res);
    }
  });
};

// create a new user
User.create = (newUser, result) => {
  bcrypt.hash(newUser.password, 10, (err, hash) => {
    if (err) {
      result(err, null);
      return;
    } else {
      //check if user already exists
      newUser.password = hash;
      User.getByEmail(newUser.email, (err, data) => {
        if (err) {
          result(err, null);
          return;
        } else if (!_.isNil(data)) {
          result("User already exists", null);
          return;
        } else {
          //create new user
          sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
            if (err) {
              result(err, null);
              return;
            }
            console.log("User created", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId });
          });
        }
      });
    }
  });
}; 

// sign in 
User.signin = (user, result) => {
  User.getByEmail(user.email, (err, userData) => {
    if (err) {
      result(err, null);
      return;
    } else if (_.isNil(userData)) {
      // user not found
      result("Authentication failed", null);
      return;
    } else {
      //check the password
      bcrypt.compare(user.password, userData.password, (err, res) => {
        if (err) {
          result(err, null);
          return;

        } else if(!res){
          result("Authentication failed", null);
          return;

        }  else {
          //User.SocketConnect(userData);
          const token = jwt.sign(
            {
              email: userData.email,
              userId: userData.id,
              
            },
            AuthConfig.JWT_KEY,
            {
              expiresIn: AuthConfig.EXPIRES_IN,
            }
          );
          result(null, token);
        }
      });
    }
  });
};

module.exports = User;



