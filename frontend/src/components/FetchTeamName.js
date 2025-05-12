
/**
 * Fetches the name of a Fantasy Premier League (FPL) team using its team ID.
 * Makes a request to the backend API route which interacts with the FPL API.
 * 
 * @param {string|number} teamId - The ID of the FPL team to fetch the name for.
 * 
 * @returns {Promise<string>} A promise that resolves to the team's name as a string.
 * 
 * @throws {Error} Throws an error if the fetch request fails or the response is invalid.
 * 
 * @example
 * const name = await FetchTeamName('123456');
 * console.log(name); // "My Fantasy Team"
 */


const FetchTeamName = async(teamId) => {
    try {
        const response = await fetch(`/api/fplDatabase/teamName/${teamId}`);
        const data = await response.json()
        console.log(data)
        return data.teamName

    } catch(err) {
        console.log("Failed to fetch data", err);
        throw err;
    }
}

export default FetchTeamName;
