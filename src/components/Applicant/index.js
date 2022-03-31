//This Component is used to render each applicant details from the resume of the applicant
import "./index.css";

// Importing required Components
import { Component } from "react";
import { Link } from "react-router-dom";

class Applicant extends Component {
  state = { name: "", email: "" };

  componentDidMount() {
    this.getResume();
  }

  //This function is used to get the resume of the applicant
  getResume = async () => {
    const { userId } = this.props;
    const apiUrl = `http://localhost:3004/resumes?user_id=${userId}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    const name = fetchedData[0].firstName + " " + fetchedData[0].lastName;
    const email = fetchedData[0].email;
    this.setState({ name: name, email: email });
  };

  //Rendering the details of the applicant
  render() {
    const { name, email } = this.state;
    const { userId, renderResume } = this.props;
    return (
      <>
        <div className="applicant-card">
          <p className="applicant-card-name">{name}</p>
          <p className="applicant-card-email">{email}</p>
          <Link to={`/user-resumes/${userId}`}>
            <button className="applicant-card-btn">View Resume</button>
          </Link>
        </div>
      </>
    );
  }
}

export default Applicant;
