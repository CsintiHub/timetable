import { Component, useState } from "react";
// import { NavLink } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { addClass, updateClass, fetchClasses } from "../actions/classes";
import { compose } from "redux";
import { withRouter } from "react-router";
import { Modal } from "semantic-ui-react";
// import axios from "axios";

// function Calendar() {
const today = new Date();
const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
const week = [];
for (var i = 0; i < 7; ++i) {
  const day = new Date(today);
  day.setDate(day.getDate() + i - dayOfWeek);
  week.push(day);
}
//   return <div>week:{week}</div>;
// }
const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const days = [0, 1, 2, 3, 4, 5, 6];

function Cell({ day, hour, claas, setOpen }) {
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const claas = await dispatch(fetchClass(hour));
  return (
    <div
      className="column"
      id={day}
      onClick={setOpen}
      color={claas ? "green" : "grey"}
    >
      {/* {`day: ${day}, hour: ${hour + 8}`} */}
      {claas ? claas.tutorId : "free"}
    </div>
  );
}

function Form({ open, onClose }) {
  const dispatch = useDispatch;
  const [start, setStart] = useState("");
  const [duration, setDuration] = useState("");
  const [online, setOnline] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (start && duration && online)
      dispatch(addClass({ start, duration, online }));
    onClose();
  };
  return (
    <Modal
      as="form"
      className="ui small modal"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <i className="close icon" onClick={onClose}></i>
      <div className="header">Sign up for class</div>
      <div className="image content">
        <div className="description">
          <div className="ui form">
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
                  tabIndex="0"
                  className="hidden"
                  onChange={(e) => setOnline(e.target.checked)}
                />
                <label>Online</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="actions">
        <button
          type="button"
          onClick={onClose}
          className="ui black deny button"
        >
          Cancel
        </button>
        <button type="submit" className="ui positive right labeled icon button">
          Submit
          <i className="plus icon"></i>
        </button>
      </div>
    </Modal>
  );
}

//TODO accept class
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

export class TutorClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: "",
      open: false,
      open2: false,
      claas: null,
      classes: [],
      week: week,
      // user: JSON.parse(localStorage.user),
    };
    this.handleClick = this.handleClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onClose2 = this.onClose2.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.previousWeek = this.previousWeek.bind(this);
    // console.log(localStorage.user);
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

  setOpen = () => {
    console.log("open?");
    this.setState({ open: true });
  };

  nextWeek = () => {
    const nextWeek = this.state.week;
    nextWeek.map((day) => day.setDate(day.getDate() + 7));
    this.setState({ week: nextWeek });
  };

  previousWeek = () => {
    const previousWeek = this.state.week;
    previousWeek.map((day) => day.setDate(day.getDate() - 7));
    this.setState({ week: previousWeek });
  };

  componentDidMount() {
    this.props.fetchClasses(this.props.match.params.id);
    // await axios
    //   .get(`/api/users/${JSON.parse(localStorage.user).id}/classes`)
    //   .then((response) => this.setState({ classes: response.data.classes }));
  }

  render() {
    return (
      <div>
        {/*TODO highlight search*/}
        <div className="field">
          <label>Search by student</label>
          <input
            type="text"
            name="student"
            onChange={(e) => this.setState({ student: e.target.value })}
          />
        </div>
        {/* <div className="ui very relaxed list">
          {this.props.classes.length > 0 ? (
            this.props.classes.map((claas) => {
              if (
                claas.Student.name
                  .toLowerCase()
                  .includes(this.state.student.toLowerCase())
              ) {
                return (
                  <div key={claas.id} className="ui item">
                    {!claas.accepted && (
                      <div className="right floated content">
                        <div className="ui button">Accept</div>
                      </div>
                    )}
                    <div className="content">
                      {claas.start}-{claas.end} with
                      <b> {claas.Student.name}</b>
                      <div className="description">
                        {claas.accepted ? "accepted" : "pending"}
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div>No classes yet</div>
          )}
        </div> */}
        <br />
        <div className="ui grid">
          <div className="eleven column row">
            <div className="column" onClick={this.previousWeek}>
              Previous week
            </div>
            <div className="column"></div>
            {this.state.week.map((day) => {
              return (
                <div key={day} className="column">
                  {day.getMonth()}. {day.getDate()}
                </div>
              );
            })}
            <div className="column" onClick={this.nextWeek}>
              Next week
            </div>
          </div>
          {this.props.classes[0] && this.props.classes[0].start
            ? hours.map((hour) => {
                return (
                  <div key={hour} className="eleven column row" id={hour + 8}>
                    <div className="column"></div>
                    <div className="column">from {hour + 8}</div>
                    {days.map((day) => {
                      const weekDay = this.state.week[day];
                      const c = this.props.classes.find(
                        (claas) =>
                          claas.start.slice(5, 7) == weekDay.getMonth() + 1 &&
                          claas.start.slice(8, 10) == weekDay.getDate() + 1 &&
                          claas.start.slice(11, 13) <= hour + 8 &&
                          claas.end.slice(11, 13) > hour + 8
                      );
                      return (
                        <Cell
                          key={`${weekDay}.${hour}`}
                          day={weekDay.getDate()}
                          hour={hour}
                          setOpen={this.setOpen}
                          claas={c}
                        />
                      );
                    })}
                  </div>
                );
              })
            : ""}
        </div>
        <Form open={this.state.open} onClose={this.onClose} />
        <Accept
          open={this.state.open2}
          onClose={this.onClose2}
          claas={this.state.claas}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    classes: state.classes,
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchClasses })
)(TutorClassList);
