import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { withRouter } from "../../hoc/withRouter/withRouter";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAdvertisementList } from "../../redux/advertisemnet/advertisment.selectors";
// model
import { AdvertisementModel } from "../../shared/model/Advertisement";

const Advertisement = React.lazy(
  () => import("../pages/Advertisement/Advertisement")
);

const AdvertisementList = React.lazy(
  () => import("../pages/Advertisement/AdvertisementList")
);

interface AdvertisementContainerProps {
  advertisementData: AdvertisementModel[];
}

interface AdvertisementContainerState {}

class AdvertisementContainer extends React.Component<
  AdvertisementContainerProps,
  AdvertisementContainerState
> {
  state = {};
  render() {
    return (
      <Routes>
        <Route path="/:id" element={<Advertisement />} />
        <Route
          path="/"
          element={
            <AdvertisementList
              AdvertisementsData={this.props.advertisementData}
            />
          }
        />
      </Routes>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  advertisementData: selectAdvertisementList,
});

export default withRouter(connect(mapStateToProps)(AdvertisementContainer));
