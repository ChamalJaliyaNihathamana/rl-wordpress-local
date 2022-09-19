import { AnyAction } from "redux";
import { PickupModel } from "../../client/model/Pickup";

// import model for pickup
export interface PickupState {
  pickupState: PickupModel;
  propertyData: any[];
}

const INITIAL_STATE = {
  pickupState: {
    pickupAddress: {
      coordinates: {
        lat: 0,
        lng: 0,
      },
      address: {
        city: "",
        state: "",
        country: "",
        postalCode: 0,
        formattedAddress: "",
      },
    },
    confirmLocation: "Yes",
    direction: "ads",
  },
  propertyData: [],
};

export const pickupReducer = (
  state: PickupState = INITIAL_STATE,
  action: AnyAction
): PickupState => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_PICKUP": {
      return { ...state, pickupState: payload.propertyData };
    }
    case "GET_PICKUP_ADDRESS": {
      return {
        ...state,
        pickupState: {
          ...state.pickupState,
          pickupAddress: payload.locationData,
        },
      };
    }
    case "CLEAR_PICKUP_ADDRESS": {
      console.log("first");
      return {
        ...state,
        pickupState: {
          ...state.pickupState,
          pickupAddress: {
            coordinates: {
              lat: 0,
              lng: 0,
            },
            address: {
              city: "",
              state: "",
              country: "",
              postalCode: 0,
              formattedAddress: "",
            },
          },
        },
      };
    }
    default:
      return state;
  }
};

export default pickupReducer;
