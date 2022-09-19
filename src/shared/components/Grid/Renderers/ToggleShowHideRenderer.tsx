import React from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function ToggleShowHideRenderer(props: any) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <span>
    {cellValue === "true" || cellValue === true ? (
      <EyeFill/>
    ) : (
     <EyeSlashFill/>
    )}{" "}
    &nbsp;
  </span>
  );
}

export default ToggleShowHideRenderer;
