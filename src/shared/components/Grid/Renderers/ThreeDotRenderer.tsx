import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import CustomButton from "../../Button/CustomButton";

function ThreeDotRenderer(props: any) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  const buttonClicked = () => {
    // alert(`ID is ${cellValue}`);
    props.clicked(cellValue);
    console.log({ props });
  };
  return (
    <span className="text-muted">
      <ButtonGroup>
        <Button id={"three-dot"} onClick={() => buttonClicked()}>
          <ThreeDots />
        </Button>
      </ButtonGroup>
      {/* $&nbsp;<span>{cellValue}</span> */}
    </span>
  );
}

export default ThreeDotRenderer;
