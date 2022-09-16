import React from "react";

import { MainChildren, ModalSize } from "./shared.types";

export interface Props {
  id?: number;
  ariaLabel: string;
  btnClassName?: string;
  btnContent?: React.ReactNode;
  center?: boolean;
  children: MainChildren;
  footerChildren?: MainChildren;
  size?: ModalSize;
  scrollable?: boolean;
  staticBackdrop?: boolean;
  title?: string;
  btnIcon?: React.ReactElement;
  isOpen?: boolean;
  modalIcon?: React.ReactElement;
  headerTitle?: string;
}
