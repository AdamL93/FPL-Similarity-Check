
const FetchData = async (inputValue, inputValue2 = null) => {
    
    let fetchRoute = (inputValue2 === null) ? `${inputValue}` : `${inputValue}/${inputValue2}`;
    let hasTwoInputs = (inputValue2 !== null);

    try {
        const response = await fetch(`/api/fplDatabase/${fetchRoute}`);
        const responseResult = await response.json();

        if (response.ok) {
            if (!hasTwoInputs) {
                return {
                    responseResult
                };
            } else {
                return {
                    result: responseResult.slice(0, -1),
                    overallSimilarity: responseResult[responseResult.length - 1],
                };
            }
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (err) {
        console.log("Error occurred while fetching data", err);
        throw err;
    }
};

export default FetchData;