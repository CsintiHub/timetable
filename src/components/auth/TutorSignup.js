import { useState } from "react";
import { addTutor } from "../../actions/tutors";

function TutorSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // TODO minden
  const handleSubmit = (e) => {
    console.log(e);
    this.props.addTutor({ email, name, subject, address, password });
  };

  return (
    <form
      className="ui form"
      onSubmit={handleSubmit}
      method="POST"
      action="/tutor"
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
        <label>Subject</label>
        <div className="ui left icon input">
          <input
            value={subject}
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
            type="hidden"
            placeholder="Subject"
          />
          <i className="dropdown icon"></i>
          <div className="default text">Subject</div>
          <div className="menu">
            <div className="item" data-value="math">
              Math
            </div>
            <div className="item" data-value="physics">
              Physics
            </div>
            <div className="item" data-value="chemistry">
              Chemistry
            </div>
            <div className="item" data-value="biology">
              Biology
            </div>
            <div className="item" data-value="geography">
              Geography
            </div>
            <div className="item" data-value="literature">
              Literature
            </div>
          </div>
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
// TutorSignup.propTypes = {
//   addTutor: PropTypes.func.isRequired,
// };

function mapStateToProps(state, props) {
  if (props.match.params && props.match.params.id > 0) {
    const tutor = state.tutors.find((item) => item.id == props.match.params.id);
    // const album = band ? band.albums.find(item => item.id == props.match.params.album_id) : null;
    return { tutor };
  }

  return { tutor: null };
}

export default connect(mapStateToProps, { addTutor })(TutorSignup);
