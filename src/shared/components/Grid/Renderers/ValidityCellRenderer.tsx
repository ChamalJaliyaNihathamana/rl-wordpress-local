import React from "react";
import { format, endOfDay, differenceInDays } from "date-fns";
import { Badge } from "react-bootstrap";

function ValidityCellRenderer(props: any) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  var reverseDate = cellValue.split("/").reverse().join("/");

  const today = format(endOfDay(new Date()), "yyyy/MM/dd");
  const expireDate = format(endOfDay(new Date(reverseDate)), "yyyy/MM/dd");

  const result = differenceInDays(new Date(expireDate), new Date(today));
  

  let validity;

  switch (true) {
    case result > 0 && result !== 1:
      validity = (
        <Badge bg="success" text="white">
          valid for {result} days
        </Badge>
      );
      break;
    case result === 1:
      validity = (
        <Badge bg="success" text="white">
          valid for {result} day
        </Badge>
      );
      break;
    case result < 0 && result !== -1:
      validity = (
        <Badge bg="danger" text="white">
          expired {result * -1} days ago
        </Badge>
      );
      break;
    case result === -1:
      validity = (
        <Badge bg="danger" text="white">
          expired {result * -1} day ago
        </Badge>
      );
      break;
    default:
      validity = (
        <Badge bg="warning" text="white">
          Will Expire Soon
        </Badge>
      );
  }

  return <span>{validity}</span>;
}

export default ValidityCellRenderer;
