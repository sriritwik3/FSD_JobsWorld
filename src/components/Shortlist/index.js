// This component is used to render all shortlisted pages of the user.
import { Component } from "react/cjs/react.production.min";
import "./index.css";

import ShortlistItem from "../ShortlistItem";

class Shortlist extends Component {
  state = {
    jobs: [],
    shortlistedJobs: [],
    appliedJobs: [],
  };

  componentDidMount() {
    this.getShortlistedJobs();
    this.getAllJobs();
    this.getAppliedJobs();
  }

  // This function is used to get all jobs from db.
  getAllJobs = async () => {
    const apiUrl = `http://localhost:3004/jobs`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    this.setState({ jobs: fetchedData });
  };

  // This function is used to get the shortlisted jobs of the user
  getShortlistedJobs = async () => {
    const { user } = this.props;
    const apiUrl = `http://localhost:3004/shortlist?user_id=${user.uid}`;
    const response = await fetch(apiUrl);
    let fetchedData = await response.json();
    console.log(fetchedData);
    if (fetchedData.length === 0) {
      console.log("In");
      const apiUrl = `http://localhost:3004/shortlist`;
      const userObject = {
        user_id: user.uid,
        shortlisted_ids: [],
      };
      const options = {
        method: "POST",
        body: JSON.stringify(userObject),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(apiUrl, options);
      const newResponse = await fetch(
        `http://localhost:3004/shortlist?user_id=${user.uid}`
      );
      fetchedData = await newResponse.json();
    }
    this.setState({ shortlistedJobs: fetchedData[0].shortlisted_ids });
  };

  // This component is used to get applied jobs of the user.
  getAppliedJobs = async () => {
    const { user } = this.props;
    const apiUrl = `http://localhost:3004/user_applications?user_id=${user.uid}`;
    const response = await fetch(apiUrl);
    let fetchedData = await response.json();
    if (fetchedData.length === 0) {
      const apiUrl = `http://localhost:3004/user_applications`;
      const userObject = {
        user_id: user.uid,
        post_ids: [],
      };
      const options = {
        method: "POST",
        body: JSON.stringify(userObject),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(apiUrl, options);
      const newResponse = await fetch(
        `http://localhost:3004/shortlist?user_id=${user.uid}`
      );
      fetchedData = await newResponse.json();
    }
    this.setState({ appliedJobs: fetchedData[0].post_ids });
  };

  // This function is executed when a job is removed from the shortlist.
  onRemoveShortlistedJob = () => {
    this.getShortlistedJobs();
  };

  onClickApply = () => {
    this.getAppliedJobs();
  };

  // Renders all the shortlisted jobs.
  render() {
    const { user, history } = this.props;
    const { shortlistedJobs, jobs, appliedJobs } = this.state;
    const filteredJobs = jobs.filter((eachJob) => {
      return shortlistedJobs.includes(eachJob.id);
    });
    const updatedData = filteredJobs.map((eachObject) => ({
      companyDescription: eachObject.company_description,
      companyLocation: eachObject.company_location,
      companyName: eachObject.company_name,
      educationLevel: eachObject.education_level,
      id: eachObject.id,
      jobDescription: eachObject.job_description,
      jobTitle: eachObject.job_title,
      jobType: eachObject.job_type,
      numberOfPostings: eachObject.number_of_postings,
      roleCategory: eachObject.role_category,
      salary: eachObject.salary,
      skills: eachObject.skills,
      workExperience: eachObject.work_experience,
    }));
    if (shortlistedJobs.length === 0) {
      return (
        <div className="empty-shortlist-container">
          <h1 className="empty-shortlist-heading">Oops...</h1>
          <p className="empty-shortlist-description">
            Your wishlist is empty...
          </p>
        </div>
      );
    }
    return updatedData.map((eachJob) => {
      return (
        <ShortlistItem
          onClickApply={this.onClickApply}
          isAppliedJob={appliedJobs.includes(eachJob.id)}
          jobDetails={eachJob}
          user={user}
          key={eachJob.id}
          onRemoveShortlistedJob={this.onRemoveShortlistedJob}
        />
      );
    });
  }
}

export default Shortlist;
