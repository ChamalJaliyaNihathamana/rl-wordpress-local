import * as React from "react";
import { Col, Figure, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserProfileModel } from "../../model/UserProfile";


interface ProfileSummaryProps {
  currentUser: UserProfileModel;
}

const ProfileSummary: React.FunctionComponent<ProfileSummaryProps> = ({
  currentUser,
}) => {
  let user: any;
  const _user = localStorage.getItem("user");
  if (_user) {
    user = JSON.parse(_user);
    // console.log("user", user.user);
  }
  return (
    <Link to="/update-profile">
      {currentUser && user ? (
        <Row className="avatar">
          <Col xs={3} className="avatar__image-box">
            <Figure>
              <Figure.Image
                className="avatar__image"
                src={currentUser.photo_filename}
              />
              
            </Figure>
          </Col>
          <Col xs={9} className="avatar__text-box avatar_logo">
            <h1 className="avatar__text-box--avatar-name">
              {currentUser.first_name} {currentUser.last_name}
            </h1>
            <Figure>
              <Figure.Image src={currentUser.logo_filename} />
            </Figure>
            {/* <p className="avatar__text-box--org">{org}</p> */}
          </Col>
        </Row>
      ) : null}
    </Link>
  );
};

export default ProfileSummary;
