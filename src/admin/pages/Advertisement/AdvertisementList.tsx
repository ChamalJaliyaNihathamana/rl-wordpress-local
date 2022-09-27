import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
// models
import { AdvertisementModel } from "../../../shared/model/Advertisement";
// ui
import AgGrid from "../../../shared/components/Grid/AGGrid";
import { filterDateParams, filterStatusParams } from "../../../shared/components/Grid/GridColumnFilters/CustomFilters";
import StatusCellRenderer from "../../../shared/components/Grid/Renderers/StatusCellRender";
import ValidityCellRenderer from "../../../shared/components/Grid/Renderers/ValidityCellRenderer";

import Title from "../../../shared/components/Title/Title";
import CustomButton from "../../../shared/components/Button/CustomButton";
import { Col, Container, Row } from "react-bootstrap";
import { MegaphoneFill, PencilSquare, Plus, TrashFill } from "react-bootstrap-icons";

interface AdvertisementListProps {
  AdvertisementsData: AdvertisementModel[];
}

const AdvertisementList: React.FunctionComponent<AdvertisementListProps> = ({
  AdvertisementsData,
}) => {
  // navigate
  let navigate = useNavigate();

  //  useState
  const [AdvertisementsGridData, setAdvertisementsGridData] = React.useState(
    []
  );

  const [columnDefs] = React.useState([
    {
      field: "advertisementName",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
    },
    {
      field: "adCode",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 120,
      suppressSizeToFit: false,
      cellRenderer: StatusCellRenderer,
    },
    {
      field: "status",
      filter: "agDateColumnFilter",
      filterParams: filterDateParams,
      resizable: true,
      sortable: true,
      width: 150,
      suppressSizeToFit: false,
      cellRenderer: ValidityCellRenderer,
    },

    {
      //Three Dot Edit Popover for advertisement Grid
      headerName: " ",
      field: "adCode",
      cellRendererFramework: (params) => {
        return (
          <div>
            {/* <Button className="pr-3">...</Button> */}

            <CustomButton
              icon={<PencilSquare />}
              onClick={() => navigate(`/advertisement/${params.value}`)}
            ></CustomButton>
            <CustomButton
              icon={<TrashFill />}
              className="pr-3"
              // onClick={() => navigate(`/advertisement/create`)}x
            ></CustomButton>
          </div>
        );
      },
    },
  ]);

  // useEffects
  React.useEffect(() => {
    if (AdvertisementsData) {
      const data = AdvertisementsData.map((advertisement, index) => {
        return {
          advertisementName: advertisement.title,
          status: advertisement.endDate,
          adCode: advertisement.id,
        };
      });
      setAdvertisementsGridData(data);
    }
  }, [AdvertisementsData]);
  return (
    <Container>
      <Title className="admin-subtitle" icon={<MegaphoneFill />}>
        Advertisement
      </Title>
      <Row>
        <Col md={6} className="my-auto">
          <span className="admin-txt-muted text-muted">
            All the advertisements are shown here.
          </span>
        </Col>
        <Col md={3} className="text-end">
          <CustomButton
            icon={<Plus className="mx-0" />}
            onClick={() =>
              navigate("/admin/advertisement/manage-advertisement/")
            }
          >
            Create Advertisement
          </CustomButton>
        </Col>
      </Row>
      <Row>
        <Col md={9} className="mb-3">
          <hr />
        </Col>
      </Row>
      {/* Advertisements list grid */}
      <Row>
        <Col md={8}>
          <AgGrid
            quickFilter
            rowData={AdvertisementsGridData}
            columnDefinition={columnDefs}
            vScroll={true}
            pagination={false}
            quickFilterPlaceholder="Search Advertisement..."
          />
        </Col>
        {/* <Button className="pr-3">edit</Button> */}
        {/* <PopOver id={"three-dot"}>
          <Button className="pr-3">edit</Button>
          <Button>Edit </Button>
        </PopOver> */}
      </Row>
    </Container>
  );
};

export default AdvertisementList;
