import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import Geocode from "react-geocode";
import { useDispatch } from "react-redux";


import {
  clearRegisterBrokerageAddress,
  clearRegistrationAddress,
  clearUpdateProfileAddress,
  getRegisterAddress,
  getRegisterBrokerageAddress,
  getUpdateProfileAddress,
} from "../../../redux/auth/auth.actions";

import { LocationInfoObject } from "../../model/Location";
import { Dispatch } from "react";
import { clearPickupAddress, getPickupAddress } from "../../../redux/PickupAddress/pickup.actions";

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

interface PlacesSearchProps {
  type: string;
  name?: string;
  control?: any;
}

const PlacesSearch: React.FunctionComponent<PlacesSearchProps> = ({ type }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const [value, setValue] = React.useState<PlaceType | null | any>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const [addressType, setAddressType] = React.useState("");
  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );
  // const autocomplete = new google.maps.places.Autocomplete(input, options);

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      switch (addressType) {
        case "prop":
          // dispatch(clearPropertyAddress());
          break;
        case "registration":
          dispatch(clearRegistrationAddress());
          break;
        case "updateProfile":
          dispatch(clearUpdateProfileAddress());
          break;
        case "registrationBrokerage":
          dispatch(clearRegisterBrokerageAddress());
          break;
        case "pickup":
          dispatch(clearPickupAddress());
          break;
        case "creditCard":
          // dispatch(clearBillingAddress());
          break;
        default: {
          break;
        }
      }

      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });
    if (value && value.description) {
      Geocode.setApiKey("AIzaSyDoUWCuNupwwoUvdomHMxixBpv6llm-M7Y");
      Geocode.fromAddress(value.description).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log("📍 Coordinates: ", { lat, lng });

          Geocode.fromLatLng(lat.toString(), lng.toString()).then(
            (response) => {
              const formattedAddress = response.results[0].formatted_address;
              let city, state, country, postalCode;
              for (
                let i = 0;
                i < response.results[0].address_components.length;
                i++
              ) {
                for (
                  let j = 0;
                  j < response.results[0].address_components[i].types.length;
                  j++
                ) {
                  switch (response.results[0].address_components[i].types[j]) {
                    case "locality":
                      city =
                        response.results[0].address_components[i].long_name;
                      break;
                    case "administrative_area_level_1":
                      state =
                        response.results[0].address_components[i].long_name;
                      break;
                    case "country":
                      country =
                        response.results[0].address_components[i].long_name;
                      break;
                    case "postal_code":
                      postalCode =
                        response.results[0].address_components[i].long_name;
                      break;
                  }
                }
              }
              console.log(city, state, country, postalCode);
              console.log(formattedAddress);
              let locationData: LocationInfoObject = {
                coordinates: {
                  lat,
                  lng,
                },
                address: {
                  city,
                  state,
                  country,
                  postalCode,
                  formattedAddress,
                },
              };

              switch (type) {
                case "prop": {
                  // dispatch(getPropertyAddress(locationData));
                  setAddressType("prop");
                  break;
                }
                case "registration": {
                  dispatch(getRegisterAddress(locationData));
                  setAddressType("registration");
                  break;
                }
                case "updateProfile": {
                  dispatch(getUpdateProfileAddress(locationData.address));
                  setAddressType("updateProfile");
                  break;
                }
                case "registrationBrokerage": {
                  dispatch(getRegisterBrokerageAddress(locationData));
                  setAddressType("registrationBrokerage");
                  break;
                }
                case "pickup": {
                  dispatch(getPickupAddress(locationData));
                  setAddressType("pickup");
                  break;
                }
                case "creditCard": {
                  // dispatch(getBillingAddress(locationData));
                  setAddressType("creditCard");
                  break;
                }
                default: {
                  break;
                }
              }

              //   setLocationInfoObject({
              //     address: {
              //       city: city,
              //       state: state,
              //       country: country,
              //       postal_code: postal_code,
              //       formatted_address: address,
              //     },
              //     coordinates: { lat: lat, lng: lng },
              //   });
              //
            },
            (error) => {
              console.error(error);
            }
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Mailing Address" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};
export default PlacesSearch;
