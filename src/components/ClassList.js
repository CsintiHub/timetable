import { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addClass, updateClass } from "../actions/classes";

function Form(open, onClose) {
  const dispatch = useDispatch;
  const [start, setStart] = useState("");
  const [duration, setDuration] = useState("");
  const [online, setOnline] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addClass({ start, duration, online }));
    onClose();
  };
  return (
    <div
      as="form"
      className="ui small modal"
      open={open}
      onSubmit={handleSubmit}
    >
      <div className="header">Sign up for class</div>
      <div className="image content">
        <div className="description">
          <form className="ui form">
            <div className="field">
              <label>Start</label>
              <input
                type="time"
                name="start"
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Duration</label>
              <input
                type="number"
                name="duration"
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  tabindex="0"
                  className="hidden"
                  onChange={(e) => setOnline(e.target.checked)}
                />
                <label>Online</label>
              </div>
            </div>
            <button className="ui button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Accept(open2, claas) {
  const dispatch = useDispatch;
  return (
    <div className="ui small modal" open={open2}>
      <div className="header">Accept/Reject this class</div>
      <div className="image content">
        <div className="description">
          Student: {claas.student}, {claas.start} - {claas.end}
        </div>

        <div className="actions">
          <div
            className="ui negative button"
            onClick={dispatch(updateClass({ accepted: false, ...claas }))}
          >
            Reject
          </div>
          <div
            className="ui positive right labeled icon button"
            onClick={dispatch(updateClass({ accepted: true, ...claas }))}
          >
            Accept
            <i className="checkmark icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: "",
      open: false,
      open2: false,
      claas: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onClose2 = this.onClose2.bind(this);
  }

  handleClick = (claas) => {
    this.setState({ open2: true, claas: claas });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  onClose2 = () => {
    this.setState({ open2: false });
  };

  //TODO formázá
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className="field">
          <label>Student name</label>
          <input
            type="text"
            name="student"
            onChange={(e) => this.setState({ student: e.target.value })}
          />
        </div>
        {classes.map((claas) => {
          if (claas.student.includes(this.state.student)) {
            return (
              <div>
                <NavLink to={`/user/${claas.student.id}`}>
                  {claas.student}
                </NavLink>
                <div>
                  {claas.start}-{claas.end}
                </div>
                <div onClick={this.handleClick(claas)}>
                  {claas.accepted ? "accepted" : "pending"}
                </div>
                <button onClick={this.setState({ open: true })}>
                  Sign for class
                </button>
              </div>
            );
          }
        })}
        <Form open={this.state.open} onClose={this.onClose} />
        <Accept
          open={this.state.open2}
          onClose={this.onClose2}
          claas={this.state.claas}
        />
        {!this.props.user.tutor && (
          <div className="ui form">
            <div className="field">
              <label>Short Text</label>
              <textarea rows="2"></textarea>
            </div>
          </div>
        )}
      </div>
    );
  }
}
