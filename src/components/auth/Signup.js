import axios from "axios";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import { signupUser } from "../../actions/users";

export function Signup(/*{ setUser }*/) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tutor, setTutor] = useState("false");
  const [subject, setSubject] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let list = [];
    if (!email.includes("@")) list.push("email");
    if (name.length === 0) list.push("name");
    if (tutor === "true" && subject.length === 0) list.push("subject");
    if (address.length === 0) list.push("address");
    if (password.length < 8) list.push("password");
    // console.log(e);
    setErrors(list);
    if (list.length === 0) {
      const user = { email, name, tutor, subject, address, password };
      axios
        .post("/api/signup", user)
        .then((response) => {
          if (response.data.created) {
            localStorage.setItem("user", response.data.created);
            // setUser(response.data.created);
          }
        })
        .catch((error) => console.log(error));
    } else setErrors([]);
  };

  // const handleChange = (e) => {
  //   if ("false") console.log("false");
  //   // false
  //   else console.log("true");
  //   // console.log(e);
  // };

  return (
    <form
      className="ui form"
      onSubmit={handleSubmit}
      // method="POST"
      action="/signup"
    >
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
          <i className="envelope icon"></i>
        </div>
        {errors.includes("email") && <span>An email must be given</span>}
      </div>

      <div className="field">
        <label>Name</label>
        <div className="ui left icon input">
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <i className="user icon"></i>
        </div>
        {errors.includes("name") && <span>A name must be given</span>}
      </div>

      <div className="inline fields">
        <label>?</label>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="tutor"
              value="true"
              onChange={(e) => setTutor(e.target.value)}
            />
            <label>Tutor</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="tutor"
              value="false"
              onChange={(e) => setTutor(e.target.value)}
            />
            <label>Student</label>
          </div>
        </div>
      </div>

      <div className="field">
        <label>Subject</label>
        <div className="ui left icon input">
          <select
            className={`ui fluid dropdown ${
              tutor === "false" ? "disabled" : ""
            }`}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">State</option>
            <option value="math">Math</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="geography">Geography</option>
            <option value="english">English</option>
          </select>
        </div>
        {errors.includes("subject") && (
          <span>A subject must be given for tutors</span>
        )}
      </div>

      <div className="field">
        <label>Address</label>
        <div className="ui left icon input">
          <input
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Address"
          />
          <i className="home icon"></i>
        </div>
        {errors.includes("address") && <span>An address must be given</span>}
      </div>

      <div className="field">
        <label>Password</label>
        <div className="ui left icon input">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <i className="lock icon"></i>
        </div>
        {errors.includes("password") && (
          <span>Password must be at least 8 characters long</span>
        )}
      </div>
      <button type="submit" className="ui blue submit button">
        Sign up
      </button>
      <NavLink exact to="/" className="ui button">
        Cancel
      </NavLink>
    </form>
  );
}

// TODO pivot to this
// Signup.propTypes = {
//   signupUser: PropTypes.func.isRequired,
// };

// function mapStateToProps(state, props) {
//   // if (props.match.params && props.match.params.id > 0) {
//     const user = state.users.find((item) => item.id == props.match.params.id);
//     // const album = band ? band.albums.find(item => item.id == props.match.params.album_id) : null;
//     return { user };
//   // }

//   // return { tutor: null };
// }

// export default connect(mapStateToProps, { signupUser })(Signup);
