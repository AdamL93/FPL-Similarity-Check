import { NavLink } from 'react-router-dom'
import logo from '../resources/logo.png'


const Navbar = () => {
    return (
        <header>
            <div className="container">
                    <img src={logo} alt ="logo" className = "navbar-logo" />
                <NavLink exact to="/" className = "navbar-title">
                    <h1> FPL TEAM SIMILARITY CHECK</h1>
                </NavLink>
            </div>
        </header>
    ) 
    
}

export default Navbar;