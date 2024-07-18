import React from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'


import FetchData from '../components/FetchComparisonData';
import ResultsList from '../components/ResultsList';
import TeamDetails from '../components/TeamDetails';
import MappedResults from '../components/MapResults';
import GetSimilarityColour from '../components/GetSimilarityColour';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreatorResultsComponent from '../components/CreatorResultsComponent';

const testResults = [
    {
      '7632': [
        47, 53, 53, 53, 47, 33, 40, 60, 60, 60,
        67, 60, 67, 60, 53, 53, 67, 60, 53, 53,
        53, 47, 47, 53, 60, 47, 47, 47, 67, 53,
        53, 53, 53, 47, 47, 47, 47, 53, 53
      ]
    }
  ]

const CreatorResults = () => {

const [fetchedResults, setFetchedResults] = useState([])



   const location = useLocation();
   const { inputValue } = location.state;

   useEffect(() => {
    const FetchApiData = async () => {
      const responseResult = await FetchData(inputValue);
      console.log("THIS IS THE FETCHED RESULTS DATA")
      console.log(typeof(responseResult))
      console.log('')
      console.log(responseResult)
      const fetchedResults = responseResult.responseResult.map(teamObject => ({ ...teamObject}));
      setFetchedResults(fetchedResults)
    };
    FetchApiData();
  }, [inputValue]);

      return (
        <Container>

        <Row>
          {fetchedResults.map((result, index) => {
            const teamIdKey = Object.keys(result)[0];
            const overallSimilarity = result[teamIdKey][0]; 
  
            return (
              <Col key={index} xs={12} md={6} lg={3}>
                <CreatorResultsComponent
                  title={`Team Id:  ${teamIdKey}`}
                  description={`Average Similarity: ${overallSimilarity}%`}
                />
              </Col>
            );
          })}
        </Row>

      </Container>
      );
}
export default CreatorResults

/*
const testResults = [{"202710": [14]}, {"86266": [22]}, {"45645": [66]}, {"546456": [99]}, {"678456345": [14]}, {"987657": [22]}, {"1422": [66]}, {"53688": [99]}]


const testResults =   {
    '7632': [
      47, 53, 53, 53, 47, 33, 40, 60, 60, 60,
      67, 60, 67, 60, 53, 53, 67, 60, 53, 53,
      53, 47, 47, 53, 60, 47, 47, 47, 67, 53,
      53, 53, 53, 47, 47, 47, 47, 53, 53
    ]
  },
  {
    '11349': [
      60, 60, 53, 47, 47, 47, 40, 40, 53, 40,
      47, 40, 47, 40, 33, 33, 33, 47, 47, 47,
      40, 33, 33, 33, 40, 27, 33, 40, 53, 47,
      40, 47, 47, 53, 60, 60, 53, 47, 44
    ]
  },
  {
    '12': [
      53, 53, 60, 53, 47, 47, 47, 33, 40, 53,
      60, 53, 60, 53, 47, 47, 60, 60, 60, 60,
      60, 53, 53, 60, 60, 47, 47, 53, 67, 60,
      60, 53, 53, 53, 53, 53, 53, 53, 54
    ]
  },
  {
    '4746': [
      47, 47, 60, 60, 60, 53, 60, 40, 47, 60,
      67, 60, 67, 53, 47, 47, 53, 67, 67, 67,
      60, 60, 53, 47, 53, 47, 47, 53, 73, 33,
      40, 40, 33, 40, 47, 47, 53, 53, 53
    ]
  }
*/



/*
  const resultsLength = fetchedResults.length
  const resultsObject = fetchedResults[0]
  
  //team id key
  const teamIdKey = Object.keys(resultsObject)[0];
  
  //results array from teamid key
  const resultsArray = resultsObject[teamIdKey]
  
  //overall similarity in results array
  const overallSimilarity = resultsArray[0]
*/




/*

const resultsarray = [[1],[2],[3]]
const testTeamId = ["202710"]
const contentCreatorIds = [7632]
const combinedArrays = contentCreatorIds.map(teamId => ({ [teamId]: resultsarray }));

*/


/*

        <Row>
          
          {Object.keys(fetchedResults).length > 0 ? (
            Object.keys(fetchedResults).map((teamIdKey, index) => {
              const overallSimilarity = fetchedResults[teamIdKey][0];
              {console.log("This is the console log", overallSimilarity)}
  
              return (
                <Col key={index} xs={12} md={6} lg={3}>
                  <CreatorResultsComponent
                    title={`Team Id: ${teamIdKey}`}
                    description={`Average Similarity: ${overallSimilarity}%`}
                  />
                </Col>
              );
            })
          ) : (
            <p>No results found.</p>
          )}
        </Row>
*/