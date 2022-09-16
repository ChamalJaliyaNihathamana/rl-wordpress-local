import React from "react";
import { Props } from "./ModalButton.interfaces";

export default function ModalButton({
  buttonRef,
  children,
  type = "button",
  icon,
  ...rest
}: Props) {
  return (
    <button ref={buttonRef} type={type} {...rest}>
      {icon ? <span className="button-icon">{icon}</span> : null}
      {children}
    </button>
  );
}
