import * as React from "react";
import { Button } from "react-bootstrap";
// import * as BSI from "react-bootstrap-icons";

interface CustomButtonProps {
  children?: React.ReactNode;
  onClick?: any;
  variant?: string;
  size?: any;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactElement;
  type?: "button" | "submit" | "reset" | undefined;
}
const CustomButton: React.FunctionComponent<CustomButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled,
  className = "",
  icon = "",

}) => (
  <Button
    variant={variant}
    size={size}
    onClick={onClick}
    disabled={disabled}
    className={className}
    type={type}
   
  >
    {icon ? <span className="button-icon">{icon}</span> : null}
    {children}
  </Button>
);

export default CustomButton;
