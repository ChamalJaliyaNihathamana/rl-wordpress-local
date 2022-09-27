import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const DashboardContainer = React.lazy(
  () => import("./client/containers/DashboardContainer")
);
const AdminDashboardContainer = React.lazy(
  () => import("./admin/containers/AdminDashboardContainer")
);

const LoggedOutPage = React.lazy(
  () => import("./shared/pages/LoggedOut/LoggedOutPage")
);

const ForgotPasswordPage = React.lazy(
  () => import("./client/pages/ResetPassword/ForgotPasswordPage")
);
const RegisterPage = React.lazy(
  () => import("./shared/pages/Register/RegisterPage")
);

const InnerContent = React.lazy(
  () => import("./shared/containers/InnerContent/InnerContent")
);
const ProtectedRoutes = React.lazy(
  () => import("./shared/containers/ProtectedRoutes/ProtectedRoutes")
);
const PublicRoutes = React.lazy(
  () => import("./shared/containers/PublicRoutes/PublicRoutes")
);

const LoginPage = React.lazy(() => import("./shared/pages/Login/Login"));

const PermissionDenied = React.lazy(
  () => import("./shared/pages/PermissionDenied/PermissionDenied")
);
const NotFound = React.lazy(() => import("./shared/pages/NotFound/NotFound"));

const MainRoutes = () => (
  <Routes>
    {/** Protected Routes */}
    <Route path="/" element={<ProtectedRoutes />}>
      <Route path="/" element={<InnerContent />}>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/*" element={<DashboardContainer />} />
        <Route
          path="admin"
          element={
            <ProtectedRoutes roleRequired={["admin", "super_admin", "owner"]} />
          }
        >
          <Route path="/admin/*" element={<AdminDashboardContainer />} />
        </Route>
      </Route>
    </Route>

    {/** Public Routes */}
    <Route path="/" element={<PublicRoutes />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/logged-out" element={<LoggedOutPage />} />
      <Route path="/reset-password/*" element={<ForgotPasswordPage />} />
    </Route>

    {/** Permission denied route */}
    <Route path="/denied" element={<PermissionDenied />} />
    <Route path="/not-found" element={<NotFound />} />
  </Routes>
);

export default MainRoutes;
