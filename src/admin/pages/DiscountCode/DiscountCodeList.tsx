import React from "react";
import { useNavigate } from "react-router-dom";
// models
import { DiscountCodeModel } from "../../models/DiscountCode";
// ui
import AgGrid from "../../../shared/components/Grid/AGGrid";
import { filterStatusParams } from "../../../shared/components/Grid/GridColumnFilters/CustomFilters";
import StatusCellRenderer from "../../../shared/components/Grid/Renderers/StatusCellRender";
import DollarCellRenderer from "../../../shared/components/Grid/Renderers/DollarCellRender";

import Title from "../../../shared/components/Title/Title";
import CustomButton from "../../../shared/components/Button/CustomButton";
import { CustomModal } from "../../../shared/components/Modal/CustomModal";
import { Col, Container, Modal, Row } from "react-bootstrap";

interface DiscountCodeListProps {
    discountCodesData: DiscountCodeModel[];
}

const DiscountCodeList: React.FunctionComponent<DiscountCodeListProps> = ({
    discountCodesData,
}) => {
  // navigate
  let navigate = useNavigate();

  //  useState
  const [discountCodesGridData, setDiscountCodesGridData] = React.useState<any>(
    []
  );

    // see discount list modal
    const [showServiceListModal, setShowServiceListModal] = React.useState(false);
    const toggleModalServiceList = React.useCallback(() => {
      setShowServiceListModal((v) => !v);
    }, []);

  const [columnDefs] = React.useState([
    {
      field: "market",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 150,
      suppressSizeToFit: false,
    },

    {
      field: "agent",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 150,
      suppressSizeToFit: false,
    },
    {
      field: "brokerage",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 150,
      suppressSizeToFit: false,
    },
    {
      field: "titleCompany",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 150,
      suppressSizeToFit: false,
    },
    {
      field: "discountCode",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 150,
      suppressSizeToFit: false,
      cellRenderer: StatusCellRenderer,
    },
    {
      field: "discountPrice",
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
    {
      //Three Dot Edit Popover for discountCode
      headerName: "Services",
      field: "discountCode",
      cellRendererFramework: (params) => {
        return (
          <div>
            {/* <Button className="pr-3">...</Button> */}

            <CustomButton onClick={toggleModalServiceList}>
              See List
            </CustomButton>
          </div>
        );
      },
    },
  ]);

  const [columnDefServiceList] = React.useState([
    {
      field: "serviceName",
      filter: "agTextColumnFilter",
      resizable: true,
      sortable: true,
      width: "200",
    },
    {
      field: "unit",
      filter: "agTextColumnFilter",
      resizable: true,
      sortable: true,
      width: "100",
    },
    {
      field: "market",
      filter: "agTextColumnFilter",
      resizable: true,
      sortable: true,
      width: "170",
    },
    {
      field: "currentPrice",
      filter: "agTextColumnFilter",
      resizable: true,
      sortable: true,
      width: "150",
    },
  ]);
  // useEffects
  React.useEffect(() => {
    if (discountCodesData) {
      const data = discountCodesData.map((discountCodeData, index) => {
        return {
          market: discountCodeData.market,
          agent: discountCodeData.agent,
          brokerage: discountCodeData.brokerage,
          titleCompany: discountCodeData.titleCompany,
          discountCode: discountCodeData.discountCode,
          usage: discountCodeData.usage,
          status: discountCodeData.expireDate,
          startDate: discountCodeData.startDate,
        };
      });

      setDiscountCodesGridData(data);
    }
  }, [discountCodesData]);
  return (
    <Container>
    <Title className="admin-subtitle">List of Discount Codes</Title>
    <Row>
      <Col md={9} className="mb-3">
        <hr />
      </Col>
    </Row>
    {/* services list grid */}
    <Row>
      <Col md={8}>
        <AgGrid
          quickFilter
          rowData={discountCodesGridData}
          columnDefinition={columnDefs}
          vScroll={true}
          pagination={false}
          quickFilterPlaceholder="Search Discount Code..."
          width="100%"
        />
      </Col>
    </Row>
    <CustomModal
      showConfirmCallToAction={true}
      show={showServiceListModal}
      close={toggleModalServiceList}
      footer={false}
      header={true}
      headerTitle=""
      size="lg"
    >
      <Modal.Body className="reset-password">
        <Title className="modal-title">List of Services</Title>
        {discountCodesData[0].services && (
          <div>
            <AgGrid
              rowData={discountCodesData[0].services}
              columnDefinition={columnDefServiceList}
              quickFilter={false}
              pagination={true}
            />
          </div>
        )}
      </Modal.Body>
    </CustomModal>
  </Container>
  );
};

export default DiscountCodeList;
