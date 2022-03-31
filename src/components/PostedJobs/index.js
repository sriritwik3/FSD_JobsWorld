// This component renders all the jobs posted by the user.
import { Component } from "react/cjs/react.production.min";
import "./index.css";

import PostedJobItem from "../PostedJobItem";

class PostedJobs extends Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    this.getAllJobs();
  }

  //This function is used to get all the jobs in db
  getAllJobs = async () => {
    const { user } = this.props;
    const apiUrl = `http://localhost:3004/jobs?user_id=${user.uid}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    this.setState({ jobs: fetchedData });
  };

  //This is used to display all the jobs posted by the user.
  render() {
    const { jobs } = this.state;
    const updatedData = jobs.map((eachObject) => ({
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
            You have not posted any Jobs...
          </p>
        </div>
      );
    } else {
      return updatedData.map((eachJob) => {
        return (
          <PostedJobItem
            jobDetails={eachJob}
            key={eachJob.id}
            getAllJobs={this.getAllJobs}
          />
        );
      });
    }
  }
}

export default PostedJobs;
