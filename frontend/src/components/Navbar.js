import { NavLink } from 'react-router-dom'
import logo from '../resources/logo.png'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarFunction = () => {
    return (

        <Navbar expand="lg" className="navbar-header">
        <Container>
          <Navbar.Brand href="/">
          <img
              src={logo}
              className="navbar-logo"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Options" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="/">Account details</NavDropdown.Item>
                <NavDropdown.Item href="/">Sign out</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">
                  About
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }


    /*
        <Navbar expand="lg" fixed="top">
            <Container className="container">

                    <img src={logo} alt ="logo" className = "navbar-logo" />
                    <NavLink exact to="/" className = "navbar-title">
                        <h1> FPL TEAM SIMILARITY CHECK</h1>
                    </NavLink>
            </Container>

        </Navbar>
    ) 
    
}
*/
export default NavbarFunction;