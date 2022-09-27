import * as React from "react";
import LoginForm from "./LoginForm";

import { ButtonGroup, Col, Container, Row, Image } from "react-bootstrap";

import Logo from "../../../assets/img/logo.png";
import { ArrowLeft } from "react-bootstrap-icons";
import CustomButton from "../../../shared/components/Button/CustomButton";
import Title from "../../../shared/components/Title/Title";

interface LoginPageProps {}

interface LoginPageState {}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {/* <Header type="auth" /> */}
        <Container fluid>
          <Row className="loginPage__leftbg rl_login_block">
            <Col md={4} className="login-page__body__hero-img-container d-none d-md-block">
              <Image
                className="left-banner"
                src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                fluid
              />
            </Col>
            <Col md={8} className="my-md-auto auth-form">
              <Col md={12} className="rl_back_login">
                <ButtonGroup>
                  <CustomButton
                    icon={< ArrowLeft className="arrow-left" />}
                    className="back-btn rl-back-btn">
                    Back to home
                  </CustomButton>
                </ButtonGroup>
              </Col>
              <Col md={8}>
                <Title className="home-subtitle text-start">Welcome to </Title>
                <Image
                  src={Logo}
                  className="login-page__body__login-form--logo"
                />
                <LoginForm />
              </Col>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default LoginPage;
