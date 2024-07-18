import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreatorResultsComponent from '../components/CreatorResultsComponent';



const testResults = [{"202710": [14]}, {"86266": [22]}, {"45645": [66]}, {"546456": [99]}, {"678456345": [14]}, {"987657": [22]}, {"1422": [66]}, {"53688": [99]}]
const resultsLength = testResults.length

const resultsObject = testResults[0]

//team id key
const teamIdKey = Object.keys(resultsObject)[0];

//results array from teamid key
const resultsArray = resultsObject[teamIdKey]

//overall similarity in results array
const overallSimilarity = resultsArray[0]

const CreatorResults = () => {

      return (
        <Container>
          <Row>
            {testResults.map((result, index) => {
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