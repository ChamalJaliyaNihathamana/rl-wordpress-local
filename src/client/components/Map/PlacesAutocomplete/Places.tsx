import * as React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Form, FormGroup, InputGroup } from "react-bootstrap";
import Geocode from "react-geocode";
import { Search, X } from "react-bootstrap-icons";

interface PlacesAutocompleteProps {
  setLocationData?: any;
  placeholder?: string;
}
export interface LatLng {
  lat: any;
  lng: any;
}
export interface LocationInfoObject {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: {
    city: any | undefined | null;
    state: any | undefined | null;
    country: any | undefined | null;
    postal_code: any | undefined | null;
    formatted_address: any | undefined | null;
  };
}

export const PlacesAutocomplete: React.FunctionComponent<
  PlacesAutocompleteProps
> = ({ setLocationData, placeholder }) => {
  // const apiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

  const [latlng, setLatLng] = React.useState<LatLng>();
  const [locationInfoObject, setLocationInfoObject] =
    React.useState<LocationInfoObject>();

  React.useEffect(() => {
    setLocationInfoObject(locationInfoObject);

    // console.table(locationInfoObject);
    if (setLocationData) {
      setLocationData(locationInfoObject);

    }
  }, [locationInfoObject]);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: { country: "us" },
    },
    // debounce?: 300
  });

  const registerRef = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    getLocationData();
  };

  const handleClearInput = () => {
    setValue("");
  };

  const handleSelect = (data: any) => () => {
    setValue(data.description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: data.description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLatLng({ ...latlng, lat: lat, lng: lng });
        console.log({ lat, lng });
      })
      .catch((error) => {
        console.log("? Error: ", error);
      });
  };

  const getLocationData = () => {
    Geocode.setApiKey("AIzaSyDoUWCuNupwwoUvdomHMxixBpv6llm-M7Y");
    Geocode.fromLatLng(latlng?.lat, latlng?.lng).then(
      (response: any) => {
        const formatted_address = response.results[0].formatted_address;

        let city, state, country, postal_code, street_number;
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
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              case "postal_code":
                postal_code =
                  response.results[0].address_components[i].long_name;
                break;
              case "street_number":
                street_number =
                  response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        setLocationInfoObject({
          address: {
            city: city,
            state: state,
            country: country,
            postal_code: postal_code,
            formatted_address: formatted_address,
          },
          coordinates: { lat: latlng?.lat, lng: latlng?.lng },
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
    // setLocationData(locationInfoObject);
  };

  const renderSuggestions = () =>
    data.map((suggestion, index) => {
      const {
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={index} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <>
      <FormGroup ref={registerRef}>
        <InputGroup>
          <InputGroup.Text>
            <Search className="addon-icon" onClick={getLocationData} />
          </InputGroup.Text>
          <Form.Control
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder={placeholder}
          />
          {value ? (
            <InputGroup.Text>
              <X className="addon-icon" onClick={handleClearInput} />
            </InputGroup.Text>
          ) : null}
        </InputGroup>

        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </FormGroup>
      {/* <Button onClick={getLocationData}>Get Location Data </Button> */}
    </>
  );
};
