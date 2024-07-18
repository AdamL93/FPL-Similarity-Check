
import React from 'react';
import { Card } from 'react-bootstrap';

function CreatorResultsComponent({ title, description, textColour}) {



  return (
    <Card style={{ width: '18rem',  marginTop: '40px'}}>
      <Card.Body>
        <Card.Title style={{ color: 'purple' }}>{title}</Card.Title>
        <Card.Text style={{ color: textColour }}>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CreatorResultsComponent;
