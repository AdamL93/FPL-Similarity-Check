/**
 * Fetches data from the FPL database API based on the provided input values.
 * Determines the correct route depending on how many input values are provided.
 * 
 * @param {string} inputValue - The first input value.
 * @param {string|null} [inputValue2=null] - The second input value. Defaults to null.
 * 
 * @returns {Promise<Object>} A promise that resolves to an object containing the Api response data. 
 * If only one input value is provided, the object will be `{ responseResult: Array }`.
 * If two input values are provided, the object will be `{ result: Array, overallSimilarity: * }`,
 * where `result` is an array excluding the last item from `responseResult`, and `overallSimilarity` is the last item of `responseResult`.
 * 
 * @throws {Error} Throws an error if the fetch request fails or the response is invalid.
 * 
 * @example
 * // Example with a single input value
 * FetchData('123')
 * 
 * @example
 * //Example with two input values
 * FetchData('123', '456')
 */
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
