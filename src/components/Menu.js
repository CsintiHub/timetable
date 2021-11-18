import axios from "axios";
import { NavLink } from "react-router-dom";
// import logo from "../../assets/logo.png";

//TODO everything
export function Menu(/*user*/) {
  // const isLoggedIn = useSelector(getIsLoggedIn);
  // const user = useSelector(getUser);
  // const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    axios
      .get("/api/logout")
      .then((window.location.href = "/login"))
      .catch((error) => console.log(error));
  };

  return (
    <nav className="ui secondary menu">
      {/* <img src={logo} alt="" /> */}
      <NavLink className="item" to="/profile">
        <i className="user icon"></i> Profile
      </NavLink>
      <NavLink
        className="item"
        to={`/users/${JSON.parse(localStorage.user).id}/classes`}
      >
        <i className="list icon"></i> Classes
      </NavLink>
      <NavLink className="item" to="/tutors">
        <i className="search icon"></i> Tutors
      </NavLink>
      <button onClick={handleLogout} className="item ui link">
        <i className="power off icon"></i>Logout
      </button>
    </nav>
  );
}
