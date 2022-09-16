import React from "react";
import { Link, useNavigate } from "react-router-dom";
// hooks forms
import { FormRegister, SignupSchema } from "./RegistrationSchema";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormBrokerageInfo,
  BrokerageInfoSchema,
} from "./BrokerageInfoSchema";
// redux
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/auth/auth.actions";

import {
  getBrokerageList,
} from "../../../redux/user/user.actions";
// modals

// const
import { acceptTerms, refByOptions } from "../../../constants/Consts";
import {
  extractValue,
  transformNameAndIdToOption,
} from "../../../utils/DropdownOptions";
import { getFormattedPhone } from "../../../utils/Validations";
import { brokerageOptions } from "../../../constants/Dynamic";

// ui
import ReCAPTCHA from "react-google-recaptcha";
import Title from "../../components/Title/Title";
import CustomButton from "../../components/Button/CustomButton";

import { FormInputText } from "../../components/FormComponents/FormInputText";
import { FormInputCheckbox } from "../../../shared/components/FormComponents/FormInputCheckbox";
import { FormInputAsyncCheckboxComboBox } from "../../../shared/components/FormComponents/FormInputAsycCheckboxComboBox";
import { FormInputDropdown } from "../../../shared/components/FormComponents/FormInputDropdown";
import { FormInputAsyncComboBox } from "../../../shared/components/FormComponents/FormInputAsynComboBox";
import { FormInputMultiCheckbox } from "../../../shared/components/FormComponents/FormInputMultiCheckbox";
import { Accordion, ButtonGroup, Col, Form, Modal, Row } from "react-bootstrap";
// icons
import {
  ChevronBarDown,
  Eye,
  EyeSlash,
  HouseHeartFill,
  Plus,
  Upload,
} from "react-bootstrap-icons";
// img
import Logo from "../../../assets/img/logo-new.png";
import { selectMarketList } from "../../../redux/market/market.selectors";
import { getMarketList } from "../../../redux/market/market.actions";
import { UserProfileModel } from "../../../client/model/UserProfile";
import ModalPortal from "../../components/Modal";
import { CustomModal } from "../../components/Modal/CustomModal";

interface RegistrationFormProps {}

const RegistrationForm: React.FunctionComponent<RegistrationFormProps> = () => {
  // const [brokerageOptions, setBrokerageOptions] = React.useState({});
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  // const registerUserAddressState = useSelector(selectCurrentUserAddress);
  // const registerBrokerageAddressState = useSelector(
  //   selectCurrentBrokerageAddress
  const marketList = useSelector(selectMarketList);
  const brokerageList = useSelector(
    (state: RootState) => state.user.brokerageList
  );

  const methods = useForm<FormRegister>({
    resolver: yupResolver(SignupSchema),
  });
  const marketOptionsDropDown = transformNameAndIdToOption(marketList);

  React.useEffect(() => {
    dispatch(getBrokerageList());
    if (brokerageList) {
      let result = brokerageList.map((broker) => ({
        value: broker.id,
        label: broker.name,
      }));

      let other = {
        value: "other",
        label: "Other",
      };

      result.push(other);

      // setBrokerageOptions(result);
    }
  }, []);
  React.useEffect(() => {
    dispatch(getMarketList());
  }, []);
  const { handleSubmit, control, setValue } = methods;
  const methodsBrokerage = useForm<FormBrokerageInfo>({
    resolver: yupResolver(BrokerageInfoSchema),
  });
  const { handleSubmit: brokerageHandleSubmit, control: brokerageControl } =
    methodsBrokerage;

  const [eye, setEye] = React.useState(true);
  const [reCAPTCHA, setReCAPTCHA] = React.useState(false);
  const [password, setPassword] = React.useState("password");
  const togglePassword = () => {
    if (password === "password") {
      setPassword("text");
      setEye(false);
    } else {
      setPassword("password");
      setEye(true);
    }
  };

  const phoneNumberWatch = useWatch({
    control,
    name: "phone",
  });

  React.useEffect(() => {
    if (phoneNumberWatch && phoneNumberWatch.length > 0) {
      let FPN = getFormattedPhone(phoneNumberWatch);
      setValue("phone", FPN);
      console.log(phoneNumberWatch);
    }
  }, [phoneNumberWatch]);
  //brokerage other option toggle modal
  const [showModalOtherBrokerage, setShowModalOtherBrokerage] =
    React.useState(false);
  const toggleModalOtherBrokerage = () => {
    setShowModalOtherBrokerage((v) => !v);
  };
  const onSubmit = (data: FormRegister) => {
    const markets = extractValue(data.markets, "value");

    let RegData: UserProfileModel = {
      brokerage_name: "abc",
      brokerage_city: "California",
      brokerage_state: "Nevada",
      brokerage_id: 0,
      photo_filename:
        "https://rocket-staging.s3.us-west-1.amazonaws.com/8a4ac8a419867e7ed2d6aa13b870eb8d.jpg",
      logo_filename:
        "https://rocket-staging.s3.us-west-1.amazonaws.com/8a4ac8a419867e7ed2d6aa13b870eb8d.jpg",
      first_name: data.first_name,
      email:data.username,
      last_name: data.last_name,
      username: data.username,
      phone: data.phone,
      referral_from: data.referral_from,
      password_hash: data.password_hash,
      markets: markets,
    };
    console.log(JSON.stringify(data, null, 2));
    dispatch(register(RegData));
    navigate("/");
  };

  const brokerageOther = useWatch({
    control,
    name: "brokerage_name",
  });

  React.useEffect(() => {
    if (brokerageOther && brokerageOther.value === "other") {
      setShowModalOtherBrokerage(true);
    } else {
      setShowModalOtherBrokerage(false);
    }
  }, [brokerageOther]);

  const handleCaptchaChange = (value) => {
    console.log(value, "capp");
    setReCAPTCHA(true);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
        <Row>
          <Col className="form-group">
            <FormInputText
              name="first_name"
              control={control}
              label="First Name"
            />
          </Col>
          <Col className="form-group">
            <FormInputText
              name="last_name"
              control={control}
              label="Last Name"
            />
          </Col>
          <Col className="form-group">
            <FormInputText
              name="username"
              control={control}
              label="Username/Email"
            />
          </Col>
        </Row>
        <Row className="flex_center">
          <Col xs={6} md={4} className="form-group">
            <FormInputText
              name="password_hash"
              control={control}
              label="Password"
              type={password}
              endAdornment={
                <span onClick={togglePassword} className="show-hide-icon">
                  {eye ? <EyeSlash /> : <Eye />}
                </span>
              }
            />
          </Col>
          <Col xs={6} md={4} className="form-group">
            <FormInputText
              name="confirmPassword"
              control={control}
              label="Retype - Password"
              type={password}
              endAdornment={
                <span onClick={togglePassword} className="show-hide-icon">
                  {eye ? <EyeSlash /> : <Eye />}
                </span>
              }
            />
          </Col>
          <Col xs={12} md={4}>
            <div>
              <ButtonGroup className="mb-3">
                <ModalPortal
                  id={5}
                  ariaLabel="upload headshot"
                  btnClassName="btn-primary me-3 w-100 reg-upload-btn"
                  btnContent="upload headshot"
                  btnIcon={<Upload />}
                  center
                  size="md"
                  title="Upload Image"
                  modalIcon={<ChevronBarDown className="modal-icon" />}
                >
                  <>
                    <ImageUpload />
                  </>
                </ModalPortal>
                <ModalPortal
                  id={6}
                  ariaLabel="upload logo"
                  btnClassName="btn-primary w-100 reg-upload-btn"
                  btnContent="upload logo"
                  btnIcon={<Upload />}
                  center
                  size="md"
                  title="Upload Image"
                  modalIcon={<ChevronBarDown className="modal-icon" />}
                >
                  <>
                    <ImageUpload />
                  </>
                </ModalPortal>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={7} className="form-group">
            <FormInputAsyncComboBox
              name="brokerage_name"
              label="Brokerage - Choose other if not listed"
              control={control}
              options={brokerageOptions}
            />
          </Col>
          <Col xs={4} className="form-group no-asterisk">
            <FormInputAsyncCheckboxComboBox
              name="markets"
              control={control}
              label="Market(s)"
              options={marketOptionsDropDown}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="form-group">
            <FormInputText name="phone" control={control} label="Mobile *" />
          </Col>
          <Col xs={5} className="form-group no-asterisk">
            <FormInputDropdown
              name=" referral_from"
              label="Referred By"
              control={control}
              options={refByOptions}
            />
          </Col>
          {/* <Col xs={5} className="form-group">
            <FormInputText name="email" control={control} label="Email" />
          </Col> */}
        </Row>
        <div className="flex_center mb-4">
          <div className="form-group no-asterisk rl_radio_form" md="auto">
            <FormInputCheckbox
              name="acceptTerms"
              control={control}
              label=""
              options={acceptTerms}
              setValue={setValue}
            />
          </div>
          <div className="">
            <span className="terms_of_use_text">
              I agree to{" "}
              <a href="https://rocketlister.com/terms-and-conditions">
                terms of use & service{" "}
              </a>
              .
            </span>
          </div>
        </div>{" "}
        {/* <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={handleCaptchaChange}
          theme="light"
        /> */}
        <CustomButton
          disabled={!reCAPTCHA}
          type="submit"
          className="btn btn-primary mb-3"
        >
          Register
        </CustomButton>
      </Form>

      {/* Modal when other is chosen for brokerage */}
      <CustomModal
        showConfirmCallToAction={true}
        show={showModalOtherBrokerage}
        close={toggleModalOtherBrokerage}
        footer={false}
        header={true}
        headerTitle=""
      >
        <Modal.Body className="reset-password reset-pwd-modal">
          <HouseHeartFill className="modal-icon" />
          <Title className="modal-title">BROKERAGE INFO</Title>
          {/* <Form
            onSubmit={brokerageHandleSubmit(onSubmitBrokerage)}
            className="form"
          >
            <Row>
              <Col className="form-group text-start">
                <FormInputText
                  name="name"
                  control={brokerageControl}
                  label="Brokerage"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <PlacesSearch type="registrationBrokerage" />

              <Col style={{ display: "none" }}>
                <FormInputText
                  name="brokerageAddress.address.formattedAddress"
                  control={brokerageControl}
                  label="address"
                />
              </Col>

              <FormInputText
                name="brokerageAddress.address.city"
                control={control}
                label="City"
              />

              <FormInputText
                name="brokerageAddress.address.state"
                control={control}
                label="State"
              />
            </Row>
            <Row className="mx-4">
              <CustomButton type="submit">Save</CustomButton>
            </Row>
          </Form> */}
        </Modal.Body>
      </CustomModal>
    </>
  );
};
export default RegistrationForm;
