import React, { Dispatch } from "react";
import { Link, useNavigate } from "react-router-dom";
// redux
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/auth.actions";
import { AuthState } from "../../../redux/auth/auth.reducers";
// ui
import NavbarContainer from "./NavbarContainer";
import CustomButton from "../Button/CustomButton";
import {
  Navbar,
  Image,
  ButtonGroup,
  Nav,
  Row,
  Col,
  NavDropdown,
  Form,
  Container,
  Badge,
} from "react-bootstrap";
import Logo from "../../../assets/img/logo-new.png";
import { ArrowLeft, CartFill, GearFill } from "react-bootstrap-icons";

interface HeaderProps {
  type?: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({ type = "default" }) => {
  // state
  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const orderCount = 3;
  // const orderCount = useSelector((state: RootState) => state.order.cartCount);
  const isLoggedIn = authState.isLoggedIn;

  const dispatch: Dispatch<any> = useDispatch();

  // navigate
  const navigate = useNavigate();

  // useState
  const [checkedChooseService, setCheckedChooseService] = React.useState(true);
  const [checkedPropDetails, setCheckedPropDetails] = React.useState(false);
  const [checkedConfirmOrder, setCheckedConfirmOrder] = React.useState(false);
  let currentURL = window.location.href;

  // useEffects
  React.useEffect(() => {
    if (currentURL.indexOf("installation") > -1) {
      setCheckedChooseService(true);
      setCheckedPropDetails(false);
      setCheckedConfirmOrder(false);
    } else if (currentURL.indexOf("property-detail") > -1) {
      setCheckedChooseService(true);
      setCheckedPropDetails(true);
      setCheckedConfirmOrder(false);
    } else if (currentURL.indexOf("primary-contact") > -1) {
      setCheckedChooseService(true);
      setCheckedPropDetails(true);
      setCheckedConfirmOrder(true);
    }
  }, [currentURL]);


  let navigation:any;
  // methods
  const handleLogout = () => {
    dispatch(logout());
    navigate("/logged-out");
  };
  const handleLogoutAdmin = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/logged-out");
  };

  let brand = (
    <Navbar.Brand as={Link} to="/login" className="nav-brand">
      <Image src={Logo} className="nav-brand-img" />
    </Navbar.Brand>
  );

  switch (type) {
    case "dashboard":
      navigation = (
        <NavbarContainer
          navbarClass="dashboard-nav rl-dashboard"
          navClass="roc-navbar justify-content-end"
        >
          {isLoggedIn ? (
            <ButtonGroup className="roc-btn-group">
              <CustomButton
                className="roc-nav-link nav-order rl-dashboard-button"
                onClick={() => navigate("/pricing")}
              >
                Place Order
              </CustomButton>
              <CustomButton
                onClick={() => navigate("/pick-up")}
                variant="outline-primary"
                className="roc-nav-link nav-req rl-dashboard-button"
              >
                Warehouse My Inventory
              </CustomButton>

              <CustomButton
                className="roc-nav-link nav-logout logout rl-dashboard-button"
                onClick={() => handleLogout()}
              >
                Log out
              </CustomButton>
            </ButtonGroup>
          ) : (
            <ButtonGroup className="roc-btn-group">
              <CustomButton
                onClick={() => navigate("/register")}
                className="roc-nav-link nav-req"
              >
                Register
              </CustomButton>
              <CustomButton
                className="roc-nav-link nav-logout logout"
                onClick={() => navigate("/login")}
              >
                Sign In
              </CustomButton>
            </ButtonGroup>
          )}
        </NavbarContainer>
      );
      break;
    case "packages":
      navigation = (
        <Navbar
          collapseOnSelect
          expand="lg"
          sticky="top"
          bg="white"
          className="packages-nav"
        >
          <Container fluid>
            <Row className="packages-nav-row">
              <Col md={12}>
                <Row className="nav-first">
                  <Col md={6} className="nav-first-col">
                    {brand}
                    <Navbar.Toggle
                      aria-controls="responsive-navbar-nav"
                      className="nav-toggler"
                    />
                  </Col>
                  <Col md={6} className="nav-first-col2">
                    <Navbar.Collapse
                      id="responsive-navbar-nav"
                      className="nav-collapse"
                    >
                      <Nav className="packages-nav-list">
                        <Nav.Link
                          as={Link}
                          to="/dashboard"
                          className="packages-nav-link"
                        >
                          MY DASHBOARD
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/pricing"
                          className="packages-nav-link"
                        >
                          ORDER
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="#"
                          className="packages-nav-link"
                        >
                          FAQ
                        </Nav.Link>

                        <NavDropdown
                          className="nav-settings my-auto"
                          title={
                            <span>
                              Welcome Jessica &nbsp;
                              <GearFill className="icon-setting" />
                            </span>
                          }
                          id="basic-nav-dropdown"
                        >
                          <NavDropdown.Item href="http://localhost:3000/update-profile">
                            Manage Account
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#/action/3.3">
                            Billing Method
                          </NavDropdown.Item>
                          {/* <NavDropdown.Divider /> */}
                          <NavDropdown.Item href="http://localhost:3000/">
                            Log out
                          </NavDropdown.Item>
                        </NavDropdown>
                        <CustomButton
                          className="cart-btn"
                          icon={<CartFill />}
                          onClick={() =>
                            navigate(`/pricing/summary/:id/order-summary`)
                          }
                        >
                          <Badge>{orderCount}</Badge>
                          {/* <span className="visually-hidden">items in the cart</span> */}
                        </CustomButton>
                      </Nav>
                    </Navbar.Collapse>
                  </Col>
                </Row>
              </Col>

              <Col lg={{ span: 8, offset: 2 }}>
                <Row className="nav-second">
                  <Col>
                    <Form.Group
                      className="roc-checkbox mb-md-3"
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check
                        checked={checkedChooseService}
                        disabled
                        type="checkbox"
                        label="CHOOSE SERVICES"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="roc-checkbox mb-md-3"
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check
                        checked={checkedPropDetails}
                        disabled
                        type="checkbox"
                        label="ENTER PROPERTY DETAILS"
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col>
                    <Form.Group
                      className="roc-checkbox mb-3"
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check
                        type="checkbox"
                        label="ENTER ACCESS DETAILS"
                      />
                    </Form.Group>
                  </Col> */}
                  <Col>
                    <Form.Group
                      className="roc-checkbox mb-md-3"
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check
                        checked={checkedConfirmOrder}
                        disabled
                        type="checkbox"
                        label="CONFIRM ORDER"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Navbar>
      );
      break;
    case "home":
      navigation = (
        <NavbarContainer navbarClass="home-nav" navClass="home-navbar">
          <Nav.Link as={Link} to="/dashboard" className="home-nav-link">
            MY DASHBOARD
          </Nav.Link>
          <Nav.Link as={Link} to="/pricing" className="home-nav-link">
            PACKAGES
          </Nav.Link>
          <Nav.Link as={Link} to="/faq" className="home-nav-link">
            FAQ
          </Nav.Link>
          <NavDropdown
            className="nav-settings"
            title={
              <span>
                Welcome Jessica &nbsp;
                <GearFill className="icon-setting" />
              </span>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">
              Manage Account
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Payment Method
            </NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
          </NavDropdown>
        </NavbarContainer>
      );
      break;
    case "admin":
      navigation = (
        <NavbarContainer
          navbarClass="dashboard-nav reset-pwd-nav"
          logoClass="reset-pwd-nav__brand__image"
        >
          <ButtonGroup>
            <CustomButton onClick={() => handleLogoutAdmin()}>
              Logout
            </CustomButton>
          </ButtonGroup>
        </NavbarContainer>
      );
      break;
    case "auth":
      navigation = (
        <NavbarContainer
          navbarClass="home-nav new"
          navClass="home-navbar"
          textLogo={true}
          textLogoContent="Add Now & Save"
        >
          <Nav.Link as={Link} to="/dashboard" className="home-nav-link">
            <ArrowLeft className="mx-2" />
            Back to Home
          </Nav.Link>
        </NavbarContainer>
      );
      break;
    default:
      navigation = (
        <NavbarContainer
          navbarClass="dashboard-nav reset-pwd-nav"
          withNav={false}
          logoClass="reset-pwd-nav__brand__image"
        ></NavbarContainer>
      );
      break;
  }
  return <>{navigation}</>;
};

export default Header;
