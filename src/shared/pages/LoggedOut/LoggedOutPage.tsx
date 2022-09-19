import React from "react";
import { useNavigate } from "react-router-dom";
// ui
import Title from "../../components/Title/Title";
import { ButtonGroup, Row, Col, Image, Container } from "react-bootstrap";
import CustomButton from "../../components/Button/CustomButton";
import { ArrowLeft } from "react-bootstrap-icons";
interface LoggedOutPageProps {}

const LoggedOutPage: React.FunctionComponent<LoggedOutPageProps> = () => {
  const navigate = useNavigate();
  const logo = require("../../../assets/img/logo.png");

  return (
    <Container>
      <div className="rl-logout-block">
        <div>
          <Row>
            <Col>
              <Title className="mb-5"> You are logged out</Title>
              <Image src={logo} className="nav-brand-img" />
            </Col>
          </Row>
          <Row className="mt-5 rl-logout-btn">
            <Col className="col-md-auto">
              <CustomButton
                className="btn btn-primary login__cta--signin"
                onClick={() => navigate("/login")}
              >
                Sign In
              </CustomButton>
            </Col>
            <Col className="col-md-auto">
              <CustomButton
                className="btn btn-primary login__cta--signin"
                onClick={() => navigate("/register")}
              >
                New Account
              </CustomButton>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <ButtonGroup>
                <CustomButton
                  icon={<ArrowLeft className="arrow-left" />}
                  className="back-btn custom-back-btn"
                >
                  Back to home
                </CustomButton>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default LoggedOutPage;
