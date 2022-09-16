import axiosInstance from "../main";
import { refreshToken } from "../../redux/auth/auth.actions";
import TokenService from "../token.service";

import { Dispatch } from "react";
import { useDispatch } from "react-redux";

const AuthInterceptor = () => {
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const dispatch: Dispatch<any> = useDispatch();

  axiosInstance.interceptors.response.use(
    (res: any) => {
      return res;
    },
    async (err: any) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/auth/refresh", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default AuthInterceptor;
