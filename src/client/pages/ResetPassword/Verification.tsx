import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import { RootState } from "../../../redux/store";
import { emailVerification } from "../../../redux/auth/auth.actions";
// ui
import { Modal } from "react-bootstrap";
import { Exclamation, Check } from "react-bootstrap-icons";
import { CustomModal } from "../../../shared/components/Modal/CustomModal";
import Title from "../../../shared/components/Title/Title";

interface VerificationProps {}

const Verification: React.FunctionComponent<VerificationProps> = () => {
  // state
  const dispatch: Dispatch<any> = useDispatch();
  const emailVerify: boolean = useSelector(
    (state: RootState) => state.auth.emailVerifySuccess
  );
  // navigate
  let navigate = useNavigate();
  // useState
  const [verified, setVerified] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [showModalEmailVerification, setShowModalEmailVerification] =
    React.useState(true);
  const toggleModalEmailVerification = () => {
    setShowModalEmailVerification((v) => !v);
  };
  // useEffect
  React.useEffect(() => {
    // getuserById
  }, []);

  React.useEffect(() => {
    if (searchParams) {
      setSearchParams(searchParams);
      const token = searchParams.get("token");
      const id = searchParams.get("id");
      if (token && id) {
        setTimeout(() => dispatch(emailVerification(token, +id)), 2000);
        setTimeout(() => navigate("/reset-password/set-new-password"), 3000);
      }
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (emailVerify) {
      setVerified(true);
    }
  }, [emailVerify]);

  return (
    <CustomModal
      showConfirmCallToAction={true}
      show={showModalEmailVerification}
      close={toggleModalEmailVerification}
      footer={false}
      header={false}
      headerTitle=""
    >
      <Modal.Body className="reset-password reset-pwd-modal">
        {verified ? (
          <>
            <Check className="modal-icon" />
            <Title className="modal-title">VERIFIED</Title>
          </>
        ) : (
          <>
            <Exclamation className="modal-icon" />
            <Title className="modal-title">EMAIL VERIFICATION</Title>
          </>
        )}
      </Modal.Body>
    </CustomModal>
  );
};

export default Verification;
