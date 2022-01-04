const User = require("../models/User.model.js");

const { validationResult } = require("express-validator");
const _ = require("lodash");
const { get } = require("../models/User.model.js");

// registration 

exports.signup = (req, res) => {
  if (!req.body) {
    res.status(400).send({
    message: "invalid request body",
    });
  }

  // validate inputs
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array((x) => x.msg) });
  } else {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    User.create(user, (err, data) => {
      if(err) {
        if (err == "User already exists") {
          console.log(err);
          res.status(401).send({
            message: err,
          });
        } else {
          res.status(500).send({
            message: err.message || "Server error",
          });
        }
      } else {
        res.status(201).send(data);
      }
    });
  }
};
// logging in
exports.signin = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "invalid request body",
    });
  } else {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    User.signin(user, (err, data) => {
      if(err){
        if (err == "Authentication failed") {
          res.status(401).send({
            message: err,
          });
        } else {
          res.status(500).send({
            message: err.message || "Server error",
          });
        }
      } else {
        res.status(200).send({
          message: "Authentication successfull",
          token: data,
        });
      }
    });
  }
};
