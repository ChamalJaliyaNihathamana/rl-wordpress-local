import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
// hook- forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormPickUp, PickUpSchema } from "./PickUpSchema";
// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

// consts
import { dayTimeOptions, yesNoMapOptions } from "../../../constants/Consts";
// models
import { PickupModel } from "../../model/Pickup";
import { InventoryPickupModel } from "../../model/InventoryPickup";

// ui
import Map from "../../components/Map/Map";
import { LocationInfoObject } from "../../../shared/model/Location";
import CustomButton from "../../../shared/components/Button/CustomButton";
import PlacesSearch from "../../../shared/components/Address/PlacesSearch";
import Title from "../../../shared/components/Title/Title";
import { ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { FormInputText } from "../../../shared/components/FormComponents/FormInputText";
import { FormInputRadio } from "../../../shared/components/FormComponents/FormInputRadio";
import { FormInputTextArea } from "../../../shared/components/FormComponents/FormInputTextArea";
import { FormInputDate } from "../../../shared/components/FormComponents/FormInputDate";
import { FormInputDropdown } from "../../../shared/components/FormComponents/FormInputDropdown";
// icons
import { ArrowLeft } from "react-bootstrap-icons";

interface PickUpFormProps {}

const PickUpForm: React.FunctionComponent<PickUpFormProps> = () => {
  // state
  const dispatch: Dispatch<any> = useDispatch();
  const customer_id: any = useSelector(
    (state: RootState) => state.auth.currentUser.id
  );
  // navigate
  let navigate = useNavigate();

  const pickupAddressState: PickupModel = useSelector(
    (state: RootState) => state.pickup.pickupState
  );

  console.log(pickupAddressState);
  const [locationInfoObject, setLocationInfoObject] =
    React.useState<LocationInfoObject>();

  React.useEffect(() => {
    if (locationInfoObject) {
      setLocationInfoObject(locationInfoObject);
      console.table(locationInfoObject);
    }
  }, [locationInfoObject]);

  // setting parent data according to the child data
  const setLocationData = (data: LocationInfoObject) => {
    setLocationInfoObject(data);
  };

  React.useEffect(() => {
    if (pickupAddressState) {
      setValue(
        "property_address",
        pickupAddressState.pickupAddress.address.formattedAddress
      );
      setValue("state", pickupAddressState.pickupAddress.address.state);
      setValue("city", pickupAddressState.pickupAddress.address.city);
      setValue("zip_code", pickupAddressState.pickupAddress.address.postalCode);

      setValue("lat", pickupAddressState.pickupAddress.coordinates.lat);

      setValue("lat", pickupAddressState.pickupAddress.coordinates.lng);
    }
  }, [pickupAddressState]);

  const methods = useForm<FormPickUp>({
    resolver: yupResolver(PickUpSchema),
  });
  const { handleSubmit, control, setValue } = methods;
  // setting parent data according to the child data

  const onSubmit = (data: FormPickUp) => {
    let pickupData: InventoryPickupModel = {
      property_address: data.property_address,
      unit: data.unit,
      city: data.city,
      state: data.state,
      customer_id,
      zip_code: data.zip_code,
      direction_discription: data.direction_discription,
      lat: data.lat,
      lng: data.lng,
    };
    console.log(JSON.stringify(data, null, 2));
    console.log(pickupData);
    // dispatch(addPickup(pickupData));
    navigate("/dashboard");
  };

  return (
    <div className="pickup-address-content">
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
        <Title className="primarySubTitle pt-3 text-start">
          Pick Up Address
        </Title>
        <Form.Group className="mb-3">
          <Row className="mb-3">
            <Col>
              <PlacesSearch type="pickup" />
            </Col>
            <Col>
              <FormInputText name="unit" control={control} label="Unit" />
            </Col>
            <Col style={{ display: "none" }}>
              <FormInputText
                name="property_address"
                control={control}
                label="address"
              />
            </Col>
            <Col>
              <FormInputText name="city" control={control} label="City" />
            </Col>
            <Col>
              <FormInputText name="state" control={control} label="State" />
            </Col>
            <Col>
              <FormInputText
                name="zip_code"
                control={control}
                label="Zip Code"
              />
            </Col>
            <Col style={{ display: "none" }}>
              <FormInputText name="lat" control={control} label="lat" />
            </Col>
            <Col style={{ display: "none" }}>
              <FormInputText name="lng" control={control} label="lng" />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="direction mb-3">
          <Row>
            <Col className="form-group no-asterisk rl-instructions">
              <FormInputTextArea
                name="instructions"
                control={control}
                label={"Special Instructions"}
                placeholder="Company name where we are picking up, list of items and quantities we are picking up"
              />
            </Col>
          </Row>
        </Form.Group>
        <Title className="primarySubTitle text-start">Confirm Location</Title>
        <Form.Group className="loc-relative mb-5">
          <Row>
            <Col md={6} className="pickup-set-location shadow"></Col>
          </Row>
          <Row>
            <Col>
              <Map
                coordinates={pickupAddressState?.pickupAddress?.coordinates}
                infoWindowContent={
                  locationInfoObject?.address.formattedAddress
                }
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col className="form-group">
              <FormInputRadio
                name="pickupState.confirmLocation"
                control={control}
                options={yesNoMapOptions}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col xs={3}>
              <FormInputDate name="date" label="Date" control={control} />
            </Col>
            <Col xs={3} className="no-asterisk no-label">
              <FormInputDropdown
                name="time"
                label="no-asterisk"
                control={control}
                options={dayTimeOptions}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="direction mb-3">
          <Row>
            <Col className="form-group no-asterisk">
              <FormInputTextArea
                name="direction_discription"
                control={control}
                label={"Directions"}
                placeholder="Enter the street-by-street directions to the property"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="stepper-bottom mb-3 text-center">
          <Col>
            <ButtonGroup>
              <CustomButton
                type="submit"
                className="submit-btn btn btn-primary"
              >
                Submit
              </CustomButton>
            </ButtonGroup>
          </Col>
          <Col>
            <ButtonGroup className="">
              <CustomButton
                onClick={() => navigate("/dashboard")}
                className="back-btn"
                icon={<ArrowLeft className="arrow-left" />}
              >
                Go Back
              </CustomButton>
            </ButtonGroup>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default PickUpForm;
