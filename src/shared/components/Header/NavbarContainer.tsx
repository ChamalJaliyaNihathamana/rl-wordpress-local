import * as React from "react";
import { Link } from "react-router-dom";

import Title from "../Title/Title";
import { Navbar, Container, Image, Nav } from "react-bootstrap";
import Logo from "../../../assets/img/logo.png";

interface NavbarContainerProps {
  children?: React.ReactNode;
  navbarClass?: string;
  navClass?: string;
  withNav?: boolean;
  logoClass?: string;
  textLogo?: boolean;
  textLogoContent?: string
}

const NavbarContainer: React.FunctionComponent<NavbarContainerProps> = ({
  children,
  navbarClass,
  navClass,
  withNav = true,
  logoClass = "nav-brand-img",
  textLogo = false,
  textLogoContent = "Add Now & Save"
}) => {
  let brand = (
    <Navbar.Brand as={Link} to="/" className="nav-brand">
      {textLogo ? <Title>{textLogoContent}</Title> : <Image src={Logo} className={logoClass} />}
    </Navbar.Brand>
  );
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      bg="white"
      className={navbarClass}
    >
      <Container fluid>
        {brand}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="nav-toggler"
        />
        <Navbar.Collapse id="responsive-navbar-nav" className="nav-collapse">
          {withNav ? <Nav className={navClass}>{children}</Nav> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarContainer;
