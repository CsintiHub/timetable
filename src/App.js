import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./components/auth/Login";
// import { StudentSignup } from "./components/auth/StudentSignup";
// import { TutorSignup } from "./components/auth/TutorSignup";
import { Layout } from "./components/Layout";
import { Signup } from "./components/auth/Signup";
import { Profile } from "./components/Profile";
import { ClassList } from "./components/ClassList";
import TutorList from "./components/TutorList";

export function App() {
  // const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} />
          </Route>
          <Route path="/tutors">
            <TutorList />
          </Route>
          {/* <PrivateRoute path="/playlists/:playlistId?/:trackId?">
            <Playlists />
          </PrivateRoute>
          <PrivateRoute path="/tracks">
            <Tracks />
          </PrivateRoute> */}
          {/* <Route exact path="/student" setUser={}>
            <StudentSignup />
          </Route>
          <Route exact path="/tutor" setUser={}>
            <TutorSignup />
          </Route> */}
          <Route path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/user/:id/classes">
            <ClassList user={user} />
          </Route>

          {/* <Route path="/tutor/search/:subject?" user={user}>
            <TutorSignup />
          </Route> */}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

// const PrivateRoute = ({ children, ...props }) => {
//   const isLoggedIn = useSelector(getIsLoggedIn);
//   return <Route {...props}>{isLoggedIn ? children : <Redirect to="/" />}</Route>;
// };
