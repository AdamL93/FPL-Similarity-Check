import AddSwitch from '../components/Filter';
import AddProgressBar from '../components/ProgressBar';
import Col from 'react-bootstrap/Col';

/**
 * ResultsList is a React component that displays a list of results with their gameweek and similarity percentage.
 * Each result includes a progress bar indicating the similarity percentage as well as an optional switch to filter results.
 * 
 * @component
 * @param {Object[]} props.filteredResult - An array of result objects to be displayed.
 * @param {number} props.filteredResult[].gameweek - The gameweek number of the result.
 * @param {number} props.filteredResult[].similarity - The similarity percentage result.
 * @param {Function|null} [props.toggleFilter=null] - An optional function to display a switch to filter results.
 * @param {Function} props.getSimilarityColour - A function to determine the colour of the text based on the similarity percentage.
 * 
 * @example
 * const filteredResult = [
 *   { gameweek: 1, similarity: 30 },
 *   { gameweek: 2, similarity: 50 },
 *   { gameweek: 3, similarity: 60 },
 * ];
 * 
 * const getSimilarityColour = (similarity) => {
 *   if (similarity >= 60) return 'red';
 *   if (similarity < 40) return 'green';
 *   return 'orange';
 * };
 * 
 * const toggleFilter = () => {
 *   // insert function logic
 * };
 * 
 * return (
 *   <ResultsList 
 *     filteredResult={filteredResult} 
 *     toggleFilter={toggleFilter} 
 *     getSimilarityColour={getSimilarityColour} 
 *   />
 * );
 * 
 * @returns {JSX.Element} The rendered list of results with gameweek, similarity percentage, progress bars, and optional filter switch.
 */
const ResultsList = ({ filteredResult, toggleFilter = null, getSimilarityColour }) => {

  console.log("this is the filtered ResultList");
  console.log(filteredResult);

  return (
    <Col className="result-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gameweek Similarity</h2>
        {toggleFilter && <AddSwitch label="Filter > 40%" onChange={toggleFilter} />}
      </div>

      <ul>
        {filteredResult.length > 0 ? (
          filteredResult.map((resultObject, index) => {
            console.log("This is the result object");
            console.log(resultObject);
            const similarityColour = getSimilarityColour(resultObject.similarity);

            return (
              <li key={index}>
                <span style={{ color: "purple" }}>{`GW ${resultObject.gameweek}: `}</span>
                <span style={{ color: similarityColour, fontSize: '24px' }}>{`${resultObject.similarity}%`}</span>
                <AddProgressBar progressNumber={resultObject.similarity} />
              </li>
            );
          })
        ) : (
          <li>No available data</li>
        )}
      </ul>
    </Col>
  );
}

export default ResultsList;
