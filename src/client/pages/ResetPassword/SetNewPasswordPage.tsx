import React, { Dispatch } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// hook-forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSetNewPassword, NewPasswordSchema } from "./ResetPasswordSchema";
// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setNewPassword } from "../../../redux/auth/auth.actions";
// model
import { ResetPasswordRequestModel } from "../../../shared/model/ResetPasswordRequest";
// ui
import { ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { ArrowLeft, KeyFill } from "react-bootstrap-icons";
import Title from "../../../shared/components/Title/Title";
import { FormInputText } from "../../../shared/components/FormComponents/FormInputText";
import CustomButton from "../../../shared/components/Button/CustomButton";

interface PasswordResetSuccessProps {}

const PasswordResetSuccess: React.FunctionComponent<
  PasswordResetSuccessProps
> = () => {
  // state
  const dispatch: Dispatch<any> = useDispatch();

  const userId: number | null = useSelector(
    (state: RootState) => state.auth.userId
  );
  const email: string | null = useSelector(
    (state: RootState) => state.auth.resetPasswordEmail
  );
  // navigate
  let navigate = useNavigate();

  // hook-forms
  const methodsRP = useForm<FormSetNewPassword>({
    resolver: yupResolver(NewPasswordSchema),
  });

  const { handleSubmit: RPhandleSubmit, control: RPcontrol } = methodsRP;

  const onSubmitRP = (data: FormSetNewPassword) => {
    console.log(JSON.stringify(data, null, 2));
    // const email = "buddikapbandara@gmail.com"
    let resetPasswordRequestData: ResetPasswordRequestModel = {
      userId,
      email,
      newPassword: data.password,
    };
    console.log(resetPasswordRequestData);
    dispatch(setNewPassword(resetPasswordRequestData));
    setTimeout(() => navigate("/reset-password/reset-password-success"), 1000);
  };
  return (
    <>
      <div className="rl_forgotpassword_section">
        <Title icon={<KeyFill />} className="modal-title">
          Create new password
        </Title>
        <span className="sub-para mb-4">
          Your password must be different to previously used passwords and must
          be at least 8 characters.
        </span>
        <Form onSubmit={RPhandleSubmit(onSubmitRP)} className="form">
          <Form.Group className="mb-2">
            <Row>
              <Col xs={4} className="form-group text-start">
                <FormInputText
                  name="password"
                  label="Create New Password"
                  control={RPcontrol}
                  type="password"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3">
            <Row>
              <Col xs={4} className="form-group text-start">
                <FormInputText
                  name="confirmPassword"
                  label="Confirm New Password"
                  control={RPcontrol}
                  type="password"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <ButtonGroup>
                  <CustomButton type="submit">Reset Password</CustomButton>
                </ButtonGroup>
              </Col>
            </Row>
            <Row className="forogt_back_link">
              <Col>
                <ButtonGroup>
                  <CustomButton
                    icon={<ArrowLeft className="arrow-left" />}
                    className="back-btn rl_back_btn"
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

export default PasswordResetSuccess;
