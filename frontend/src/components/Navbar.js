import { NavLink } from 'react-router-dom'
import logo from '../resources/logo.png'


const Navbar = () => {
    return (
        <header>
            <div className="container">
                {/*Can possibly reduce number of Links to neaten code*/}
                    <img src={logo} alt ="logo" className = "navbar-logo" />

                <NavLink exact to="/" className = "navbar-title">
                    <h1> FPL TEAM SIMILARITY CHECK</h1>
                </NavLink>
                                {/*Can possibly reduce number of Links to neaten code*/}
                    <img src={logo} alt ="logo" className = "navbar-logo" />
            </div>
        </header>
    ) 
    
}

export default Navbar;