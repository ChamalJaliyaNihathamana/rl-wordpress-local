import React from "react";
import { useNavigate } from "react-router-dom";
// ui
import CustomButton from "../../../shared/components/Button/CustomButton";
import Title from "../../../shared/components/Title/Title";
import { ButtonGroup, Col, Form, Row } from "react-bootstrap";
import {  ArrowLeft ,CheckCircleFill } from "react-bootstrap-icons";

interface PasswordResetPageSuccessProps {}

const PasswordResetPageSuccess: React.FunctionComponent<
  PasswordResetPageSuccessProps
> = () => {
  const navigate = useNavigate();
  const continueClicked = () => {
    setTimeout(() => navigate("/"), 1000);
  };
  return (
    <>
      <div className="rl_forgotpassword_section">
        <Title icon={<CheckCircleFill />} className="modal-title">
          Password Reset
        </Title>
        <span className="sub-para">
          Your password has been successfully reset!
          <br />
        </span>
        <Form className="form">
          <Form.Group className="form-group mb-3 mt-4">
            <Row>
              <Col>
                <CustomButton onClick={continueClicked}>Sign In</CustomButton>
              </Col>
            </Row>
            <Row className="forogt_back_link">
            <Col>
              <ButtonGroup>
                <CustomButton
                  icon={<ArrowLeft className="arrow-left" />}
                  className="back-btn rl-back-btn"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </CustomButton>
              </ButtonGroup>
            </Col>
          </Row>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default PasswordResetPageSuccess;
