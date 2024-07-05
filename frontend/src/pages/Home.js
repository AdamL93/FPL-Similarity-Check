
import SearchBar from '../components/SearchBar'
import { useNavigate } from "react-router-dom"


const Home = () => {

    const navigate = useNavigate()

    const handleSearchSubmit = (teamId, teamId2) => {
        console.log(teamId, teamId2)
        navigate('/ResultsPage', { state: { inputValue: teamId, inputValue2: teamId2 } });
    };
    
    
    return (
        <div className = "home">
            <SearchBar handleSearchSubmit={handleSearchSubmit}/>
        </div>
    );
};

export default Home;



