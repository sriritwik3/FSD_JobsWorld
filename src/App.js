import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AllJobsSection from "./components/AllJobsSection";
import JobItemDetails from "./components/JobItemDetails";
import PostJobForm from "./components/PostJobForm";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Resume from "./components/Resume";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import AppliedApplicants from "./components/AppliedApplicants";
import ResumeDetails from "./components/ResumeDetails";
import EditJobForm from "./components/EditJobForm";
import EditResume from "./components/EditResume";
import AdminPage from "./components/AdminPage";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
  const [user] = useAuthState(auth);
  const history = useHistory();
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/postjobs"
          component={() => <PostJobForm user={user} history={history} />}
        />
        <ProtectedRoute
          exact
          path="/profile"
          component={() => <Profile user={user} history={history} />}
        />
        <Route exact path="/reset" component={ResetPassword} />
        <ProtectedRoute
          exact
          path="/uploadresume"
          component={() => <Resume user={user} />}
        />
        <Route
          exact
          path="/jobs"
          component={({ match }) => (
            <AllJobsSection user={user} match={match} />
          )}
        />
        <Route
          exact
          path="/jobs/:id"
          component={({ match }) => (
            <JobItemDetails user={user} match={match} />
          )}
        />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/jobs/:id/applicants"
          component={AppliedApplicants}
        />
        <Route path="/user-resumes/:id" component={ResumeDetails} />
        <Route path="/edit-job/:id" component={EditJobForm} />
        <Route
          exact
          path="/edit-resume/:id"
          component={() => <EditResume user={user} />}
        />
        <Route exact path="/admin" component={AdminPage} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
