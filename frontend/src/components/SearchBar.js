import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';


const SearchBar = ({handleSearchSubmit}) => {
    
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSearchSubmit(inputValue, inputValue2)
    }
    
    return (
        <Container className="search-container" fluid="xs">

            <form onSubmit={handleFormSubmit}>
                <h3>Team search</h3>
                <label>Team Id's</label>
                <input 
                    type="number"
                    placeholder="Enter team id"
                    value={inputValue}
                    onChange={({target}) => {
                    console.log(target.value)
                    setInputValue(target.value)}
                    
                }
                />
                <input 
                    type="number"
                    placeholder="Enter second team id"
                    value={inputValue2}
                    onChange={({target}) => {
                    console.log(target.value)
                    setInputValue2(target.value)}  
                }
                />
                <button type="submit" >Search</button>
            </form>  
        </Container>
    )
}

export default SearchBar;