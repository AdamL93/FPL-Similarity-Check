
import SearchBar from '../components/SearchBar'
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react';

const Home = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearchSubmit = (query) => {
        setSearchQuery(query);
        console.log(query)
        navigate('/ResultsPage', { state: { searchQuery: query } });
    };
    
    
    return (
        <div className = "home">
            <SearchBar onSearchSubmit={handleSearchSubmit}/>
        </div>
    );
};

export default Home;



