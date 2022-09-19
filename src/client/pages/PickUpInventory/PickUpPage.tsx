import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import PickUpForm from "./PickUpForm";

interface PickUpPageProps {}

interface PickUpPageState {}

class PickUpPage extends React.Component<
  PickUpPageProps,
  PickUpPageState
> {
  constructor(props: PickUpPageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>

          <Col md={10} className="pick-up mt-0 mb-5">   
            <PickUpForm />
          </Col>
      </Container>
    );
  }
}

export default PickUpPage;
