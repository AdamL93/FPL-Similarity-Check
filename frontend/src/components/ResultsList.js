import AddSwitch from '../components/Filter';
import AddProgressBar from '../components/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ResultsList = ({ filteredResult, toggleFilter, getSimilarityColour }) => (
  <Col className="result-container">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>Gameweek Similarity</h2>
      <AddSwitch label="Filter > 40%" onChange={toggleFilter} />
    </div>

    <ul>
      {filteredResult.length > 0 ? (
        filteredResult.map((resultObject, index) => {
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

export default ResultsList;