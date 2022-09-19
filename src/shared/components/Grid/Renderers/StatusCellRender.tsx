import { Badge } from "react-bootstrap";
import { toTitleCase } from "../../../../utils/TitleCase";


function StatusCellRenderer(props: any) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  let styledBadge;

  switch (cellValue) {
    case "Luxury":
    case "luxury":
      styledBadge = (
        <Badge bg="warning" text="dark">
          {toTitleCase(cellValue)}
        </Badge>
      );
      break;

    case "Recurring":
    case "recurring":
      styledBadge = (
        <Badge bg="dark" text="white">
          {toTitleCase(cellValue)}
        </Badge>
      );
      break;
    case "One Time":
    case "one time":
      styledBadge = (
        <Badge bg="light" text="dark">
          {toTitleCase(cellValue)}
        </Badge>
      );
      break;
    case "Rejected":
      styledBadge = (
        <Badge bg="danger" text="light">
          {toTitleCase(cellValue)}
        </Badge>
      );
      break;
    case "Active":
      styledBadge = (
        <Badge bg="success" text="light">
          {toTitleCase(cellValue)}
        </Badge>
      );
      break;
    case "Pending":
      styledBadge = (
        <Badge bg="" style={{ backgroundColor: "#fa6209" }} text="light">
          {toTitleCase(cellValue)}
        </Badge>
      );
      break;
    default:
      styledBadge = (
        <Badge bg="info" text="white">
          {toTitleCase(cellValue)}
        </Badge>
      );
  }

  return <span>{styledBadge}</span>;
}

export default StatusCellRenderer;
