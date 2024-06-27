import { Link } from 'react-router-dom'
import logo from '../resources/logo.png'


const Navbar = () => {
    return (
        <header>
            <div className="container">
                {/*Can possibly reduce number of Links to neaten code*/}
                <Link to="/">
                    <img src={logo} alt ="logo" className = "navbar-logo" />
                </Link>

                <Link to="/" className = "navbar-title">
                    <h1> FPL TEAM SIMILARITY CHECK</h1>
                </Link>
            </div>
        </header>
    ) 
    
}

export default Navbar;