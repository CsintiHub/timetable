import React from "react";
import { NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import axios from "axios";
import { fetchRatings, addRating } from "../actions/ratings";

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      rating: 1,
      user: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //TODO rating
  handleSubmit = (e) => {
    e.preventDefault();
    const { comment, rating } = this.state;
    this.props.addRating({
      rating,
      comment,
      id: JSON.parse(localStorage.user).id,
    });
  };

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then((res) => this.setState({ user: res.data.user }));
  }

  render() {
    // const user = JSON.parse(localStorage.user);
    return (
      this.state.user && (
        <div>
          <div>Name: {this.state.user.name}</div>

          {this.state.user.tutor && (
            <div>
              <div>Subject: {this.state.user.subject}</div>
              <div
                className="ui star rating"
                data-max-rating="5"
                // data-rating={this.props.rating}
                data-rating="3"
              ></div>
            </div>
          )}
          <NavLink to={`/users/${this.props.match.params.id}/classes`}>
            Check out classes
          </NavLink>
          {/* <div>
            Ratings
            {this.props.ratings.map((rating) => {
              //TODO format
              return (
                <div key={rating.id}>
                  <div>{rating.rating}/5</div>
                  <div>{rating.comment}</div>
                </div>
              );
            })}
          </div> */}
          {this.state.user.tutor &&
            this.state.user.id !== JSON.parse(localStorage.user).id && (
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
                      onChange={(e) =>
                        this.setState({ rating: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="field">
                    <label>Comment</label>
                    <textarea
                      rows="3"
                      name="comment"
                      onBlur={(e) => this.setState({ comment: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="ui submit button">Submit</div>
                </form>
              </div>
            )}
        </div>
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    ratings: state.ratings,
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchRatings, addRating })
)(Profile);
