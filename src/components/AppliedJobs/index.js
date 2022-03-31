// This Component is used to display all the jobs which are applied by the user.

import { Component } from "react/cjs/react.production.min";
import "./index.css";

import AppliedJobItem from "../AppliedJobItem";

class AppliedJobs extends Component {
  state = {
    jobs: [],
    appliedJobs: [],
  };

  componentDidMount() {
    this.getAppliedJobs();
    this.getAllJobs();
  }

  // This function is used to get all the jobs in DB
  getAllJobs = async () => {
    const apiUrl = `http://localhost:3004/jobs`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    this.setState({ jobs: fetchedData });
  };

  // This function is used to get the jobs which are applied by the user
  getAppliedJobs = async () => {
    const { user } = this.props;
    const apiUrl = `http://localhost:3004/user_applications?user_id=${user.uid}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    this.setState({ appliedJobs: fetchedData[0].post_ids });
  };

  // Rendering all the jobs applied by the iser in profile
  render() {
    const { user } = this.props;
    const { appliedJobs, jobs } = this.state;
    const filteredJobs = jobs.filter((eachJob) => {
      return appliedJobs.includes(eachJob.id);
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
    if (updatedData.length === 0) {
      return (
        <div className="empty-shortlist-container">
          <h1 className="empty-shortlist-heading">Oops...</h1>
          <p className="empty-shortlist-description">
            You have not applied for any Jobs...
          </p>
        </div>
      );
    } else {
      return updatedData.map((eachJob) => {
        return (
          <AppliedJobItem
            user={user}
            jobDetails={eachJob}
            key={eachJob.id}
            getAppliedJobs={this.getAppliedJobs}
          />
        );
      });
    }
  }
}

export default AppliedJobs;
