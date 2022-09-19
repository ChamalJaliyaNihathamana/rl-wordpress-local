import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../../redux/auth/auth.actions";
import {  RootState } from "../../../redux/store";

// ui
import CustomButton from "../../../shared/components/Button/CustomButton";
import Title from "../../../shared/components/Title/Title";
import { ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { ArrowLeft, EnvelopeFill } from "react-bootstrap-icons";

interface PasswordResetPageSuccessProps {}

const PasswordResetPageSuccess: React.FunctionComponent<
  PasswordResetPageSuccessProps
> = () => {
  // state
  const dispatch: Dispatch<any> = useDispatch();
  const userEmail : string = useSelector((state: RootState) => state.auth.resetPasswordEmail);
  

  const navigate = useNavigate();

  const resendConfirmationHandler = () => {
    dispatch(changePassword(userEmail));
  };
  return (
    <>
    <div className="custom_checkmail_section rl_forgotpassword_section">
    <Title icon={<EnvelopeFill />} className="modal-title">
        Check your email.
      </Title>
      <span className="sub-para">We sent a password reset link to <span className="rl-emailtext"> &nbsp; {userEmail}</span></span>
      <Form className="form">
        <Form.Group className="mb-3 mt-4">
          <Row>
            <Col>
              <ButtonGroup>
                <CustomButton onClick={resendConfirmationHandler}>
                  Resend Confirmation
                </CustomButton>
              </ButtonGroup>
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
