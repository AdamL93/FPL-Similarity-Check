import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import AddSwitch from './Filter';

/**
 * SearchBar is a React component that provides a form for submitting search queries.
 * It includes a toggle switch to change the search type and remove the second input field.
 * An error message will be displayed if the required fields are not filled in.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {Function} props.handleSearchSubmit - A function to handle the search submission. It is called with the input values when the form is submitted.
 * @param {Function} props.toggleFilter - A function to toggle the search type between "Content Creator Search" and "Team Search". This function is called when the switch is toggled.
 * @param {boolean} props.filterState - A boolean to check the current state of the filter. If `true`, the form will only include a single input field; otherwise, it will include two.
 * 
 * @example
 * const handleSearchSubmit = (inputValue, inputValue2) => {
 *   // Handle the search submission
 * };
 * 
 * const toggleFilter = () => {
 *   // Toggle the filter state
 * };
 * 
 * return (
 *   <SearchBar 
 *     handleSearchSubmit={handleSearchSubmit} 
 *     toggleFilter={toggleFilter} 
 *     filterState={false} 
 *   />
 * );
 * 
 * @returns {JSX.Element} The rendered SearchBar component which includes form inputs, a toggle switch, and optional error alerts.
 */
const SearchBar = ({ handleSearchSubmit, toggleFilter, filterState }) => {
    
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [error, setError] = useState(null);
    const [show, setShow] = useState(true);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!filterState) { 
            if (inputValue === "" || inputValue2 === "") {
                setError("Please fill in all the fields");
            } else {
                handleSearchSubmit(inputValue, inputValue2);
            }   
        } else {
            if (inputValue === "") {
                setError("Please fill in a Team Id");
            } else {
                handleSearchSubmit(inputValue, inputValue2);
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
                        console.log(target.value);
                        setInputValue(target.value);
                    }}
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
                </Alert>
            }
        </Container>
    );
}

export default SearchBar;
