import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import AddSwitch from './Filter';


const SearchBar = ({handleSearchSubmit, toggleFilter, filterState}) => {
    
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSearchSubmit(inputValue, inputValue2)
    }
    
    return (
        <Container className="search-container" fluid="xs">

        <div className="d-flex justify-content-end pe-3">
            <AddSwitch label="Search Type" onChange={toggleFilter} />
        </div>

            <form onSubmit={handleFormSubmit}>
                <h3>{filterState ? "Content Creator Search" : "Team Search"}</h3>
                <input 
                    type="number"
                    placeholder="Enter team id"
                    value={inputValue}
                    onChange={({target}) => {
                    console.log(target.value)
                    setInputValue(target.value)}
                }
                />
                {!filterState && (
                    <input 
                        type="number"
                        placeholder="Enter second team id"
                        value={inputValue2}
                        onChange={({ target }) => setInputValue2(target.value)}
                    />
                )}
                <button type="submit" >Search</button>
            </form>  
        </Container>
    )
}

export default SearchBar;