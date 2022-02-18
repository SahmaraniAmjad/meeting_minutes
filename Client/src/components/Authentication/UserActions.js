import {
  signinUserSuccess,
  signinUserFailed,
  signupUserSuccess,
  signupUserFailed,
  signoutUser,
} from "../Authentication/UserReducer";
import axios from "axios";
import { API } from "../configs";
import io from "socket.io-client";
import { history } from "../store/store";
import { SuccessAlert, FailAlert } from "../Alerts";
import jwt from 'jwt-decode';
import { Redirect } from "react-router";

export const signin = (user) => async (dispatch) => {
  const apiUrl = `${API}/`;
  try {
    axios
    .post(apiUrl, {
      email: user.email,
      password: user.password,
    })
    .then(
      (data) => {
        localStorage.setItem("token", data.data.token);
        const user = jwt(data.data.token);
        dispatch(signinUserSuccess(user.email));
        history.push("/createnew")

        const CONNECTION_PORT = "localhost:8081";
        let socket = io(CONNECTION_PORT);
        socket.on("Welcome", (data) => {
          console.log("Received" + data);
        });
      },
      (error) => {
        FailAlert(error.response.data.message);
        dispatch(signinUserFailed(error.response.data.message));
      }
    )
  
} catch (err) {
  FailAlert("An error occured, please try again later.");

}
}

export const signup = (user) => async (dispatch) => {
  const apiUrl = `${API}/signup`;
  axios.
  post(apiUrl, {
    name: user.name,
    email: user.email,
    password: user.password,
  })

  .then(
    (data) => {
      dispatch(signupUserSuccess());
      SuccessAlert("User created successfully");
      history.push("/");
    },
    (error) => {
      if (error.response.data.errors) {
        FailAlert(
          error.response.data.errors[0].param + 
          ":" +
          error.response.data.errors[0].msg
        );
      } else {
        FailAlert(error.response.data.message);
      }
      dispatch(signupUserFailed(error.response.data.message));
    }
  );
};

export const signout = () => async (dispatch) => {
  dispatch(signoutUser());
  localStorage.clear();
  window.location = "/";
};