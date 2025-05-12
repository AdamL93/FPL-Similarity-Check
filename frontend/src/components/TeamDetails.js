import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * TeamDetails Component
 * 
 * This component displays two team Ids using Bootstrap's Row and Col fucntionality.
 * The two Ids are separated by providing the first Team Id with Margin to the right.
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
const TeamDetails = ({ inputValue, inputValue2, teamName1, teamName2 }) => (
  <Row className="team-id">
    <Col>
        Team 1: {teamName1}, {inputValue}
    </Col>
    <Col>
      Team 2: {teamName2}, {inputValue2}
    </Col>
  </Row>
);

export default TeamDetails;
