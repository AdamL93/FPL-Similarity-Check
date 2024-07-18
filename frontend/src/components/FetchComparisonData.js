
const FetchData = async (inputValue, inputValue2 = null) => {

    let fetchRoute = (inputValue2 === null) ? (`${inputValue}`) : (`${inputValue}/${inputValue2}`);

    try {
    const response = await fetch(`/api/fplDatabase/${fetchRoute}`);
    const responseResult = await response.json();

    if (response.ok) {
        return{
            result: responseResult.slice(0, -1),
            overallSimilarity: responseResult[responseResult.length - 1],
        }
    } else {
        throw new Error('Failed to fetch data');
    }
    } catch (err) {
    console.log("error occurred while fetching data", err)
    }
};

export default FetchData;