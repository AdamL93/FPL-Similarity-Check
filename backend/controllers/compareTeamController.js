


const getTeamComparison = async (request, response) => {

    const {result, result2} = request.params

    //compare data between two results
    console.log('Weve made it this far')

    return response.status(200).json(JSON.stringify(result, null, 2));

};


module.exports = {getTeamComparison}