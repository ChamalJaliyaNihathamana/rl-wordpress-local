import SpinnerComponent from "react-bootstrap/Spinner";

interface SpinnerProps {}

const Spinner: React.FunctionComponent<SpinnerProps> = () => {
  return (
    <span className="spinner">
      <SpinnerComponent
        animation="border"
        role="status"
        className="spinner-inner"
      >
        <span className="visually-hidden">Loading...</span>
      </SpinnerComponent>
    </span>
  );
};

export default Spinner;
