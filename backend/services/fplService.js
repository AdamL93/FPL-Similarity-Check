const fs = require('fs/promises');
require('dotenv').config();


// Gets a single team name

const getTeamName = async (teamId) => {
    try {
        const response = await fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/`);
        const data = await response.json();
        return {teamName: data.name};

    } catch (err) {
        console.log("Could not retreive team name", err)
        return { error: err.message };
    }
}

module.exports = { getTeamName };