
import SearchBar from '../components/SearchBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom"
import { useState } from "react"



const Home = () => {

    const [filterState, setFilterState] = useState(false);

    const navigate = useNavigate()

    const handleSearchSubmit = (teamId, teamId2) => {
        console.log(teamId, teamId2)

        let navigateRoute = (teamId2 === '') ? ('/CreatorResults') : ('/ResultsPage');

        //add if else to only send a single teamId if temaId2 is ''
        navigate(navigateRoute, { state: { inputValue: teamId, inputValue2: teamId2 } });
    };

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



