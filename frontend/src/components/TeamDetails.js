import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * TeamDetails Component
 * 
 * This component displays two team IDs using Bootstrap's Row and Col fucntionality.
 * The two ID's are separated by providing the first Team ID with Margin to the right.
 * 
 * @component
 * @example
 * const inputValue = "12345";
 * const inputValue2 = "67890";
 * return <TeamDetails inputValue={inputValue} inputValue2={inputValue2} />;
 * 
 * @param {Object} props - The properties object.
 * @param {string|number} props.inputValue - The first team ID to display.
 * @param {string|number} props.inputValue2 - The second team ID to display.
 * @returns {JSX.Element} The rendered component.
 */
const TeamDetails = ({ inputValue, inputValue2 }) => (
  <Row className="team-id">
    <Col>
      <span style={{ marginRight: '60px' }}>Team Id 1: {inputValue}</span>
      Team Id 2: {inputValue2}
    </Col>
  </Row>
);

export default TeamDetails;
