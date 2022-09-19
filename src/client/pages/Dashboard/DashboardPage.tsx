import * as React from "react";
// ui
import ProfileSummary from "./ProfileSummary";
import { Col, Container, Row } from "react-bootstrap";
// model
import { UserProfileModel } from "../../model/UserProfile";
import { AdvertisementModel } from "../../../shared/model/Advertisement";
import BannerCard from "../../components/Banner/BannerCard";

interface DashboardPageProps {
  currentUser: UserProfileModel;
  advertisementData: AdvertisementModel;
}

const DashboardPage: React.FunctionComponent<DashboardPageProps> = ({
  currentUser,
  advertisementData,
}) => {
  React.useEffect(() => {}, []);
  return (
    <>
      <Container>
        <Row className="dashboard-row">
          <Col md="auto">
            <ProfileSummary currentUser={currentUser} />
          </Col>
        </Row>
        <BannerCard advertisementData={advertisementData} />
      </Container>
    </>
  );
};

export default DashboardPage;
