
/**
 * Maps an array of similarity values to an array of objects to be used when creating charts.
 * Each object contains a `gameweek` and `similarity` property.
 * 
 * @param {number[]} result - An array of similarity values.
 * @returns {Object[]} An array of objects, each containing:
 *   - `gameweek`: The gameweek number (starting from 1) corresponding to the index in the `result` array.
 *   - `similarity`: The similarity value from the `result` array.
 * 
 * @example
 * const result = [60, 70, 80];
 * const mapped = MappedResults(result);
 * console.log(mapped);
 * Output: [{ gameweek: 1, similarity: 65 }, { gameweek: 2, similarity: 70 }, { gameweek: 3, similarity: 80 }]
 */
const MappedResults = (result) => {
  return result.map((value, index) => ({ gameweek: index + 1, similarity: value }));
};

export default MappedResults;
