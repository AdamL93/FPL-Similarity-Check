import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import AddSwitch from './Filter';


const SearchBar = ({handleSearchSubmit, toggleFilter, filterState}) => {
    
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')
    const [error, setError] = useState(null)
    const [show, setShow] = useState(true);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!filterState) { 

            if (inputValue === "" || inputValue2 === "") {
                setError("Please fill in all the fields")
            } else {
                handleSearchSubmit(inputValue, inputValue2)
            }   
        } else {
            if (inputValue === "") {
                setError("Please fill in all the fields")
            } else {
                handleSearchSubmit(inputValue, inputValue2)
            } 
        }

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
                    <button type="submit">Search</button>
            </form>
            {error && 
                <Alert variant="danger" className="error" onClose={() => setShow(false)} dismissible>
                        {error}
                </Alert>}
        </Container>
    )
}

export default SearchBar;