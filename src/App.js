// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Layout } from "./components/Layout";
import { Signup } from "./components/auth/Signup";
import Profile from "./components/Profile";
import ClassList from "./components/ClassList";
import { TutorList } from "./components/TutorList";
// import OtherProfile from "./components/OtherProfile";
// import TutorClassList from "./components/TutorClassList";

export function App() {
  // const dispatch = useDispatch();
  // const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Login /*setUser={setUser}*/ />
          </Route>
          <Route exact path="/login">
            <Login /*setUser={setUser}*/ />
          </Route>
          <Route exact path="/signup">
            <Signup /*setUser={setUser}*/ />
          </Route>
          {/* TODO merge */}
          <Route exact path="/users/:id">
            <Profile /*user={user}*/ />
          </Route>
          <Route exact path="/tutors">
            <TutorList />
          </Route>
          <Route exact path="/users/:id/classes">
            <ClassList /*user={user}*/ />
          </Route>
          {/* <Route exact path="/tutors/:id/classes">
            <TutorClassList />
          </Route> */}
          {/* <Route exact path="/canvas">
            <Canvas />
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
