import SearchBar from '../components/SearchBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * Home is a React component which represents the home page of the app.
 * 
 * It contains a `SearchBar` component where users can input search criteria. The component handles
 * state for filtering and navigation based on the user's input.
 * 
 * @component
 * @returns {JSX.Element} The rendered Home component with a search bar and navigation functionality.
 * 
 * @example
 *
 * return (
 *   <Home />
 * );
 */
const Home = () => {

    const [filterState, setFilterState] = useState(false);

    const navigate = useNavigate();

    /**
     * Handles the submission of search criteria from the SearchBar.
     * Checks number of input values and navigates to either 
     * the CreatorResults page or the default ResultsPage.
     * 
     * @param {string} teamId - The first team ID input by the user.
     * @param {string} [teamId2=''] - The second team ID input by the user
     * @returns {void}
     * 
     * @example
     * handleSearchSubmit('123', '456');
     * handleSearchSubmit('123');
     */
    const handleSearchSubmit = (teamId, teamId2) => {
        console.log(teamId, teamId2);

        // Sets navigateRoute to the correct route depending on inputs
        let navigateRoute = (teamId2 === '') ? ('/CreatorResults') : ('/ResultsPage');

        // Navigate to the appropriate route with state containing the input values
        navigate(navigateRoute, { state: { inputValue: teamId, inputValue2: teamId2 } });
    };

    /**
     * Toggles the filter state between true and false.
     * Used to switch between different search modes.
     * 
     * @returns {void}
     */
    const toggleFilter = () => {
        setFilterState(prevState => !prevState);
    };
    
    return (
        <Container fluid="xs" className="home">
            <Row>
                <SearchBar 
                    handleSearchSubmit={handleSearchSubmit}
                    toggleFilter={toggleFilter}
                    filterState={filterState}
                />
            </Row>
        </Container>
    );
};

export default Home;
