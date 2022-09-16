import React from "react";
import { Route, Routes } from "react-router-dom";
import { withRouter } from "../../hoc/withRouter/withRouter";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/auth/auth.selectors";
// ui
import Spinner from "../../shared/components/Spinner/Spinner";
import DrawerLeft from "../../shared/components/Drawer/Drawer";
import Header from "../../shared/components/Header/Header";
// model
import { UserProfileModel } from "../model/UserProfile";

const DashboardPage = React.lazy(
  () => import("../components/Dashboard/DashboardPage")
);


interface DashboardContainerProps {
  currentUser: UserProfileModel;
}

const DashboardContainer: React.FunctionComponent<DashboardContainerProps> = ({
  currentUser,

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
            />
          }
        />
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
});

export default withRouter(connect(mapStateToProps)(DashboardContainer));
