import { Figure } from "react-bootstrap";

function AvatarRenderer(props: any) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  return (
    <>
      {cellValue ? (
        <>
          <Figure>
            <Figure.Image
              className="avatar__image"
              src={cellValue.avatar}
              fluid
              roundedCircle
              style={{
                borderRadius: "50%",
                maxWidth: "3.5rem",
                maxHeight: "3.5rem",
              }}
            />
          </Figure>
          <span>{cellValue.name}</span>
        </>
      ) : null}
    </>
  );
}

export default AvatarRenderer;
