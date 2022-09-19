import { ButtonGroup } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import CustomButton from "../../Button/CustomButton";

function ActionCellRenderer(props: any) {
  // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <span className="text-muted">
      <ButtonGroup>
        <CustomButton icon={<PencilSquare />}></CustomButton>
        <CustomButton icon={<TrashFill />}></CustomButton>
      </ButtonGroup>
      {/* $&nbsp;<span>{cellValue}</span> */}
    </span>
  );
}

export default ActionCellRenderer;
