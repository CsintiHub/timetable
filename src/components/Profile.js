import React from "react";
import { NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import { rateUser } from "../actions/users";
import { connect } from "react-redux";

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      rating: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //TODO rating
  handleSubmit = (e) => {
    e.preventDefault();
    const { comment, rating } = this.state;
    this.props.rateUser({ comment, rating });
    // .then(() => this.setState({ redirect: true }));
  };

  render() {
    const user = this.props.user;
    return (
      <div>
        <div>Name: {user.name}</div>
        <div>Subject: {user.subject}</div>
        <div
          className="ui star rating"
          data-max-rating="5"
          data-rating={this.props.rating}
        >
          Rating
        </div>
        <NavLink to={`/users/${user.id}/classes`}>Check out classes</NavLink>
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
              onBlur={(e) => this.setStateState({ comment: e.target.value })}
            ></textarea>
          </div>
          <input type="submit" className="ui button">
            Rate
          </input>
          <div className="ui submit button">Submit</div>
        </form>
      </div>
    );
  }
}

// Profile.propTypes = {
//   // bands: PropTypes.array.isRequired,
//   users: PropTypes.array.isRequired,
//   rateUser: PropTypes.func.isRequired,
// };

function mapStateToProps(state) {
  return {
    users: state.users,
    rating: state.rating,
  };
}

export default connect(mapStateToProps, { rateUser })(Profile);
