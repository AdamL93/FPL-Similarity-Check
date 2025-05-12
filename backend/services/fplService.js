const fs = require('fs/promises');
require('dotenv').config();


// Gets a single team name

const getTeamName = async (request, response) => {

    const {teamId} = request.params; 
    
    try {
        const response = await fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/`);
        const data = await response.json();
        teamName = data.name
        console.log("This is the team name", teamName)
        return {teamName: data.name};

    } catch (err) {
        console.log("Could not retreive team name", err)
        return { error: err.message };
    }
}

module.exports = { getTeamName };