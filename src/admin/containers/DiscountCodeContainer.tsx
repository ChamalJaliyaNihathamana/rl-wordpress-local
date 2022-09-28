import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { withRouter } from "../../hoc/withRouter/withRouter";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDiscountCodesList } from "../../redux/discountCode/discountCode.selectors";

// model
import { DiscountCodeModel } from "../models/DiscountCode";
import { AddOnModel } from "../../shared/model/AddOn";

const DiscountCode = React.lazy(
  () => import("../pages/DiscountCode/DiscountCode")
);

const DiscountCodeList = React.lazy(
  () => import("../pages/DiscountCode/DiscountCodeList")
);

interface DiscountCodeContainerProps {
  discountCodesData: DiscountCodeModel[];
}

interface DiscountCodeContainerState {
  servicesData: AddOnModel[];
}

class DiscountCodeContainer extends React.Component<
  DiscountCodeContainerProps,
  DiscountCodeContainerState
> {
  state = {
    servicesData: [
      {
        id: "0",
        unit: "0-1500 Sq Ft",
        market: "market_1",
        name: "Large Print Size Images",
        price: 5,
        agentVisibility: true,
      },
      {
        id: "1",
        unit: "0-1500 Sq Ft",
        market: "market_1",
        name: "MLS",
        price: 75,
        agentVisibility: false,
      },
      {
        id: "2",
        unit: "0-1500 Sq Ft",
        market: "market_1",
        name: "Sign Post Install/Removal",
        price: 45,
        agentVisibility: true,
      },
      {
        id: "3",
        unit: "0-1500 Sq Ft",
        market: "market_1",
        name: "Lockbox Install/Removal",
        price: 15,
        agentVisibility: false,
      },
      {
        id: "4",
        unit: "0-1500 Sq Ft",
        market: "market_1",
        name: "Advance Editing  ",
        price: 30,
        agentVisibility: true,
      },
      {
        id: "5",
        unit: "0-1500 Sq Ft",
        market: "market_1",
        name: "Marketing Materials",
        price: 99,
        agentVisibility: true,
      },
    ],
  };
  render() {
    return (
      <Routes>
        <Route
          path="/*"
          element={<DiscountCode servicesData={this.state.servicesData} />}
        />
        <Route
          path="/discount-code-list/*"
          element={
            <DiscountCodeList
              discountCodesData={this.props.discountCodesData}
            />
          }
        />
      </Routes>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  discountCodesData: selectDiscountCodesList,
});

export default withRouter(connect(mapStateToProps)(DiscountCodeContainer));
