import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let user: any;
  const _user = localStorage.getItem("user");

  if (_user) {
    user = JSON.parse(_user);
    // console.log("user", user.user);
  }
  if (user) {
    if (user.user.admin_roles) {
      // console.log("___admin");
      return {
        auth: true,
        role: user.user.admin_roles[0].role,
      };
    } else {
      // console.log("___user");
      // console.log(user);
      return {
        auth: true,
        role: "user",
      };
    }
  } else {
    console.log("___null");
    return {
      auth: false,
      role: null,
    };
  }
};

//protected Route state
type ProtectedRouteType = {
  roleRequired?: "owner" | "admin" | "user" | "super_admin";
};

const ProtectedRoutes = (props: any) => {
  const { auth, role } = useAuth();

  //if the role required is there or not
  if (props.roleRequired) {
    // console.log(role, "roles");
    return auth ? (
      props.roleRequired.includes(role) ? (
        <Outlet />
      ) : (
        <Navigate to="/denied" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return auth ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
