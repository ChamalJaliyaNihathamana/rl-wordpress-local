import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Spinner from "../../shared/components/Spinner/Spinner";
import { withRouter } from "../../hoc/withRouter/withRouter";



const ForgotPasswordPage = React.lazy(
  () => import("../pages/ResetPassword/ForgotPasswordPage")
);

const EmailVerificationPage = React.lazy(
  () => import("../pages/ResetPassword/Verification")
);
const CheckYourEmailPage = React.lazy(
  () => import("../pages/ResetPassword/CheckYourEmailPage")
);
const SetNewPasswordPage = React.lazy(
  () => import("../pages/ResetPassword/SetNewPasswordPage")
);
const PasswordResetSuccess = React.lazy(
  () => import("../pages/ResetPassword/PasswordResetSuccessPage")
);
interface ResetPasswordContainerProps {}

interface ResetPasswordContainerState {}

class ResetPasswordContainer extends React.Component<
  ResetPasswordContainerProps,
  ResetPasswordContainerState
> {
  state = {};
  render() {
    return (
      <>
        <Container>
          <React.Suspense
            fallback={
              <>
                <span>Loading...</span>
                <Spinner />
              </>
            }
          >
            <Routes>
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/check-mail" element={<CheckYourEmailPage />} />
              <Route
                path="/password-verify"
                element={<EmailVerificationPage />}
              />
              <Route
                path="/set-new-password"
                element={<SetNewPasswordPage />}
              />
              <Route
                path="/reset-password-success"
                element={<PasswordResetSuccess />}
              />
            </Routes>
          </React.Suspense>
        </Container>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({});

export default withRouter(connect(mapStateToProps)(ResetPasswordContainer));
