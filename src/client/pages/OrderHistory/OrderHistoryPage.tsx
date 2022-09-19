import React from "react";
import { Container } from "react-bootstrap";
import OrderHistory from "./OrderHistory";

interface OrderHistoryPageProps {
  orderList: any[];
}

interface OrderHistoryPageState {}

class OrderHistoryPage extends React.Component<
  OrderHistoryPageProps,
  OrderHistoryPageState
> {
  constructor(props: OrderHistoryPageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid>
        <OrderHistory orderList={this.props.orderList} />
      </Container>
    );
  }
}

export default OrderHistoryPage;
