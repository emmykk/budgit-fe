import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { budgitJWTCookieName } from "../utils.js";
import Signup from "./Signup.js";

export default class Login extends React.Component {
  state = { page: "login", enteredUsername: null, enteredUsername: null };

  changePage = (pageName) => {
    this.setState({
      page: pageName,
      enteredUsername: "",
      enteredPassword: "",
    });
  };

  handleUsernameInputChange = (event) => {
    this.setState({ enteredUsername: event.target.value });
    event.preventDefault();
  };

  handlePasswordInputChange = (event) => {
    this.setState({ enteredPassword: event.target.value });
    event.preventDefault();
  };

  handleLogin = (event) => {
    const { enteredUsername, enteredPassword } = this.state;
    const { updateLoggedInState } = this.props;

    axios
      .post("/login", {
        username: enteredUsername,
        password: enteredPassword,
      })
      .then((response) => {
        // TODO: Expiry date for cookie
        const { token } = response.data;
        document.cookie = `${budgitJWTCookieName}=${token}`;
        this.setState({ token: token });
        updateLoggedInState(token);
      })
      .catch((error) => console.log(error));
  };

  render() {
    const loginCardStyle = {
      width: "400px",
    };
    const { page } = this.state;

    if (page === "login") {
      return (
        <div className="container bg-white p-5" style={loginCardStyle}>
          <p style={{ borderBottom: "1px solid lightgray" }} className="pb-5">
            Welcome! Please log in to get started.
          </p>
          <div className="input-field">
            <span className="text-sm text-gray-600">Username</span>
            <input
              placeholder="e.g. mycoolusername123"
              value={this.state.enteredUsername}
              onChange={this.handleUsernameInputChange}
            ></input>
          </div>
          <div className="input-field">
            <span className="text-sm text-gray-600">Password</span>
            <input
              placeholder="i.e. your password"
              type="password"
              value={this.state.enteredPassword}
              onChange={this.handlePasswordInputChange}
            ></input>
          </div>
          <button
            className="my-3 bg-green-500 text-white p-3 px-5 rounded-2xl font-bold w-full"
            onClick={this.handleLogin}
          >
            Login
          </button>
          <Button
            class="bg-yellow-400 text-white rounded-2xl p-3 px-5 font-bold w-full"
            onClick={() => this.changePage("signup")}
          >
            Sign up
          </Button>
        </div>
      );
    } else {
      return <Signup changePage={this.changePage} Button={Button} />;
    }
  }
}
