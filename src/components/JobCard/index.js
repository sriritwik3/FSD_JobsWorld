// This component is used to render job cards  in database
import "./index.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faFileAlt,
  faMapMarkerAlt,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { Component } from "react/cjs/react.production.min";

class JobCard extends Component {
  // This function is used to add and remove job from whishlist.
  onClickStar = async () => {
    const { user, jobDetails } = this.props;
    console.log(user);
    const { id } = jobDetails;
    const apiUrl = `http://localhost:3004/shortlist?user_id=${user.uid}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    if (fetchedData.length === 0) {
      // creating a shortlist object in the backend if it is not present.
      const shortlistObject = {
        user_id: user.uid,
        shortlisted_ids: [id],
      };
      const options = {
        method: "POST",
        body: JSON.stringify(shortlistObject),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch("http://localhost:3004/shortlist", options);
      if (response.ok === true) {
        alert("Added to wishlist...");
      }
    } else {
      // Removing job if it is already present in shortlist of the user
      const shortlist = fetchedData[0].shortlisted_ids;
      if (shortlist.includes(id)) {
        
        const index = shortlist.indexOf(id);
        shortlist.splice(index, 1);

        const shortlistObject = {
          id: fetchedData.id,
          user_id: user.uid,
          shortlisted_ids: shortlist,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(shortlistObject),
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch(
          `http://localhost:3004/shortlist/${fetchedData[0].id}`,
          options
        );
        if (response.ok === true) {
          alert("Removed from wishlist...");
        }
      } else {
        // Adding job if it is not present in shortlist of the user
        shortlist.push(id);

        const shortlistObject = {
          id: fetchedData.id,
          user_id: user.uid,
          shortlisted_ids: shortlist,
        };

        const options = {
          method: "PUT",
          body: JSON.stringify(shortlistObject),
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await fetch(
          `http://localhost:3004/shortlist/${fetchedData[0].id}`,
          options
        );
        if (response.ok === true) {
          alert("Added to wishlist...");
        }
      }
    }
    // This function fetches shortlisted jobs and re-renders the component
    const { getShortlistedJobs } = this.props;
    getShortlistedJobs();
  };

  //This function is called when apply btn is clicked
  onClickApplyBtn = async () => {
    const { user, jobDetails } = this.props;
    const { id } = jobDetails;
    const apiUrl = `http://localhost:3004/applicants?post_id=${id}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    if (fetchedData.length === 0) {
      // If the user is first applicant
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
    const { getAppliedJobs } = this.props;
    getAppliedJobs(); // This will fetch the applied jobs again and re-render the component
  };

  // Rendering job card
  render() {
    const { jobDetails, isShortlisted, isAppliedJob } = this.props;
    const {
      id,
      jobTitle,
      companyName,
      reviews = 7999,
      salary,
      jobDescription,
      companyLocation,
      jobType,
      posted = "2 days ago",
    } = jobDetails;

    const contractIcon = <FontAwesomeIcon icon={faBusinessTime} />;
    const rupeeIcon = <FontAwesomeIcon icon={faRupeeSign} />;
    const locationIcon = <FontAwesomeIcon icon={faMapMarkerAlt} />;
    const descriptionIcon = <FontAwesomeIcon icon={faFileAlt} />;

    const { user } = this.props;

    return (
      <>
        <div className="job-card-container">
          <div className="job-card-container-header">
            <h1 className="job-card-role">{jobTitle}</h1>
            {isShortlisted ? (
              <i
                className="fas fa-star job-card-save-btn-filled"
                onClick={this.onClickStar}
              ></i>
            ) : (
              <i
                className="far fa-star job-card-save-btn"
                onClick={this.onClickStar}
              ></i>
            )}
          </div>
          <div className="job-card-company-reviews">
            <p className="job-card-company">{companyName}</p>
            <p className="job-card-reviews">{reviews} Reviews</p>
          </div>
          <div className="job-card-features-container">
            <div className="job-card-feature">
              {contractIcon}
              <p className="job-card-feature-value">{jobType}</p>
            </div>
            <div className="job-card-feature">
              {rupeeIcon}
              <p className="job-card-feature-value">{salary}</p>
            </div>
            <div className="job-card-feature">
              {locationIcon}
              <p className="job-card-feature-value">{companyLocation}</p>
            </div>
          </div>
          <div className="job-card-description-container">
            {descriptionIcon}
            <p className="job-card-description">
              {jobDescription.slice(0, 120)} ...
            </p>
          </div>
          <div className="job-card-footer">
            <p className="job-card-posted">{posted}</p>
            <div>
              <Link to={`jobs/${id}`}>
                <button className="job-card-view-details-btn" type="button">
                  View Details
                </button>
              </Link>
              {isAppliedJob ? (
                <button
                  className="job-card-apply-btn"
                  type="button"
                  onClick={this.onClickApplyBtn}
                >
                  Discard
                </button>
              ) : (
                <button
                  className="job-card-apply-btn"
                  type="button"
                  onClick={this.onClickApplyBtn}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default JobCard;
