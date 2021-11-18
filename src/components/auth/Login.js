import axios from "axios";
import { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
// import { history } from "../../index";

export function Login(/*{ setUser }*/) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [redirect, setRedirect] = useState(false);
  // const [error, setError] = useState(false);

  // TODO minden
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", { email, password })
      .then((response) => {
        // console.log(response);
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          // setUser(response.data.user);
        }
        window.location.href = "profile";
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {/*redirect && <Redirect to="/profile" />*/}
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <div className="ui left icon input">
            <input
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <i className="user icon"></i>
          </div>
        </div>
        <div className="field">
          <label>Password</label>
          <div className="ui left icon input">
            <input
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <i className="lock icon"></i>
          </div>
        </div>
        {/*error && <span>Missing parameters</span>*/}
        <button type="submit" className="ui blue submit button">
          Login
        </button>
        <NavLink exact to="/signup" className="ui button">
          Sign up
        </NavLink>
      </form>
    </div>
  );
}
