import "./App.css";
import "./index.css";
import "materialize-css/dist/css/materialize.min.css";
import { Switch, Route } from "react-router-dom";
import Login from "./HomePage/Login.js";
import Home from "./HomePage/Home.js";
import React, { useEffect, useState } from "react";
import { getCookieValByName, budgitJWTCookieName } from "./utils.js";
import Nav from "./Nav.js";

function App() {
  const getUserTokenFromCookie = () => getCookieValByName(budgitJWTCookieName);
  const [token, setToken] = useState(getUserTokenFromCookie);
  const updateLoggedInState = (token = null) => {
    if (token) setToken(token);
  };

  return (
    <div
      className="App pb-20 min-h-full"
      style={{ backgroundColor: "rgb(234 232 255)" }}
    >
      <Nav />
      {token ? (
        <div>
          <div className="flex justify-center">
            <Home token={token} setToken={setToken} />
          </div>
          <div className="flex justify-end">
            <button onClick={() => setToken(null)}>Logout</button>
          </div>
        </div>
      ) : (
        <Login updateLoggedInState={updateLoggedInState} Nav={Nav} />
      )}
    </div>
  );
}

export default App;
{
  /* <Switch>
              <Route path="/login" component={Login} />
              <Route path="/home" component={Home} />
            </Switch> */
}
