import React from "react";

export interface FormInputProps {
  onChange?: any;
  data?: any;
  view?: any;
  defaultValue?: any;
  name: string;
  control: any;
  label?: string;
  setValue?: any;
  type?: string;
  endAdornment?: React.ReactElement;
  startAdornment?: React.ReactElement;
  options?: any;
  placeholder?: string;
  direction?: string;
  iconPosition?: "start" | "end";
  maxRows?: any;
  disabled?: boolean;
  checked?: boolean;
}
