import * as React from "react";
// redux
import store from "./redux/store";
import { Provider } from "react-redux";
// styles and toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/sass/main.scss";
// routes
import MainRoutes from "./Routes";

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <div>
      <Provider store={store}>
        <React.Suspense
          fallback={
            <>
              <span>Loading...</span>
            </>
          }
        >
          <MainRoutes />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </React.Suspense>
      </Provider>
    </div>
  );
};

export default App;
