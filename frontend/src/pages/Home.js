
import SearchBar from '../components/SearchBar'
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom"


const Home = () => {

    const navigate = useNavigate()

    const handleSearchSubmit = (teamId, teamId2) => {
        console.log(teamId, teamId2)
        navigate('/ResultsPage', { state: { inputValue: teamId, inputValue2: teamId2 } });
    };
    
    
    return (
        <Container fluid="md">
            <div className = "home">
                <SearchBar handleSearchSubmit={handleSearchSubmit}/>
            </div>
        </Container>
    );
};

export default Home;



