import * as React from "react";
// hook-forms
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  FormRemoveInventory,
  RemoveInventorySchema,
} from "./OrderHistorySchema";
// redux
import { useDispatch } from "react-redux";
import { getOrderList } from "../../../redux/order/order.actions";
import { Dispatch } from "react";
// utils
import { groupBy } from "../../../utils/GroupBy";
import { shortDate } from "../../../utils/DateFormat";
// grid
import {
  filterStatusParams,
  filterDateParams,
} from "../../../shared/components/Grid/GridColumnFilters/CustomFilters";
import DollarCellRenderer from "../../../shared/components/Grid/Renderers/DollarCellRender";
import StatusCellRenderer from "../../../shared/components/Grid/Renderers/StatusCellRender";
import AgGrid from "../../../shared/components/Grid/AGGrid";
// ui
import Title from "../../../shared/components/Title/Title";
import CustomButton from "../../../shared/components/Button/CustomButton";
import { CustomModal } from "../../../shared/components/Modal/CustomModal";
import { FormInputTextArea } from "../../../shared/components/FormComponents/FormInputTextArea";
import { FormInputCheckbox } from "../../../shared/components/FormComponents/FormInputCheckbox";
import { FormInputDate } from "../../../shared/components/FormComponents/FormInputDate";
import { Row, Col, Modal, Form } from "react-bootstrap";
interface OrderHistoryProps {
  orderList: any[];
}

const OrderHistory: React.FunctionComponent<OrderHistoryProps> = ({
  orderList,
}) => {
  // state
  const dispatch: Dispatch<any> = useDispatch();

  // hook-forms
  const methodsRemoveInventory = useForm<FormRemoveInventory>({
    resolver: yupResolver(RemoveInventorySchema),
  });

  const {
    handleSubmit: removeInventoryHandleSubmit,
    control: removeInventoryControl,
  } = methodsRemoveInventory;

  // useState
  const [orderHistoryGridData, setOrderHistoryGridData] = React.useState([]);
  const groupedOrders = groupBy(orderHistoryGridData, "status");
  const { closed, cancelled, active } = groupedOrders;
  const [showRemoveInventoryModal, setShowRemoveInventoryModal] =
    React.useState(false);
  const toggleInventoryModal = React.useCallback(() => {
    setShowRemoveInventoryModal((v) => !v);
  }, []);

  const [columnDefs] = React.useState([
    {
      field: "address",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: "350",
    },
    {
      field: "orderDate",
      filter: "agDateColumnFilter",
      filterParams: filterDateParams,
      resizable: true,
      sortable: true,
      width: "150",
    },
    {
      field: "status",
      filter: "agTextColumnFilter",
      cellRenderer: StatusCellRenderer,
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: "100",
    },
    {
      field: "billingStatus",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: "150",
    },
    {
      field: "orderTotal",
      filter: "agNumberColumnFilter",
      resizable: true,
      sortable: true,
      width: "150",
      cellRenderer: DollarCellRenderer,
    },
    {
      headerName: " ",
      field: "address",
      cellRendererFramework: (params) => {
        return (
          <div>
            <CustomButton onClick={toggleInventoryModal}>
              remove inventory
            </CustomButton>
          </div>
        );
      },
    },
  ]);
  const [noButtonCol] = React.useState([...columnDefs]);

  // useEffects
  React.useEffect(() => {
    if (noButtonCol) {
      noButtonCol.splice(5, 6);
    }
  }, [noButtonCol]);

  React.useEffect(() => {
    dispatch(getOrderList());
  }, [orderList]);

  React.useEffect(() => {
    if (orderList) {
      const data = orderList.map((order, index) => {
        return {
          address: order.address,
          orderDate: shortDate(order.access_date),
          status: order.status,
          billingStatus: order.billing_status,
          orderTotal: order.list_price,
        };
      });
      setOrderHistoryGridData(data);
    }
  }, [orderList]);

  const onSubmitRemoveInventory = (data: FormRemoveInventory) => {
    console.log(JSON.stringify(data, null, 2));
    // dispatch(update(UpdateUsernameData, currentUserId));
    toggleInventoryModal();
  };
  return (
    <>
      <div className="order-history-content">
        <Title className="mb-3 ">Active Properties</Title>
        <Row className="mb-3">
          <Col>
            <AgGrid
              quickFilter={false}
              rowData={active}
              columnDefinition={columnDefs}
              vScroll={true}
              pagination
            />
          </Col>
        </Row>
        <Title className="mb-3">Closed Properties</Title>
        <Row className="mb-3">
          <Col>
            <AgGrid
              quickFilter={false}
              rowData={closed}
              columnDefinition={noButtonCol}
              vScroll={true}
              pagination
            />
          </Col>
        </Row>
        <Title className="mb-3">Cancelled Properties</Title>
        <Row className="mb-3">
          <Col>
            <AgGrid
              quickFilter={false}
              rowData={cancelled}
              columnDefinition={noButtonCol}
              vScroll={true}
              pagination
            />
          </Col>
        </Row>
        <CustomModal
          showConfirmCallToAction={true}
          show={showRemoveInventoryModal}
          close={toggleInventoryModal}
          footer={false}
          header={false}
          headerTitle="Header Title"
          size="lg"
        >
          <Modal.Body className="reset-password">
            <Title className="modal-title">Remove Inventory</Title>
            <Form
              onSubmit={removeInventoryHandleSubmit(onSubmitRemoveInventory)}
            >
              Remove:
              <Row>
                <Col xs={6} md={4} className="my-md-auto order-2 order-md-1">
                  <FormInputCheckbox
                    name="post_sign"
                    control={removeInventoryControl}
                    label="Post/Sign"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4} className="my-md-auto order-2 order-md-1">
                  <FormInputCheckbox
                    name="lockbox"
                    control={removeInventoryControl}
                    label="Lockbox"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4} className="my-md-auto order-2 order-md-1">
                  <FormInputCheckbox
                    name="rider"
                    control={removeInventoryControl}
                    label="Rider"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={8} lg={6} className="form-group select-agent">
                  <FormInputDate
                    type="date"
                    name="removalDate"
                    label="Removal Date"
                    control={removeInventoryControl}
                  />
                </Col>
              </Row>
              <Row>
                <FormInputTextArea
                  name="otherInstructions"
                  control={removeInventoryControl}
                  label="Other Instructions"
                />
              </Row>
              <Row>
                <Col className="mb-4 mt-4">
                  <CustomButton type="submit" className="mx-2">
                    Save
                  </CustomButton>
                  <CustomButton className="mx-2" onClick={toggleInventoryModal}>
                    Cancel
                  </CustomButton>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </CustomModal>
      </div>
    </>
  );
};

export default OrderHistory;
