const fs = require('fs/promises');
require('dotenv').config();


// Gets a single team name

const getTeamName = async (request, response) => {

    const {teamId} = request.params; 

    try {
        const fetchResponse = await fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/`);
        const data = await fetchResponse.json();
        teamName = data.name
        console.log("This is the team name", teamName)
        response.status(200).json({ teamName });

    } catch (err) {
        console.log("Could not retreive team name", err)
        response.status(500).json({ error: "Failed to fetch team name" });
    }
}

module.exports = { getTeamName };