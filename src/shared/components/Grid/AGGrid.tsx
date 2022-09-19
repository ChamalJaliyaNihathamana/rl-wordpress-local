import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Col, Container, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

interface AgGridProps {
  frameworkComponents?: any;
  title?: string;
  rowData?: any;
  columnDefinition?: any;
  pagination?: boolean;
  pageSize?: number;
  vScroll?: boolean;
  height?: number;
  width?: string;
  quickFilter: boolean;
  quickFilterPlaceholder?: string;
  rowHeight?: number;
}

const AgGrid: React.FunctionComponent<AgGridProps> = ({
  rowHeight,
  rowData,
  columnDefinition,
  pagination = true,
  pageSize = 3,
  vScroll = false,
  width = "100%",
  height = 280,
  quickFilter = true,
  quickFilterPlaceholder = "Filter ...",
  frameworkComponents,
}) => {
  const gridRef = React.useRef<AgGridReact>(null);

  React.useEffect(() => {
    if (pagination) {
      // pageSize: pageSize;
    }
  }, [pagination]);

  const onFilterTextBoxChanged = React.useCallback(() => {
    const input = document.getElementById(
      "filter-text-box"
    ) as HTMLInputElement | null;

    if (input != null) {
      gridRef.current.api.setQuickFilter(input.value);
    }
  }, []);
  const isFullWidthRow = React.useCallback((params) => {
 
    return params.rowNode.data.fullWidth;
  }, []);
  const fullWidthCellRenderer = React.useMemo(() => {
    // return FullWidthCellRenderer;
  }, []);

  return (
    <>
      {quickFilter ? (
        <Col md={6} className="ag-grid">
          <InputGroup className="mb-4">
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              type="text"
              id="filter-text-box"
              placeholder={quickFilterPlaceholder}
              onInput={onFilterTextBoxChanged}
            />
          </InputGroup>
        </Col>
      ) : null}

      <Container
        fluid
        className="ag-theme-alpine"
        style={{ width: width, height: height, padding: 0 }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefinition}
          pagination={pagination}
          paginationPageSize={pageSize}
          alwaysShowVerticalScroll={vScroll}
          rowHeight={rowHeight}
          isFullWidthRow={isFullWidthRow}
          fullWidthCellRenderer={fullWidthCellRenderer}
          frameworkComponents={frameworkComponents}
        ></AgGridReact>
      </Container>
    </>
  );
};

export default AgGrid;
