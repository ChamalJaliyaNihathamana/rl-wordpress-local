import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
// hook-forms
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AdminSchema, FormAdmin } from "./AdminDashboardSchema";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getAdminList } from "../../../redux/admin/admin.actions";
// ui
import AgGrid from "../../../shared/components/Grid/AGGrid";
import { filterStatusParams } from "../../../shared/components/Grid/GridColumnFilters/CustomFilters";

import Title from "../../../shared/components/Title/Title";
import CustomButton from "../../../shared/components/Button/CustomButton";
import { CustomModal } from "../../../shared/components/Modal/CustomModal";
import { FormInputText } from "../../../shared/components/FormComponents/FormInputText";
import { FormInputCheckbox } from "../../../shared/components/FormComponents/FormInputCheckbox";
import { Col, Container, Row, Image, Modal, Form } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import { RootState } from "../../../redux/store";

interface AdminDashboardProps {}

const AdminDashboard: React.FunctionComponent<AdminDashboardProps> = () => {
  //  @adhee need to be get from the current user
  let user: any;
  const _user = localStorage.getItem("user");
  if (_user) {
    user = JSON.parse(_user);
  }
  const userName = "Admin";

  // state
  const dispatch: Dispatch<any> = useDispatch();
  const adminList = useSelector((state: RootState) => state.admin.adminList);
  // navigate
  let navigate = useNavigate();

  // hook-forms
  const methods = useForm<FormAdmin>({
    resolver: yupResolver(AdminSchema),
  });
  const { handleSubmit, control } = methods;

  // useStates
  const [adminGridRowData, setAdminGridRowData] = React.useState([]);
  const [showAdminEditModal, setShowAdminEditModal] = React.useState(false);

  // toggle modal
  const toggleModalAdminEdit = React.useCallback(() => {
    setShowAdminEditModal((v) => !v);
  }, []);

  const [columnDefs] = React.useState([
    {
      field: "firstName",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 180,
      suppressSizeToFit: false,
    },
    {
      field: "lastName",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 180,
      suppressSizeToFit: false,
    },
    {
      field: "phone",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 150,
      suppressSizeToFit: false,
    },
    {
      field: "username",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 150,
      suppressSizeToFit: false,
    },
    {
      field: "password",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 110,
      suppressSizeToFit: false,
    },
    {
      field: "type",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 100,
      suppressSizeToFit: false,
    },
    {
      field: "status",
      filter: "agTextColumnFilter",
      filterParams: filterStatusParams,
      resizable: true,
      sortable: true,
      width: 100,
      suppressSizeToFit: false,
    },
    {
      field: "edit",
      cellRendererFramework: (params) => {
        return (
          <div>
            <CustomButton
              icon={<PencilSquare />}
              onClick={toggleModalAdminEdit}
            ></CustomButton>
            <CustomButton
              icon={<TrashFill />}
              className="pr-3 rl-trash-none"
              // onClick={() => navigate(`/advertisement/create`)}x
            ></CustomButton>
          </div>
        );
      },
    },
  ]);

  // useEffects
  React.useEffect(() => {
    dispatch(getAdminList());
  }, []);

  React.useEffect(() => {
    if (adminList) {
      const data = adminList.map((adminData, index) => {
        return {
          firstName: adminData.admin.name,
          lastName: adminData.admin.name,
          phone: adminData.admin.personal_phone,
          username: adminData.admin.username,
          password: adminData.admin.password,
          type: adminData.role,
          status: adminData.admin.status,
        };
      });

      setAdminGridRowData(data);
    }
  }, [adminList, dispatch]);

  const onSubmit = (data: FormAdmin) => {
    let userRoles = "admin";
    if (data.userRole === true) {
      userRoles = "super_admin";
    }
    let AdminData: FormAdmin = {
      username: data.email,
      password_hash: data.password_hash,
      name: data.firstName + data.lastName,
      email: data.email,
      ext: "100",
      role: userRoles,
      contactPhone: data.contactPhone,
    };
    console.log(JSON.stringify(AdminData, null, 2));
    toggleModalAdminEdit();
    // dispatch(registerAdmin(AdminData));
    // reset();
  };
  return (
    <Container className="rl-admin-section">
      {/* avatar */}
      <Row className="mb-3 mt-3">
        <Col md="auto">
          <Image
            fluid
            src="https://images.unsplash.com/photo-1634316887741-93ff860c6854?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=180&q=80"
            roundedCircle
            style={{
              borderRadius: "50%",
              maxWidth: "100%",
              maxHeight: "8rem",
            }}
          />
        </Col>
        <Col className="my-auto">
          <h1 className="home-subtitle text-start ps-3">Welcome {userName}!</h1>
        </Col>
      </Row>

      {user.user.admin_roles[0].role === "owner" ||
      user.user.admin_roles[0].role === "super_admin" ? (
        <>
          <div className="rl-admins-list">
            <Row className="flex_center">
              <Col>
                <Title>List of Current Admins</Title>
              </Col>
              <Col md="auto">
                <CustomButton
                  type="button"
                  className="mx-2"
                  onClick={toggleModalAdminEdit}
                >
                  Create
                </CustomButton>
              </Col>
            </Row>
            <Row>
              <Col className="mt-3">
                <AgGrid
                  pageSize={10}
                  quickFilter={false}
                  quickFilterPlaceholder="Search"
                  rowData={adminGridRowData}
                  columnDefinition={columnDefs}
                  pagination={true}
                  height={525}
                />
              </Col>
            </Row>
          </div>
        </>
      ) : null}
      <CustomModal
        showConfirmCallToAction={true}
        show={showAdminEditModal}
        close={toggleModalAdminEdit}
        footer={false}
        header={false}
        headerTitle="Header Title"
        size="xs"
      >
        <Modal.Body className="reset-password rl-modal">
          <Title className="modal-title mt-1">NEW ADMIN</Title>
          <Form onSubmit={handleSubmit(onSubmit)} className="form">
            <Row>
              <Col md={6} className="mb-4">
                <FormInputText
                  name="firstName"
                  control={control}
                  label="First Name"
                />
              </Col>
              <Col md={6} className="mb-4">
                <FormInputText
                  name="lastName"
                  control={control}
                  label="Last Name"
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-4">
                <FormInputText
                  name="contactPhone"
                  control={control}
                  label="Contact Number"
                />
              </Col>
              <Col md={6} className="mb-4">
                <FormInputText
                  name="email"
                  control={control}
                  label="Email Address "
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-4">
                <FormInputText
                  name="password_hash"
                  control={control}
                  label="Password"
                />
              </Col>
            </Row>
            {user.user.admin_roles[0].role === "owner" && (
              <Col
                xs={6}
                md={4}
                className="my-md-auto order-2 order-md-1 rl-superadmin-checkbox"
              >
                <FormInputCheckbox
                  name="userRole"
                  control={control}
                  label="Make Super Admin"
                />
              </Col>
            )}

            <Row>
              <Col className="mb-4 mt-4">
                <CustomButton type="submit" className="mx-2">
                  Create
                </CustomButton>
                <CustomButton className="mx-2" onClick={toggleModalAdminEdit}>
                  Cancel
                </CustomButton>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </CustomModal>
    </Container>
  );
};

export default AdminDashboard;
