// This component is used to get the job details of the particular job from the backend.
import "./index.css";
import { Component } from "react";

import JobItem from "../JobItem";

class JobItemDetails extends Component {
  state = {
    jobDetails: {
      skills: [],
    },
    appliedJobs: [],
  };

  componentDidMount() {
    this.getJobDetails();
    this.getAppliedJobs();
  }

  //This function is used to get all applied jobs of the user.
  getAppliedJobs = async () => {
    const { user } = this.props;
    const apiUrl = `http://localhost:3004/user_applications?user_id=${user.uid}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    this.setState({ appliedJobs: fetchedData[0].post_ids });
  };

  // This function is used to get job details of the partivular job.
  getJobDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params; // collecting the id from url

    const apiUrl = `http://localhost:3004/jobs/${id}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    const updatedData = {
      id: fetchedData.id,
      companyDescription: fetchedData.company_description,
      companyLocation: fetchedData.company_location,
      companyName: fetchedData.company_name,
      educationLevel: fetchedData.education_level,
      id: fetchedData.id,
      jobDescription: fetchedData.job_description,
      jobTitle: fetchedData.job_title,
      jobType: fetchedData.job_type,
      numberOfPostings: fetchedData.number_of_postings,
      roleCategory: fetchedData.role_category,
      salary: fetchedData.salary,
      skills: fetchedData.skills,
      workExperience: fetchedData.work_experience,
    };
    this.setState({ jobDetails: updatedData });
  };

  //This function is used to apply for the job
  onClickApplyBtn = async () => {
    const { user } = this.props;
    const { jobDetails } = this.state;
    const { id } = jobDetails;
    const apiUrl = `http://localhost:3004/applicants?post_id=${id}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    // If the user is first applicant for the job.
    if (fetchedData.length === 0) {
      const ApplicantObject = {
        post_id: id,
        applicant_ids: [user.uid],
      };

      const options = {
        method: "POST",
        body: JSON.stringify(ApplicantObject),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch("http://localhost:3004/applicants", options);
      if (response.ok === true) {
        alert("Applied Successfully");
      }
    } else {
      // if the user already applied for the job then the application will be discarded.
      const applied_list = fetchedData[0].applicant_ids;
      if (applied_list.includes(user.uid)) {
        const index = applied_list.indexOf(user.uid);
        applied_list.splice(index, 1);

        const applicantObject = {
          id: fetchedData.id,
          post_id: id,
          applicant_ids: applied_list,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(applicantObject),
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch(
          `http://localhost:3004/applicants/${fetchedData[0].id}`,
          options
        );
        if (response.ok === true) {
          alert("Application Removed Successfully...");
        }
      } else {
        //If the user did not apply for the job before
        applied_list.push(user.uid);

        const applicantObject = {
          id: fetchedData.id,
          post_id: id,
          applicant_ids: applied_list,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(applicantObject),
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch(
          `http://localhost:3004/applicants/${fetchedData[0].id}`,
          options
        );
        if (response.ok === true) {
          alert("Applied Successfully...");
        }
      }
    }

    // The below code is used to update the application ids of the user
    const apiUrl1 = `http://localhost:3004/user_applications?user_id=${user.uid}`;
    const response1 = await fetch(apiUrl1);
    const fetchedData1 = await response1.json();
    // If the user is first user to apply for the job
    if (fetchedData1.length === 0) {
      const userApplicationObject = {
        user_id: user.uid,
        post_ids: [id],
      };

      const options = {
        method: "POST",
        body: JSON.stringify(userApplicationObject),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:3004/user_applications",
        options
      );
    } else {
      // If the user already applied for the job then the application will be discarded
      const userApplications = fetchedData1[0].post_ids;
      if (userApplications.includes(id)) {
        const index = userApplications.indexOf(id);
        userApplications.splice(index, 1);

        const userApplicationObject = {
          id: fetchedData1[0].id,
          user_id: user.uid,
          post_ids: userApplications,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(userApplicationObject),
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch(
          `http://localhost:3004/user_applications/${fetchedData1[0].id}`,
          options
        );
      } else {
        // if the user did not apply for the job before.
        userApplications.push(id);

        const userApplicationObject = {
          id: fetchedData1[0].id,
          user_id: user.uid,
          post_ids: userApplications,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(userApplicationObject),
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch(
          `http://localhost:3004/user_applications/${fetchedData1[0].id}`,
          options
        );
      }
    }
    // This will fetch the data again and re-render the component
    this.getAppliedJobs();
  };

  // Calling JobITtem to display the job.
  render() {
    const { jobDetails, appliedJobs } = this.state;
    return (
      <JobItem
        jobDetails={jobDetails}
        isAppliedJob={appliedJobs.includes(jobDetails.id)}
        onClickApplyBtn={this.onClickApplyBtn}
      />
    );
  }
}

export default JobItemDetails;
