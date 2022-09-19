import React from "react";
import { Route, Routes } from "react-router-dom";
import { withRouter } from "../../hoc/withRouter/withRouter";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/auth/auth.selectors";
import { selectAdvertisementList } from "../../redux/advertisemnet/advertisment.selectors";
import { selectOrdersList } from "../../redux/order/order.selector";
// ui
import Spinner from "../../shared/components/Spinner/Spinner";
import DrawerLeft from "../../shared/components/Drawer/Drawer";
import Header from "../../shared/components/Header/Header";
// model
import { UserProfileModel } from "../model/UserProfile";
import { AdvertisementModel } from "../../shared/model/Advertisement";

const DashboardPage = React.lazy(
  () => import("../pages/Dashboard/DashboardPage")
);

const OrderHistoryPage = React.lazy(
  () => import("../pages/OrderHistory/OrderHistoryPage")
);

const PickUpPage = React.lazy(
  () => import("../pages/PickUpInventory/PickUpPage")
);

interface DashboardContainerProps {
  currentUser: UserProfileModel;
  advertisementData: AdvertisementModel[];
  orderList: any[];
}

const DashboardContainer: React.FunctionComponent<DashboardContainerProps> = ({
  currentUser,
  advertisementData,
  orderList,
}) => {
  const dashboardRoutes = (
    <React.Suspense
      fallback={
        <>
          <span>Loading...</span>
          <Spinner />
        </>
      }
    >
      <Routes>
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              currentUser={currentUser}
              advertisementData={advertisementData[0]}
            />
          }
        />
        <Route
          path="/order-history"
          element={<OrderHistoryPage orderList={orderList} />}
        />
        <Route path="/pick-up" element={<PickUpPage />} />
      </Routes>
    </React.Suspense>
  );
  return (
    <>
      <Header type="dashboard" />
      <DrawerLeft children={dashboardRoutes} />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  advertisementData: selectAdvertisementList,
  orderList: selectOrdersList,
});

export default withRouter(connect(mapStateToProps)(DashboardContainer));
