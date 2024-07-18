import React from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import FetchData from '../components/FetchComparisonData';
import GetSimilarityColour from '../components/GetSimilarityColour';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreatorResultsComponent from '../components/CreatorResultsComponent';


const CreatorResults = () => {

  const [fetchedResults, setFetchedResults] = useState([])
  const location = useLocation();
  const { inputValue } = location.state;

  useEffect(() => {
    const FetchApiData = async () => {
    const responseResult = await FetchData(inputValue);
    const fetchedResults = responseResult.responseResult.map(teamObject => ({ ...teamObject}));
    setFetchedResults(fetchedResults)
  };
  FetchApiData();
}, [inputValue]);

    return (
      <Container>

      <Row>
        {fetchedResults.map((result, index) => { 

          const teamIdKey = Object.keys(result);
          const arrayLength = result[teamIdKey].length;
          
          const overallSimilarity = result[teamIdKey][arrayLength - 1]; 
          const reducedArray = result[teamIdKey].slice(0,-1)
          const highestGameweekSimilarity = Math.max(...reducedArray)
          const similarityColour = GetSimilarityColour(overallSimilarity)
          const highestGwSimilarityColour = GetSimilarityColour(highestGameweekSimilarity)

          return (
            <Col key={index} xs={12} md={6} lg={3}>
              <CreatorResultsComponent
                teamId={`Team Id:  ${teamIdKey}`}
                similarity={`Average Similarity: ${overallSimilarity}%`}
                highestGameweekSimilarity = {`Highest GW Similarity:  ${highestGameweekSimilarity}%`}
                avgTextColour={similarityColour}
                gwTextColour={highestGwSimilarityColour}
                
              />
            </Col>
          );
        })}
      </Row>

    </Container>
    );
}
export default CreatorResults