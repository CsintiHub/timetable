import { Component } from "react";
import axios from "axios";

export class TutorList extends Component {
  // const dispatch = useDispatch();
  // const [subject, setSubject] = useState("");
  // const handleSubmit = (e) => {
  //   console.log(e);
  // };
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      tutors: [],
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // this.props.fetchTutors();
    axios
      .get("/api/tutors")
      // .then((res) => res.json())
      .then((response) => this.setState({ tutors: response.data.tutors }));
  }
  // useEffect(() => {
  //   dispatch(fetchTutors());
  // }, [dispatch]);

  // handleChange = (e) => {
  //   console.log(e);
  // };

  render() {
    return (
      <div>
        {/* <form className="ui form" onSubmit={handleSubmit}> */}
        <select
          name="subject"
          multiple=""
          className="ui fluid dropdown"
          onChange={(e) => this.setState({ subject: e.target.value })}
        >
          <option value="">Subject</option>
          <option value="math">Math</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
          <option value="geography">Geography</option>
        </select>
        <div className="ui relaxed divided list">
          {this.state.tutors.map((tutor) => {
            if (tutor.subject.includes(this.state.subject))
              return (
                <div className="item">
                  <i className="large user middle aligned icon"></i>
                  <div className="content">
                    <a
                      href={`/users/${tutor.id}`}
                      className="header"
                      key={tutor.id}
                    >
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
      </div>
    );
  }
}
