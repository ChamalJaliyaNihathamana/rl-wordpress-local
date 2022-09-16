import * as React from "react";
// ui
import ProfileSummary from "./ProfileSummary";
import { Col, Container, Row } from "react-bootstrap";
// model
import { UserProfileModel } from "../../model/UserProfile";

interface DashboardPageProps {
  currentUser: UserProfileModel;
}

const DashboardPage: React.FunctionComponent<DashboardPageProps> = ({currentUser}) => {

  React.useEffect(() => {}, []);
  return (
    <>
      <Container>
        <Row className="dashboard-row">
          <Col md="auto">
            <ProfileSummary currentUser={currentUser} />
          </Col>
        </Row>
        {/* <BannerCard advertisementData={advertisementData} /> */}
      </Container>
    </>
  );
};

export default DashboardPage;
