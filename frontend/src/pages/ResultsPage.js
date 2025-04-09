import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import FetchData from '../components/FetchComparisonData';
import ResultsList from '../components/ResultsList';
import TeamDetails from '../components/TeamDetails';
import MappedResults from '../components/MapResults';
import GetSimilarityColour from '../components/GetSimilarityColour';
import BarChartComponent from '../components/BarChart';
import LineChartComponent from '../components/LineChart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * ResultsPage is a React functional component that displays the results of a comparison between two FPL teams.
 * 
 * It displays the results in a text and graph based format. 
 * 
 * It fetches data from an API, processes it, and displays it using various child components. 
 * It also allows the user to filter and/or save the results.
 * 
 * @component
 * @returns {JSX.Element} The rendered ResultsPage component with comparison results and charts.
 */
const ResultsPage = () => {

  // Destructures input values from the location state.
  const location = useLocation();
  const { inputValue, inputValue2 } = location.state;
  const inputArray = [inputValue, inputValue2];

  const [result, setResult] = useState([]);
  const [overallSimilarity, setOverallSimilarity] = useState();
  const [mappedResults, setMappedResults] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [filteredResult, setFilteredResult] = useState([]);
  const [response, setResponse] = useState('');

  /**
   * Fetches comparison data based on the input values when the component initally renders or when input values change.
   * Updates the result and overallSimilarity state variables with the fetched data.
   * 
   * @async
   * @function
   * @returns {Promise<void>}
   */
  useEffect(() => {
    const FetchApiData = async () => {
      const { result: fetchedResult, overallSimilarity: fetchedOverallSimilarity } = await FetchData(inputValue, inputValue2);
      setResult(fetchedResult);
      setOverallSimilarity(fetchedOverallSimilarity);
    };
    FetchApiData();
  }, [inputValue, inputValue2]);
  
  /**
   * Maps the fetched results into a JSON format for the recharts components.
   * Updates the mappedResults and filteredResult state variables based on the filterState.
   * 
   * @function
   * @returns {void}
   */
  useEffect(() => {
    const mappedResults = MappedResults(result);
    setMappedResults(mappedResults);

    // Filters results if filter switch is on
    if (filterState) {
      const filteredResults = mappedResults.filter(object => object.similarity >= 40);
      setFilteredResult(filteredResults);
    } else {
      setFilteredResult(mappedResults);
    }
  }, [result, filterState]);

  /**
   * Determines the colour for the overall similarity text based on the value.
   * 
   * @type {string}
   */
  const similarityColour = GetSimilarityColour(overallSimilarity);

  /**
   * Toggles the filter state between true and false.
   * 
   * @function
   * @returns {void}
   */
  const toggleFilter = () => {
    setFilterState(prevState => !prevState);
  };

  /**
   * Handles the click event for the "Save Results" button. Sends the comparison data to the server 
   * and updates the response state with the result.
   * 
   * If successful the response state will include an object id that can be used to search for the results.
   * 
   * @async
   * @function
   * @param {React.MouseEvent} e - The click event.
   * @returns {Promise<void>}
   */
  const handleClick = async (e) => {
    e.preventDefault();

    const savedResults = {
      teamIds: inputArray,
      resultsArray: result,
      overallSimilarity: overallSimilarity
    };

    const response = await fetch('/api/fplDatabase/SaveResults', {
        method: 'POST',
        body: JSON.stringify(savedResults),
        headers: {
            'Content-Type':'application/json'
        }
    });
    const json = await response.json();

    if (!response.ok) {
      setResponse('Save Failed');
      console.log(json.error);
    }
    if (response.ok) {
      setResponse(`Save search number: ${json.data._id}`);
    }
  }

  return (
    <Container fluid="xs">
      <Row className="banner gx-5">
        <Col>Results</Col>
      </Row>
      <Row className="gx-5 align-items-center">
        <Col>
          <TeamDetails inputValue={inputValue} inputValue2={inputValue2} />
        </Col>
        <Col className="text-end">
          <div className="button-wrapper">
            {response && <div className="response">{response}</div>}
            <button
              className="button" 
              onClick={handleClick}
            >
              Save Results
            </button>
          </div>
        </Col>
      </Row>
      <Row className="gx-5">
        <ResultsList
          filteredResult={filteredResult}
          toggleFilter={toggleFilter}
          getSimilarityColour={GetSimilarityColour}
        />
        <Col>
          <Row className="overall-container">
            <Col>
              <h2>
                <span style={{ color: similarityColour }}>
                  {`Overall Similarity: ${overallSimilarity}%`}
                </span>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5 mb-5">
              <LineChartComponent data={mappedResults}/>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5 mb-5">
              <BarChartComponent data={mappedResults}/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ResultsPage;
