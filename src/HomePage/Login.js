import React from "react";

export default class Login extends React.Component {
  state = { page: "login" };

  changePage = (pageName) => {
    this.setState({ page: pageName });
  };

  render() {
    if (this.state.page === "login") {
      console.log(this.state.page);
      return (
        <div>
          <p>Welcome! Please log in to get started.</p>
          <div className="input-field">
            <input placeholder="username"></input>
          </div>
          <div className="input-field">
            <input placeholder="password"></input>
          </div>
          <button class="waves-effect waves-light btn">Login</button>
          <div>
            <p>
              Or,{" "}
              <a href="#" onClick={(e) => this.changePage("signup")}>
                sign up
              </a>
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>Sign up here!</p>
          <div className="input-field">
            <input placeholder="username"></input>
          </div>
          <div className="input-field">
            <input placeholder="password"></input>
          </div>

          <p>
            Or, return to{" "}
            <a href="#" onClick={(e) => this.changePage("login")}>
              login
            </a>
          </p>
        </div>
      );
    }
  }
}
