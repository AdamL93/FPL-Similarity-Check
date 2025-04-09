/**
 * GetSimilarityColour Function
 * 
 * Returns a colour based on the provided similarity number.
 * 
 * - If the number is greater than or equal to 60, it returns 'red'.
 * - If the number is less than 40, it returns 'green'.
 * - Otherwise, it returns 'orange'.
 * 
 * @param {number} number - The similarity number.
 * @returns {string} The colour corresponding to the similarity number.
 * 
 * @example
 * const similarityColour = GetSimilarityColour(60); // returns 'red'
 * 
 * @example
 * const similarityColour = GetSimilarityColour(30); // returns 'green'
 * 
 * @example
 * const similarityColour = GetSimilarityColour(50); // returns 'orange'
 */
const GetSimilarityColour = (number) => {
  if (number >= 60) {
    return 'red'; 
  } else if (number < 40) {
    return 'green'; 
  } else {
    return 'orange';
  }
};

export default GetSimilarityColour;