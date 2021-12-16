import "./index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Features = (props) => {
  const { featureDetails } = props;
  const { featureIcon, featureHeading, featureDescription } = featureDetails;
  console.log(featureIcon);
  return (
    <li className="home-feature-container">
      <FontAwesomeIcon icon={featureIcon} className="home-feature-icon" />
      <h1 className="home-feature-heading">{featureHeading}</h1>
      <p className="home-feature-description">{featureDescription}</p>
    </li>
  );
};

export default Features;
