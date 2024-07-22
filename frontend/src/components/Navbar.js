import logo from '../resources/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

/**
 * NavbarHeader is a React component that renders a responsive navigation header bar using React Bootstrap.
 * The navigation bar includes a logo, links to different pages, and a dropdown menu with additional links.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered Navbar component.
 * 
 * @example
 * return (
 *   <NavbarHeader />
 * );
 */
const NavbarHeader = () => {
    return (
        <Navbar expand="lg" className="navbar-header">
          <Container>
            <Navbar.Brand href="/">
              <Image className="navbar-logo"
                  src={logo} 
                  alt="logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Options" id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item href="/">Account details</NavDropdown.Item>
                  <NavDropdown.Item href="/">Sign out</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/RetreiveResult">
                    Retrieve Results
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
};

export default NavbarHeader;
