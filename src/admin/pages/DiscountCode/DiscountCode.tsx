import React, { Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";
// hook forms
import { useForm } from "react-hook-form";
import { DiscountCodesSchema, FormDiscountCodes } from "./DiscountCodesSchema";
import { yupResolver } from "@hookform/resolvers/yup";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getBrokerageList,
  getUserList,
} from "../../../redux/user/user.actions";
import { getMarketList } from "../../../redux/market/market.actions";
// models
import { AddOnModel } from "../../../shared/model/AddOn";
import { MarketModel } from "../../../shared/model/Market";
// const
import { titleCompanyOptions } from "../../../constants/Dynamic";
// ui
import AgGrid from "../../../shared/components/Grid/AGGrid";
import DollarCellRenderer from "../../../shared/components/Grid/Renderers/DollarCellRender";
import { filterStatusParams } from "../../../shared/components/Grid/GridColumnFilters/CustomFilters";

import { Grid } from "@mui/material";
import Title from "../../../shared/components/Title/Title";
import CustomButton from "../../../shared/components/Button/CustomButton";
import { FormInputDropdown } from "../../../shared/components/FormComponents/FormInputDropdown";
import { FormInputAsyncComboBox } from "../../../shared/components/FormComponents/FormInputAsynComboBox";
import { FormInputSwitch } from "../../../shared/components/FormComponents/FormInputSwitch";
import { Col, Container, Form, Row } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { FormInputText } from "../../../shared/components/FormComponents/FormInputText";
import { transformNameAndIdToOption } from "../../../utils/DropdownOptions";
import { RootState } from "../../../redux/store";

interface DiscountCodeProps {
  isEdit?: boolean;
  servicesData?: AddOnModel[];
}

const DiscountCode: React.FunctionComponent<DiscountCodeProps> = ({
  isEdit = false,
  servicesData,
}) => {
  // state
  const dispatch: Dispatch<any> = useDispatch();

  const marketList: MarketModel[] = useSelector(
    (state: RootState) => state.market.marketList
  );

  const agentList= useSelector(
    (state: RootState) => state.user.userList
  );

  const brokerageList= useSelector(
    (state: RootState) => state.user.brokerageList
  );
 
  // navigate
  let navigate = useNavigate();

  // hook-forms
  const methods = useForm<FormDiscountCodes>({
    resolver: yupResolver(DiscountCodesSchema),
  });
  const { handleSubmit, control } = methods;

  //   useStates
  const [servicesGridData, setServicesGridData] = React.useState<any>([]);
  const [marketOptions, setMarketOptions] = React.useState<any>([]);
  const [agentOptions, setAgentOptions] = React.useState<any>([]);
  const [brokerageOptions, setBrokerageOptions] = React.useState<any>([]);

  const [columnDefs] = React.useState([
    {
      field: "serviceName",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 275,
      suppressSizeToFit: false,
    },
    {
      field: "unit",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 275,
      suppressSizeToFit: false,
    },
    {
      field: "market",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 275,
      suppressSizeToFit: false,
    },
    {
      field: "currentPrice",
      filter: "agNumberColumnFilter",
      filterParams: {
        allowedCharPattern: "\\d\\-\\,", // note: ensure you escape as if you were creating a RegExp from a string
        numberParser: (text: any) => {
          return text == null ? null : parseFloat(text.replace(",", "."));
        },
      },
      cellRenderer: DollarCellRenderer,
      sortable: true,
      resizable: true,
      width: 150,
      suppressSizeToFit: false,
    },
    // text box new price
    {
      field: "newPrice",
      editable: true,
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      sortable: true,
      resizable: true,
      width: 150,
      suppressSizeToFit: false,
      cellRenderer: DollarCellRenderer,
      cellStyle: (params) => {
        if (
          params.value === "" ||
          params.value === null ||
          params.value === undefined
        ) {
          //mark police cells as red
          return {
            border: "black",
            borderStyle: "solid",
            borderWidth: "thin",
            padding: 3,
            boxSizing: "border-box",
          };
        }
        return {
          // textAlign: "center",
        };
      },
    },
    {
      //Three Dot Edit Popover for advertisement Grid
      headerName: " ",
      field: "agentVisibility",
      cellRendererFramework: (params) => {
        // return <>{params.value  ? <EyeFill /> : <EyeSlashFill /> }</>;
        return (
          <>
            {params.value ? (
              <div>
                <EyeFill />
              </div>
            ) : (
              <div>
                <EyeSlashFill />
              </div>
            )}
          </>
        );
      },
    },
  ]);

  React.useEffect(() => {
    if (servicesData) {
      const data = servicesData.map((serviceData, index) => {
        return {
          serviceName: serviceData.name,
          currentPrice: serviceData.price,
          agentVisibility: serviceData.agentVisibility,
          unit: serviceData.unit,
          market: serviceData.market,
        };
      });

      setServicesGridData(data);
    }
  }, [servicesData, dispatch]);

  React.useEffect(() => {
    dispatch(getBrokerageList());
    dispatch(getUserList());
    dispatch(getMarketList());
  }, []);

  React.useEffect(() => {
    if (marketList) {
      const marketOptionsDropDown = transformNameAndIdToOption(marketList);
      setMarketOptions(marketOptionsDropDown);
    }
  }, [marketList]);

  React.useEffect(() => {
    if (agentList) {
    const agentOptionsDropDown = transformNameAndIdToOption(agentList);
      setAgentOptions(agentOptionsDropDown);
    }
  }, [agentList]);

  React.useEffect(() => {
    if (brokerageList) {
        const brokerageOptionsDropDown = transformNameAndIdToOption(brokerageList);
      setBrokerageOptions(brokerageOptionsDropDown);
    }
  }, [brokerageList]);

  const onSubmit = (data: FormDiscountCodes) => {
    console.log(JSON.stringify(data, null, 2));
  };
  return (
    <Container>
      <Row>
        <Col md={3}>
          <Title className="admin-subtitle mb-5">Discount Codes</Title>
        </Col>
        <Col md="auto">
          <Link
            to="/admin/discount-code/discount-code-list"
            className="chevron-btn"
          >
            <CustomButton
              className="chevron-btn"
              onClick={() => navigate(`/discount-code-list/`)}
            >
              SEE FULL LIST OF DISCOUNT CODES
            </CustomButton>
          </Link>
        </Col>
      </Row>
      {/* <hr /> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="">
          <Row>
            <Col md={2}>
              <FormInputDropdown
                name="market"
                control={control}
                label="Select Market"
                options={marketOptions}
              />
            </Col>{" "}
            <Col md={2}>
              <FormInputAsyncComboBox
                name="agent"
                label="Assign Agent"
                control={control}
                options={agentOptions}
              />
            </Col>
            <Col md={3}>
              <FormInputAsyncComboBox
                name="brokerage"
                label="Assign Brokerage"
                control={control}
                options={brokerageOptions}
              />
            </Col>
            <Col md={3}>
              <FormInputAsyncComboBox
                name="titleCompany"
                label="Assign Title Company"
                control={control}
                options={titleCompanyOptions}
              />
            </Col>
            <Col md={2}>
              <FormInputText
                name="discountCode"
                control={control}
                label="Discount Code"
                defaultValue="D46564"
              />
            </Col>
          </Row>
        </Form.Group>

        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>RECURRING</Grid>
          <Grid item>
            <FormInputSwitch name="recurring" label="" control={control} />
          </Grid>
          <Grid item>ONE TIME USE</Grid>
        </Grid>
      </Form>

      <Row>
        <Col md={8}>
          <Title className="admin-subtitle mb-3"> List of Services</Title>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomButton
            className=""
            onClick={() => navigate(`/admin/manage-packages`)}
          >
            Create Custom Package
          </CustomButton>
        </Col>
      </Row>
      <Row>
        {/* <Col md={8} className="mt-3"> */}
        <AgGrid
          quickFilter
          quickFilterPlaceholder="Search"
          rowData={servicesGridData}
          columnDefinition={columnDefs}
          pagination={false}
        />
        {/* </Col> */}
      </Row>
    </Container>
  );
};

export default DiscountCode;
