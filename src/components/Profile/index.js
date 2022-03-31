// This component is used to render profile of the user.
import "./index.css";
import { logout } from "../../firebase";

import { Component } from "react";

import Shortlist from "../Shortlist";
import PostedJobs from "../PostedJobs";
import AppliedJobs from "../AppliedJobs";
import ProfileResume from "../ProfileResume";

class Profile extends Component {
  state = { activeTab: "resume" };

  // To logout the user
  onCLickLogOutBtn = () => {
    const { history } = this.props;
    logout();
    window.location = "/login";
  };

  onClickResume = () => {
    this.setState({ activeTab: "resume" });
  };

  onClickShortlistedJobs = () => {
    this.setState({ activeTab: "shortlistedJobs" });
  };

  onClickPostedJobs = () => {
    this.setState({ activeTab: "postedJobs" });
  };

  onClickAppliedJobs = () => {
    this.setState({ activeTab: "appliedJobs" });
  };

  // To display resume of the user.
  renderResume = () => {
    const { user } = this.props;
    return <ProfileResume user={user} />;
  };

  // To display shortlisted jobs of the user.
  renderShortlistedJobs = () => {
    const { user } = this.props;
    return <Shortlist user={user} />;
  };

  // To display posted jobs of the user.
  renderPostedJobs = () => {
    const { user } = this.props;
    return <PostedJobs user={user} />;
  };

  // To display applied jobs of the user.
  renderAppliedJobs = () => {
    const { user } = this.props;
    return <AppliedJobs user={user} />;
  };

  renderSwitch = (activeTab) => {
    switch (activeTab) {
      case "resume":
        return this.renderResume();
      case "shortlistedJobs":
        return this.renderShortlistedJobs();
      case "postedJobs":
        return this.renderPostedJobs();
      case "appliedJobs":
        return this.renderAppliedJobs();
    }
  };

  render() {
    const { activeTab } = this.state;
    const { user } = this.props;
    return (
      <div className="profile-container">
        <div className="profile-left-container">
          <div className="profile-info">
            <div className="prf-img">
              <h1>{user.email.slice(0, 1).toUpperCase()}</h1>
            </div>
            <h4>
              {user.email.charAt(0).toUpperCase() + user.email.slice(1, -10)}
            </h4>
          </div>
          <div className="profile-tabs">
            {activeTab === "resume" ? (
              <button className="profile-page-btns active-tab">Resume</button>
            ) : (
              <button
                className="profile-page-btns"
                onClick={this.onClickResume}
              >
                Resume
              </button>
            )}
            {activeTab === "shortlistedJobs" ? (
              <button className="profile-page-btns active-tab">
                Shortlisted Jobs
              </button>
            ) : (
              <button
                className="profile-page-btns"
                onClick={this.onClickShortlistedJobs}
              >
                Shortlisted Jobs
              </button>
            )}
            {activeTab === "postedJobs" ? (
              <button className="profile-page-btns active-tab">
                Posted jobs
              </button>
            ) : (
              <button
                className="profile-page-btns"
                onClick={this.onClickPostedJobs}
              >
                Posted Jobs
              </button>
            )}
            {activeTab === "appliedJobs" ? (
              <button className="profile-page-btns active-tab">
                Applied Jobs
              </button>
            ) : (
              <button
                className="profile-page-btns"
                onClick={this.onClickAppliedJobs}
              >
                Applied Jobs
              </button>
            )}

            <button
              className="profile-page-btns"
              onClick={this.onCLickLogOutBtn}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="profile-right-container">
          {this.renderSwitch(activeTab)}
        </div>
      </div>
    );
  }
}

export default Profile;
