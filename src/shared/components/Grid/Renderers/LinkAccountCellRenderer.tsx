import { ButtonGroup } from "react-bootstrap";
import CustomButton from "../../Button/CustomButton";

function LinkAccountCellRenderer(props: any) {
  // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <span className="text-muted">
      <ButtonGroup>
        <CustomButton> Link Account</CustomButton>
      </ButtonGroup>
    </span>
  );
}

export default LinkAccountCellRenderer;
