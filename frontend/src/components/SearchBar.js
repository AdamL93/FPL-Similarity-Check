import React, { useState } from 'react';

const SearchBar = () => {
    
    const [teamId, setTeamId] = useState('')
    //const [teamId2, setTeamId2] = useState('')
    
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4000/api/team/${teamId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            console.log(result)
          } catch (err) {
            console.log("error occurred")
          }
    }
    
    
    return (

        <div className = "search-container">
            <form onSubmit={handleSubmit}>
                <h3>Single Team search</h3>
                <label>Team Id</label>
                <input 
                    type="number"
                    value={teamId}
                    onChange={({target}) => {
                    console.log(target.value)
                    setTeamId(target.value)}
                }
                />

                {/*}
                <label>Team Id 2</label>
                <input 
                    type="number"
                    value={teamId2}
                    onChange={({target}) => {
                        console.log(target.value)
                        setTeamId2(target.value)}
                    }
                /> */}

                <button>Search</button>

            </form>  
        </div>
    )
}

export default SearchBar;