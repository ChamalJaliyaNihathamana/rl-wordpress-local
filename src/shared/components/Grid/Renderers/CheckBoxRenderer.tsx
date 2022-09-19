import { Form } from "react-bootstrap";

function CheckBoxRenderer(props: any) {
  // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <Form.Check
      type="checkbox"
      // id={`default-${type}`}
      // label={`default ${type}`}
    />

    // <input
    //   type="checkbox"
    //   //   onClick={this.checkedHandler}
    //   //   checked={this.props.value}
    // />
  );
}

export default CheckBoxRenderer;
