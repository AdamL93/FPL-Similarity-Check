// Results page
import React from 'react';
import AddProgressBar from '../components/ProgressBar';
import AddSwitch from '../components/Filter'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BarChartComponent from '../components/BarChart';
import LineChartComponent from '../components/LineChart';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const ResultsPage = () => {

  const location = useLocation();
  const { inputValue, inputValue2 } = location.state;
  const [result, setResult] = useState([]);
  const [overallSimilarity, setOverallSimilarity] = useState();
  const [mappedResults, setMappedResults] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [filteredResult, setFilteredResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fplDatabase/${inputValue}/${inputValue2}`);
        const responseResult = await response.json();
  
        if (response.ok) {
          setResult(responseResult.slice(0,-1));
          setOverallSimilarity(responseResult[responseResult.length - 1])
          console.log('Response Ok');
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        console.log("error occurred")
      }
    };
  

    
    fetchData();
  }, [inputValue, inputValue2]); 
  
//needs better naming instead of newData
  useEffect(() => {
    const mappedResults = result.map((value, index) => ({ gameweek: index + 1, similarity: value }));
    setMappedResults(mappedResults);

    if (filterState) {
      const filteredResults = mappedResults.filter(object => object.similarity >= 40);
      setFilteredResult(filteredResults);
    } else {
      setFilteredResult(mappedResults);
    }
  }, [result, filterState]);

  const getSimilarityColour = (number) => {

    if (number >= 60) {
      return 'red'; 
    } else if (number < 40) {
      return 'green'; 
    } else {
      return 'orange';
    }
  };

  const overallSimilarityColour = getSimilarityColour(overallSimilarity);

  const toggleFilter = () => {
  setFilterState(prevState => !prevState);
};

  return (
  <Container fluid="xs">
    <Row className="banner gx-5">
      <Col>Results</Col>
    </Row>
    <Row className="team-id">
      <Col>
        <span style={{ marginRight: '40px' }}>Team Id: {inputValue}</span>
        Team Id 2: {inputValue2}
      </Col>
    </Row>
    <Row className="gx-5">
      <Col className="result-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Gameweek Similarity</h2>
          <AddSwitch label="Filter > 40%" onChange={toggleFilter} />
        </div>
        
        <ul>
          {filteredResult.length > 0 ? (
            filteredResult.map((result, index) => { 
              const similarityColour = getSimilarityColour(result.similarity);
              return (
                <li key={index}>
                  <span style={{ color: "purple" }}>{`GW ${result.gameweek}: `}</span>
                  <span style={{ color: similarityColour, fontSize: '24px' }}>{`${result.similarity}%`}</span>
                  {AddProgressBar(result.similarity)}
                </li>
              );
            })
          ) : (
            <li>No available data</li>
          )}
        </ul>
      </Col>
      <Col>
        <Row className="overall-container">
          <Col>
            <h2>
              <span style={{ color: overallSimilarityColour}}>
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