
import React from 'react';
import { Card } from 'react-bootstrap';

function CreatorResultsComponent({ teamId, similarity, avgTextColour, gwTextColour, highestGameweekSimilarity}) {



  return (
    <Card style={{ width: '18rem',  marginTop: '40px'}}>
      <Card.Body>
        <Card.Title style={{ color: 'purple' }}>{teamId}</Card.Title>
        <Card.Text style={{ color: avgTextColour }}>{similarity}</Card.Text>
        <Card.Text style={{ color: gwTextColour }}>{highestGameweekSimilarity}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CreatorResultsComponent;
