// This component is used to render all the applicants of the particular job post
import { Component } from "react";
import "./index.css";

import Applicant from "../Applicant";

class Applicants extends Component {
  state = { applicantIds: [] };

  componentDidMount() {
    this.getApplicants();
  }

  //This function is used to redirect to resume page of the applicant
  renderResume = async (userId) => {
    const { history } = this.props;
    const apiUrl = `http://localhost:3004/resumes?user_id=${userId}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    const resumeId = fetchedData[0].id;
    history.push(`/resumes/${resumeId}`);
  };

  // This function is used to get all the applicants of the post
  getApplicants = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const apiUrl = `http://localhost:3004/applicants?post_id=${id}`;
    const response = await fetch(apiUrl);
    let fetchedData = await response.json();
    if (fetchedData.length === 0) {
      const apiUrl = `http://localhost:3004/applicants`;
      const postObject = {
        post_id: id,
        applicant_ids: [],
      };
      const options = {
        method: "POST",
        body: JSON.stringify(postObject),
        headers: {
          "Content-type": "application/json",
        },
      };
      await fetch(apiUrl, options);
      const newResponse = await fetch(
        `http://localhost:3004/applicants?post_id=${id}`
      );
      fetchedData = await newResponse.json();
    }
    this.setState({ applicantIds: fetchedData[0].applicant_ids });
  };

  render() {
    const { applicantIds } = this.state;

    return (
      <>
        <div className="applied-applicants-container">
          <div className="applied-applicants-table-header">
            <p className="applicant-card-name-heading">Name</p>
            <p className="applicant-card-email-heading">Email</p>
            <p className="applicant-card-resume-heading">Resume</p>
          </div>
          <div className="applied-applicants-table">
            {applicantIds.map((eachId) => {
              const onClickViewResume = () => {
                this.renderResume(eachId);
              };
              return (
                //This component is used to render each applicant details
                <Applicant
                  userId={eachId}
                  key={eachId}
                  renderResume={onClickViewResume}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Applicants;
