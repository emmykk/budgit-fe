import React from "react";

function Signup(props) {
  return (
    <div className="container bg-white p-5" style={{ width: "400px" }}>
      <p>Sign up here!</p>
      <div className="input-field">
        <input placeholder="username"></input>
      </div>
      <div className="input-field">
        <input placeholder="password"></input>
      </div>
      <props.Button class="waves-effect waves-light btn">Sign Up</props.Button>
      <p>
        Or, return to{" "}
        <a href="#" onClick={(e) => props.changePage("login")}>
          login
        </a>
      </p>
    </div>
  );
}

export default Signup;
