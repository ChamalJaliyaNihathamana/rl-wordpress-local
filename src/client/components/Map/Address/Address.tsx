import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddressSchema, FormAddress } from "./AddressSchema";
import { Form, Row, Col } from "react-bootstrap";


import {
  LocationInfoObject,
  PlacesAutocomplete,
} from "../PlacesAutocomplete/Places";

interface AddressProps {
  setCoords?: any;
  searchplaceholder?: string;
  unitNumber?: boolean;
  label?: boolean;
  showZipCode?: boolean;
}
export interface Coordinates {
  lat: number;
  lng: number;
}

const Address: React.FunctionComponent<AddressProps> = ({
  setCoords,
  searchplaceholder,
  unitNumber = true,
  label = true,
  showZipCode = true,
}) => {
  // comes from the child
  const [locationInfoObject, setLocationInfoObject] =
    React.useState<LocationInfoObject>();

  React.useEffect(() => {
    if (locationInfoObject) {
      setLocationInfoObject(locationInfoObject);
      // setCoords(locationInfoObject.coordinates);
      setValue("state", locationInfoObject.address.state);
      setValue("city", locationInfoObject.address.city);
      setValue("zipcode", locationInfoObject.address.postal_code);

      console.table(locationInfoObject);
    }
  }, [locationInfoObject]);

  React.useEffect(() => {
    if (locationInfoObject && setCoords) {
      setLocationInfoObject(locationInfoObject);
      setCoords(locationInfoObject.coordinates);
      setValue("state", locationInfoObject.address.state);
      setValue("city", locationInfoObject.address.city);
      setValue("zipcode", locationInfoObject.address.postal_code);

      console.table(locationInfoObject);
    }
  }, [locationInfoObject]);

  // setting parent data according to the child data
  const setLocationData = (data: LocationInfoObject) => {
    setLocationInfoObject(data);
  };
  // const [stateOptions, setStateOptions] = React.useState(statesList);
  const [selectedOption, setSelectedOption] = React.useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormAddress>({
    resolver: yupResolver(AddressSchema),
  });
  // setting parent data according to the child data
  const getSelectedOption = (option: string) => {
    setSelectedOption(option);
  };
  const onSubmit = (data: FormAddress) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Row>
          <Col md="auto" className="search-address form-group text-start mb-4">
            {label ? <Form.Label>Address</Form.Label> : ""}

            <PlacesAutocomplete
              setLocationData={setLocationData}
              placeholder={label ? "" : searchplaceholder}
            />
          </Col>
          <Col md="auto" className="form-group text-start mb-4">
            {label ? <Form.Label>City</Form.Label> : ""}
            <Form.Control
              placeholder={label ? "" : "City*"}
              type="text"
              id="city"
              {...register("city")}
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              onBlur={(e: any) => {
                if (e.target.value !== locationInfoObject?.address.city) {
                  console.log("you entered wrong city");
                } else {
                  setValue("city", e.target.value);
                }
              }}
            />
            <Form.Text className="text-muted">{errors.city?.message}</Form.Text>
          </Col>
          {unitNumber ? (
            <Col md="auto" className="form-group text-start mb-4">
              {label ? <Form.Label>Unit</Form.Label> : ""}
              <Form.Control
                placeholder={label ? "" : "Unit #"}
                type="text"
                id="unitNumber"
                {...register("unitNumber")}
                className={`form-control ${
                  errors.unitNumber ? "is-invalid" : ""
                }`}
              />
              <Form.Text className="text-muted">
                {errors.unitNumber?.message}
              </Form.Text>
            </Col>
          ) : null}

          <Col md="auto" className="form-group text-start mb-4">
            {label ? <Form.Label>State</Form.Label> : ""}
            <Form.Control
              placeholder={label ? "" : "State"}
              type="text"
              id="state"
              {...register("state")}
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
            />
            <Form.Text className="text-muted">
              {errors.state?.message}
            </Form.Text>
            {/* <SearchableSelect
              getSelectedOption={getSelectedOption}
              selectOptions={stateOptions}
              placeholder="State"
            /> */}

            {/* <Form.Text className="text-muted">{errors.state?.message}</Form.Text> */}
          </Col>
          {showZipCode ? (
            <Col md="auto" className="form-group text-start mb-4">
              {label ? <Form.Label>Zip Code</Form.Label> : ""}
              <Form.Control
                placeholder={label ? "" : "Zip Code*"}
                type="text"
                id="zipcode"
                {...register("zipcode")}
                className={`form-control ${errors.zipcode ? "is-invalid" : ""}`}
                onBlur={(e: any) => {
                  if (
                    e.target.value !== locationInfoObject?.address.postal_code
                  ) {
                    console.log("you entered wrong zipcode");
                  } else {
                    setValue("zipcode", e.target.value);
                  }
                }}
              />
              <Form.Text className="text-muted">
                {errors.zipcode?.message}
              </Form.Text>
            </Col>
          ) : null}
        </Row>
      </Form.Group>
    </>
  );
};

export default Address;
