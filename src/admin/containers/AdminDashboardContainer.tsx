import React from "react";
import { Route, Routes } from "react-router-dom";

// ui
import DrawerLeft from "../../shared/components/Drawer/Drawer";
import Header from "../../shared/components/Header/Header";

const AdminDashboard = React.lazy(
  () => import("../pages/AdminDashboard/AdminDashboard")
);

const AdvertisementContainer = React.lazy(
  () => import("./AdvertisementContainer")
);
interface AdminDashboardContainerProps {
}

interface AdminDashboardContainerState {}

class AdminDashboardContainer extends React.Component<
  AdminDashboardContainerProps,
  AdminDashboardContainerState
> {
  state = {};

  dashboardRoutes = (
    <Routes>
      <Route
        path="/admin-dashboard"
        element={<AdminDashboard  />}
      />
      <Route path="/advertisement/*" element={<AdvertisementContainer />} />
    </Routes>
  );

  render() {
    return (
      <>
        <Header type="admin" />
        <DrawerLeft type="admin" children={this.dashboardRoutes} />
      </>
    );
  }
}

export default AdminDashboardContainer

