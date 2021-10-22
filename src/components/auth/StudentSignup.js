import { useState } from "react";
import { addStudent } from "../../actions/students";

function StudentSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // TODO minden
  const handleSubmit = (e) => {
    console.log(e);
    this.props.addStudent({ email, name, subject, address, password });
  };

  return (
    <form
      className="ui form"
      onSubmit={handleSubmit}
      method="POST"
      action="/student"
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
          <i className="user icon"></i>
        </div>
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
          <i className="user icon"></i>
        </div>
      </div>

      <div className="field">
        <label>Password</label>
        <div className="ui left icon input">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <i className="lock icon"></i>
        </div>
      </div>
      <button type="submit" className="ui blue submit button">
        Sign up
      </button>
    </form>
  );
}

// TODO wtf is this
// StudentSignup.propTypes = {
//   addStudent: PropTypes.func.isRequired,
// };

function mapStateToProps(state, props) {
  if (props.match.params && props.match.params.id > 0) {
    const student = state.students.find(
      (item) => item.id == props.match.params.id
    );
    // const album = band ? band.albums.find(item => item.id == props.match.params.album_id) : null;
    return { student };
  }

  return { student: null };
}

export default connect(mapStateToProps, { addStudent })(StudentSignup);
