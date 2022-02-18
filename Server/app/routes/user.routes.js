const checkAuth = require("../middleware/checkAuth.js");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const { body } = require("express-validator");
  const AuthConfig = require("../config/auth.config.js");

    app.post(
      "/signup",
      [
        // the name 
        body("name").not().isEmpty().withMessage("Name can't be empty"),

        // uername should be email
        body("email").not().isEmpty().withMessage("Email address can't be empty"),
        
        body("email").isEmail().custom((value) => {
          return value.endsWith("@gmail.com") || value.endsWith("@hotmail.com") || value.endsWith("@outlook.com");
        })
        .withMessage("Invalid Email Address"),

        // password must be at least 5 chars long
        body("password").custom((value) => AuthConfig.PASSWORD_RULES.test(value)).
        withMessage(
          "Password should be 8 min length, one small, one capital, one digit and one special char at least"
        ),
      ],
      users.signup
    );

    // sign in 
    app.post("/", users.signin);
    

}