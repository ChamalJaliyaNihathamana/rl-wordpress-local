import * as React from "react";
import RegistrationForm from "./RegistrationForm";
import Title from "../../components/Title/Title";
import { ButtonGroup ,Col, Container, Row, Image } from "react-bootstrap";
import { ArrowLeft, PersonFill } from "react-bootstrap-icons";
import CustomButton from "../../components/Button/CustomButton";
interface RegisterPageProps {}

interface RegisterPageState {}

class RegisterPage extends React.Component<
  RegisterPageProps,
  RegisterPageState
> {
  constructor(props: RegisterPageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {/* <Header type="auth" /> */}
        <Container fluid>
          <Row className="registerPage__leftbg rl_register_block">
            <Col md={4} className="d-none d-md-block">
              <Image
                src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                fluid
                className="left-banner"
              />
            </Col>
            <Col md={8} className="my-md-auto auth-form">
            <Col md={12} className="rl_back_signup">
                <ButtonGroup>
                  <CustomButton
                    icon={< ArrowLeft className="arrow-left" />}
                    className="back-btn rl-back-btn">
                    Back to home
                  </CustomButton>
                </ButtonGroup>
              </Col>
              <Col md={10}>
              <Title icon={<PersonFill />} className="home-subtitle">
                Register an Account
              </Title>
              <RegistrationForm />
              </Col>
              </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default RegisterPage;
