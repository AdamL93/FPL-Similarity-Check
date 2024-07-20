import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TeamDetails= ({ inputValue, inputValue2 }) => (
  <Row className="team-id">
    <Col>
      <span style={{ marginRight: '60px' }}>Team Id 1: {inputValue}</span>
      Team Id 2: {inputValue2}
    </Col>
  </Row>
);

export default TeamDetails;