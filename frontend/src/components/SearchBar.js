import React, { useState } from 'react';


const SearchBar = ({onSearchSubmit}) => {
    
    const [inputValue, setInputValue] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSearchSubmit(inputValue)
    }
    
    return (

        <div className = "search-container">
            <form onSubmit={handleFormSubmit}>
                <h3>Single Team search</h3>
                <label>Team Id</label>
                <input 
                    type="number"
                    placeholder="enter team id"
                    value={inputValue}
                    onChange={({target}) => {
                    console.log(target.value)
                    setInputValue(target.value)}
                    
                }
                />
                <button type="submit" >Search</button>
            </form>  
        </div>
    )
}

export default SearchBar;