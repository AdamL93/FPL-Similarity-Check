
import React from 'react';
import { Card } from 'react-bootstrap';

function CreatorResultsComponent({ title, description }) {
  return (
    <Card style={{ width: '18rem',  marginTop: '40px' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CreatorResultsComponent;
