import { Component } from "react";
import Resume from "./Resume"

class EditResume extends Component {
  state = {
    resumeDetails: {
      skills: {},
    },
  };

  componentDidMount() {
    this.getresumeDetails();
  }

  getresumeDetails = async () => {
    const { user } = this.props;

    const Url = `http://localhost:3004/resumes?user_id=${user.uid}`;
    const res = await fetch(Url);
    const fetchedData = await res.json();

    const updatedData = {
      user_id: fetchedData[0].user_id,
      firstName: fetchedData[0].firstName,
      lastName: fetchedData[0].lastName,
      currentCity: fetchedData[0].currentCity,
      postalCode: fetchedData[0].postalCode,
      email: fetchedData[0].email,
      phone: fetchedData[0].phone,
      degree: fetchedData[0].degree,
      fieldOfStudy: fetchedData[0].fieldOfStudy,
      college: fetchedData[0].college,
      year: fetchedData[0].year,
      jobTitle: fetchedData[0].jobTitle,
      company: fetchedData[0].company,
      jobCity: fetchedData[0].jobCity,
      jobYear: fetchedData[0].jobYear,
      jobDesc: fetchedData[0].jobDesc,
      skills: fetchedData[0].skills,
      id: fetchedData[0].id,
    };
    this.setState({ resumeDetails: updatedData });

  };

  renderResume = () => {
    const { user } = this.props
    const { resumeDetails } = this.state;
    return (
      <>
        <Resume user={user} resumeDetails={resumeDetails} />
      </>
    )
  }

  render() {
    return this.renderResume();
  }
}

export default EditResume;