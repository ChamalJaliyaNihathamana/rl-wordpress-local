import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
// hook-forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormResetPassword, ResetPasswordSchema } from "./ResetPasswordSchema";
// redux
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/auth/auth.actions";
// ui
import Title from "../../../shared/components/Title/Title";
import { ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { FormInputText } from "../../../shared/components/FormComponents/FormInputText";
import CustomButton from "../../../shared/components/Button/CustomButton";
// icons
import { ArrowLeft, LockFill } from "react-bootstrap-icons";

interface PasswordResetSuccessProps {}

const PasswordResetSuccess: React.FunctionComponent<
  PasswordResetSuccessProps
> = () => {
  // state
  const dispatch: Dispatch<any> = useDispatch();

  // navigate
  let navigate = useNavigate();

  // hook-forms
  const methodsRPE = useForm<FormResetPassword>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const {
    handleSubmit: RPEhandleSubmit,
    control: RPEcontrol,
    setValue: RPEsetValue,
    watch: RPEwatch,
  } = methodsRPE;

  // submit forgot password
  const onSubmitRPE = (data: FormResetPassword) => {
    dispatch(changePassword(data.email));
    console.log(JSON.stringify(data, null, 2));
    setTimeout(() => navigate("/reset-password/check-mail"), 3000);
  };
  return (
    <span className="reset-password mdl-py-5 rl_reset_password rl_forgotpassword_section">
      <Title icon={<LockFill />} className="modal-title">
        <p>Forgot Password ?</p>
      </Title>
      <span className="sub-para mb-4">
        No worries, we will send you a password reset link
      </span>
      <Form onSubmit={RPEhandleSubmit(onSubmitRPE)} className="form">
        <Form.Group className="mb-3">
          <Row>
            <Col xs={4} className="form-group text-start">
              <FormInputText
                name="email"
                label="Enter your email address"
                placeholder="Enter Your Email Address"
                control={RPEcontrol}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <ButtonGroup>
                <CustomButton type="submit" className="btn btn-primary">
                  Send Confirmation
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
    </span>
  );
};

export default PasswordResetSuccess;
