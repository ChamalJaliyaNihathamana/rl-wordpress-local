import React from "react";

import ModalContent from "./ModalContent";
import ModalOverlay from "./ModalOverlay";
import ModalButton from "./ModalButton";
import { Props } from "./Modal.interfaces";

export default function ModalPortal({
  id,
  ariaLabel,
  btnClassName,
  btnIcon,
  modalIcon,
  btnContent,
  center = false,
  children,
  footerChildren,
  size = "lg",
  scrollable = false,
  staticBackdrop = false,
  title,
  headerTitle,
}: Props) {

  const [open, setOpen] = React.useState(false);
  const btnOpenRef = React.useRef<HTMLButtonElement>(null);
  const btnCloseRef = React.useRef<HTMLButtonElement>(null);
  const modalNode = React.useRef<HTMLDivElement>(null);
  const ESCAPE_KEY = "Escape";

  React.useEffect(() => {
    if (open) {
      btnCloseRef.current!.focus();
    } else {
      btnOpenRef.current!.focus();
    }
  }, [open]);

  function toggleScrollLock() {
    document.querySelector("body")!.classList.toggle("modal-open");
  }

  const onOpen = () => {
    setOpen(true);
    toggleScrollLock();
  };

  const onClose = () => {
    setOpen(false);
    toggleScrollLock();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ESCAPE_KEY) {
      onClose();
    }
  };

  const onClickAway = (event: any) => {
    if (modalNode.current && !modalNode.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <>
      <ModalContent
        modalIcon={modalIcon}
        ariaLabel={ariaLabel}
        buttonRef={btnCloseRef}
        center={center}
        footerChildren={footerChildren}
        open={open}
        mainChildren={children}
        modalRef={modalNode}
        onClickAway={onClickAway}
        onClose={onClose}
        onKeyDown={onKeyDown}
        size={size}
        scrollable={scrollable}
        staticBackdrop={staticBackdrop}
        title={title}
        headerTitle={headerTitle}
      />
      {open && <ModalOverlay />}

      <ModalButton
        onClick={onOpen}
        className={btnClassName}
        buttonRef={btnOpenRef}
        icon={btnIcon}
      >
        {btnContent}
      </ModalButton>
    </>
  );
}
