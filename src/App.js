import logo from "./logo.svg";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import Login from "./HomePage/Login.js";

function App() {
  return (
    <div className="App">
      <nav>
        <div class="nav-wrapper cyan lighten-2 left">
          <a href="#" class="brand-logo">
            Budgeitoss
          </a>
          {/* <div>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <a href="sass.html">Sass</a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
      
      <Login />
    </div>
  );
}

export default App;
