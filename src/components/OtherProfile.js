import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { rateUser } from "../actions/users";
// import { connect } from "react-redux";

// TutorProfile?
class OtherProfile extends React.Component {
  constructor(props) {
    super(props);

    const tutor = axios
      .get(`/api/tutors/${this.props.match.params.id}`)
      .then((res) => this.setState({ tutor: res.data.tutor }));

    this.state = {
      comment: "",
      rating: 0,
      tutor,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //TODO rating
  handleSubmit = (e) => {
    e.preventDefault();
    // const { comment, rating } = this.state;
    // this.props.rateUser({ comment, rating });
    // .then(() => this.setState({ redirect: true }));
  };

  // componentDidMount() {
  //   const id = this.props.match.params.id;
  //   axios
  //     .get(`/api/tutors/${id}`)
  //     .then((res) => this.setState({ tutor: res.data.tutor }));
  // }

  render() {
    // const id = this.props.match.params.id;
    // const user = axios.get(`/api/tutors/${id}`);
    return (
      <div>
        <div>Name: {this.state.tutor.name}</div>

        <div>
          <div>Subject: {this.state.tutor.subject}</div>
          <div className="ui star rating" data-max-rating="5" data-rating="4">
            Rating
          </div>
        </div>
        <NavLink to={`/users/${this.props.match.params.id}/classes`}>
          Check out classes
        </NavLink>
        {this.state.tutor.tutor && (
          <div>
            <div>Rate tutor</div>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label>Rating</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  name="rating"
                  onChange={(e) => this.setState({ rating: e.target.value })}
                ></input>
              </div>
              <div className="field">
                <label>Comment</label>
                <textarea
                  rows="3"
                  name="comment"
                  onBlur={(e) =>
                    this.setStateState({ comment: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="ui submit button">Submit</div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

// Profile.propTypes = {
//   // bands: PropTypes.array.isRequired,
//   users: PropTypes.array.isRequired,
//   rateUser: PropTypes.func.isRequired,
// };

// function mapStateToProps(state) {
//   return {
//     // users: state.tutors,
//     rating: state.rating,
//   };
// }

// export default connect(mapStateToProps, { rateUser })(Profile);
export default withRouter(OtherProfile);
