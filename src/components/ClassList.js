import { Component, useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { addClass, updateClass, fetchClasses } from "../actions/classes";
import { compose } from "redux";
import { useParams, withRouter } from "react-router";
import { Modal } from "semantic-ui-react";
import axios from "axios";
// import axios from "axios";

const today = new Date();
const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
const week = [];
for (var i = 0; i < 7; ++i) {
  const day = new Date(today);
  day.setDate(day.getDate() + i - dayOfWeek);
  week.push(day);
}

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Cell({ day, hour, claas, setOpen }) {
  return (
    <td
      className={
        claas
          ? claas.accepted === null
            ? "warning"
            : claas.accepted
            ? "positive"
            : "negative"
          : ""
      }
      id={`${day.getDate()} ${hour + 9}`}
      onClick={(e) => setOpen(e, claas)}
    >
      {claas
        ? claas.Tutor
          ? claas.Tutor.name + ", " + claas.Tutor.subject
          : claas.Student
          ? claas.Student.name + ", " + claas.online
          : ""
        : ""}
    </td>
  );
}

//TODO change unaccepted(?) reservation
// function Change({ claas, open }) {
//   return <Modal></Modal>;
// }

function Form({ date, open, onClose, claas }) {
  const dispatch = useDispatch();
  const [formDay, setFormDay] = useState("");
  const [formHour, setFormHour] = useState("");
  const [duration, setDuration] = useState(1);
  const [online, setOnline] = useState(false);
  const { id } = useParams();
  const user = JSON.parse(localStorage.user);
  const today = Date.now();

  useEffect(() => {
    if (open && !user.tutor && !claas) {
      setFormDay(JSON.stringify(date).slice(1, 11));
      setFormHour(JSON.stringify(date).slice(12, 17));
    }
    if (open && claas) {
      setFormDay(claas.start.slice(0, 10));
      setFormHour(claas.start.slice(11, 16));
      setDuration(claas.duration);
      setOnline(claas.online);
    }
  }, [open, date /*, claas, user.tutor*/]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formDay && formHour && duration && !claas && !user.tutor) {
      console.log("this");
      const start = formDay + " " + formHour + ":00.000 +00:00";
      const end =
        formDay +
        " " +
        (parseInt(formHour) + parseInt(duration)) +
        ":00.000 +00:00";
      dispatch(
        addClass(
          {
            online,
            start,
            duration,
            end,
          },
          id
        )
      );
    } else if (claas && user.tutor && user.id === id) {
      //==
      console.log("or this");
      dispatch(updateClass({ ...claas, accepted: true }));
    }
    onClose();
  };

  const handleClick = () => {
    if (user.tutor && user.id === id && claas)
      dispatch(updateClass({ ...claas, accepted: false }));
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
            {user.tutor && claas && claas.Student && (
              <div className="field">
                <label>Student</label>
                <input
                  type="text"
                  name="student"
                  value={claas.Student.name}
                  // disabled={today > date || user.tutor}
                  disabled={true}
                />
              </div>
            )}
            <div className="field">
              <label>Day</label>
              <input
                type="date"
                name="day"
                onChange={(e) => setFormDay(e.target.value)}
                value={formDay}
                // disabled={today > date || user.tutor}
                disabled={true}
              />
            </div>
            <div className="field">
              <label>Starting Hour</label>
              <input
                type="time"
                name="hour"
                locale="hu-HU"
                onChange={(e) => setFormHour(e.target.value)}
                value={formHour}
                // disabled={today > date || user.tutor}
                disabled={true}
              />
            </div>
            <div className="field">
              <label>Duration</label>
              <input
                type="number"
                name="duration"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                min="1"
                // max={`${22 - parseInt(formHour)}`}
                max={formHour === "21:00" ? "1" : "2"}
                step="0.5"
                disabled={today > date || user.tutor}
              />
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  defaultChecked={claas ? "true" : "false"}
                  tabIndex="0"
                  onChange={(e) => setOnline(e.target.checked)}
                  disabled={today > date || user.tutor}
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
          onClick={handleClick}
          className="ui black deny button"
          disabled={today > date || (claas.Tutor && user.id !== claas.Tutor.id)} //==
        >
          Deny
        </button>
        <button
          type="submit"
          className="ui positive right labeled icon button"
          disabled={today > date || (claas.Tutor && user.id !== claas.Tutor.id)} //==
        >
          Apply
          <i className="plus icon"></i>
        </button>
      </div>
    </Modal>
  );
}

export class ClassList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      claas: null,
      week: week,
      user: null,
      date: "",
    };
    this.onClose = this.onClose.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.previousWeek = this.previousWeek.bind(this);
    // console.log(localStorage.user);
  }

  onClose = () => {
    this.setState({ open: false });
  };

  setOpen = (e, claas) => {
    if (!claas && JSON.parse(localStorage.user).tutor) return;
    if (
      claas &&
      claas.Student &&
      claas.Student.id !== JSON.parse(localStorage.user).id //==
    )
      return;
    const date = week.find((day) => day.getDate() === e.target.id.slice(0, 2)); //==
    // console.log(claas);
    // console.log(e.target);
    date.setHours(e.target.id.slice(3, 5));
    date.setMinutes(0);
    date.setSeconds(0);
    this.setState({ date });
    this.setState({ claas });
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
    axios
      .get(`/api/users/${JSON.parse(localStorage.user).id}`)
      .then((response) => this.setState({ user: response.data.user }));
  }

  // TODO merge with tutorclasslist
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
          {this.props.classes.length ? (
            this.props.classes.map((claas) => {
              if (
                claas.Tutor.name
                  .toLowerCase()
                  .includes(this.state.tutor.toLowerCase())
              ) {
                return (
                  <div key={claas.id} className="ui item">
                    <div className="content">
                      {claas.start}-{claas.end} with
                      <NavLink
                        to={`/users/${claas.tutorId}`}
                        className="header"
                      >
                        <b> {claas.Tutor.name}</b>
                      </NavLink>
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
        <table className="ui ten column celled table">
          <thead>
            <tr>
              <th onClick={this.previousWeek}>Previous week</th>
              <th>Start</th>
              {this.state.week.map((day) => {
                return (
                  <th key={day.getDate()}>
                    {day.getMonth() + 1}. {day.getDate()}
                  </th>
                );
              })}
              <th onClick={this.nextWeek}>Next week</th>
            </tr>
          </thead>
          <tbody>
            {this.props.classes[0] && this.props.classes[0].start
              ? hours.map((hour) => {
                  return (
                    <tr key={hour}>
                      <td></td>
                      <td className="column">{hour + 8}:00</td>
                      {this.state.week.map((day) => {
                        // const weekDay = this.state.week[day];
                        const c = this.props.classes.find(
                          (
                            claas //==
                          ) =>
                            claas.start.slice(5, 7) === day.getMonth() + 1 &&
                            claas.start.slice(8, 10) === day.getDate() &&
                            claas.start.slice(11, 13) <= hour + 8 &&
                            claas.end.slice(11, 13) > hour + 8
                        );
                        return (
                          <Cell
                            key={`${day}.${hour}`}
                            day={day}
                            hour={hour}
                            claas={c}
                            setOpen={this.setOpen}
                          />
                        );
                      })}
                      <td></td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {/* <button onClick={this.setOpen(null)}>try function</button> */}

        <Form
          date={this.state.date}
          open={this.state.open}
          onClose={this.onClose}
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
)(ClassList);
