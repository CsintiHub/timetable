import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { rateUser } from "../actions/users";
import { connect } from "react-redux";
import { fetchRatings, addRating } from "../actions/ratings";
import { compose } from "redux";

// TutorProfile?
class OtherProfile extends React.Component {
  constructor(props) {
    super(props);

    //TODO check if it works with fast loading
    const tutor = axios
      .get(`/api/tutors/${this.props.match.params.id}`)
      .then((res) => this.setState({ tutor: res.data.tutor }));

    //  TODO create redux store
    // const rating = axios.get(`/users/${this.props.match.params.id}/rating`);

    this.state = {
      comment: "",
      tutor,
      rating: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //TODO rating
  handleSubmit = (e) => {
    e.preventDefault();
    const { comment, rating } = this.state;
    // axios
    //   .post(`/users/${this.props.match.params.id}/rating`, { comment, rating })
    //   .then((response) => {
    //     if (response.success) window.alert("Rating successful");
    //   });
    this.props.addRating({ comment, rating }, this.props.match.params.id);
  };

  async componentDidMount() {
    //   const id = this.props.match.params.id;
    //   axios
    //     .get(`/api/tutors/${id}`)
    //     .then((res) => this.setState({ tutor: res.data.tutor }));

    await this.props.fetchRatings(this.props.match.params.id);
  }

  render() {
    // const id = this.props.match.params.id;
    // const user = axios.get(`/api/tutors/${id}`);
    return (
      <div>
        <div>Name: {this.state.tutor.name}</div>

        <div>
          <div>Subject: {this.state.tutor.subject}</div>
          <div
            className="ui star rating"
            data-rating="4"
            data-max-rating="5"
          ></div>
        </div>
        <NavLink to={`/tutors/${this.props.match.params.id}/classes`}>
          Check out classes
        </NavLink>
        <div>
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
        </div>
        {/* ¨TODO can only rate if they had class */}
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
                onBlur={(e) => this.setStateState({ comment: e.target.value })}
              ></textarea>
            </div>
            <div className="ui submit button">Submit</div>
          </form>
        </div>
      </div>
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
)(OtherProfile);
