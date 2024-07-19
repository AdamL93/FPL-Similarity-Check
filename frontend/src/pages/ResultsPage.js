// Page to display comparison results 
import React from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

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


const ResultsPage = () => {

  //destructures input values.
  const location = useLocation();
  const { inputValue, inputValue2 } = location.state;

  const [result, setResult] = useState([]);
  const [overallSimilarity, setOverallSimilarity] = useState();
  const [mappedResults, setMappedResults] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [filteredResult, setFilteredResult] = useState([]);


// Calls Fetch data component to compare two teams on page render.
  useEffect(() => {
    const FetchApiData = async () => {
      const { result: fetchedResult, overallSimilarity: fetchedOverallSimilarity } = await FetchData(inputValue, inputValue2);
      setResult(fetchedResult);
      setOverallSimilarity(fetchedOverallSimilarity);
    };
    FetchApiData();
  }, [inputValue, inputValue2]);
  
//maps results into json format gameweek and similarity
  useEffect(() => {
    const mappedResults = MappedResults(result)
    setMappedResults(mappedResults);

//Filters results if filter switch is on
    if (filterState) {
      const filteredResults = mappedResults.filter(object => object.similarity >= 40);
      setFilteredResult(filteredResults);
    } else {
      setFilteredResult(mappedResults);
    }
  }, [result, filterState]);

  //checks similarity result and checks colour.
  const similarityColour = GetSimilarityColour(overallSimilarity);

  //checks if filter is on and sets state.
  const toggleFilter = () => {
  setFilterState(prevState => !prevState);
};

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
          <button className="button">Save Results</button>
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
              <span style={{ color: similarityColour}}>
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