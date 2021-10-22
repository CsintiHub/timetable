import { useState, Component } from "react";
import { fetchTutors, fetchTutorsbySubject } from "../actions/tutors";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

class TutorList extends Component {
  // const dispatch = useDispatch();
  // const [subject, setSubject] = useState("");
  // const handleSubmit = (e) => {
  //   console.log(e);
  // };
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchTutors();
  }
  // useEffect(() => {
  //   dispatch(fetchTutors());
  // }, [dispatch]);

  handleChange = (e) => {
    console.log(e);
  };

  render() {
    const tutors = this.props.tutors;
    <div>
      {/* <form className="ui form" onSubmit={handleSubmit}> */}
      <select
        name="subject"
        multiple=""
        className="ui fluid dropdown"
        onChange={(e) => this.setState({ value: e.target.value })}
      >
        <option value="">Subject</option>
        <option value="math">Math</option>
        <option value="physics">Physics</option>
        <option value="chemistry">Chemistry</option>
        <option value="biology">Biology</option>
        <option value="geography">Geography</option>
      </select>
      <div className="ui relaxed divided list">
        {tutors.map((tutor) => {
          if (tutor.subject.includes(this.state.subject))
            return (
              <div className="item">
                <i className="large user middle aligned icon"></i>
                <div className="content">
                  <a href={`/user/${tutor.id}`} className="header">
                    {tutor.name}
                  </a>
                  <div className="description">
                    {tutor.subject}
                    <div className="ui star rating" data-rating="3"></div>
                  </div>
                </div>
              </div>
            );
        })}
      </div>
    </div>;
  }
}

// BandsListPage.propTypes = {
//   tutors: PropTypes.array.isRequired,
//   fetchTutors: PropTypes.func.isRequired,
// };

function mapStateToProps(state) {
  return {
    bands: state.tutors,
  };
}

export default connect(mapStateToProps, { fetchTutors, fetchTutorsbySubject })(
  TutorList
);

//ez a sok szar, vagy marad function és propként átadom neki a tutorokat az Appban
