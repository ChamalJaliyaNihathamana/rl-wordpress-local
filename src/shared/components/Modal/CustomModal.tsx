import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../Button/CustomButton";


export const CustomModal = React.forwardRef((props: any, ref) => {
  const {
    backdrop,
    show,
    confirmButtonText,
    confirmButtonAction,
    showConfirmCallToAction,
    size,
  } = props;
  const [showModal, setShowModal] = useState<boolean>();

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  const handleClose = () => {
    setShowModal(false);
    props.close();
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size={size}
      centered
      backdrop={backdrop}
    >
      {props.header ? (
        <Modal.Header closeButton>
          <Modal.Title>{props.headerTitle}</Modal.Title>
        </Modal.Header>
      ) : null}

      <>
        {props.children}
        {props.footer ? (
          <Modal.Footer>
            <CustomButton variant="secondary" onClick={handleClose}>
              Close
            </CustomButton>
            {showConfirmCallToAction && showConfirmCallToAction === true && (
              <CustomButton
                variant="primary"
                className="ModalButton"
                onClick={confirmButtonAction}
              >
                {confirmButtonText}
              </CustomButton>
            )}
          </Modal.Footer>
        ) : null}
      </>
    </Modal>
  );
});
