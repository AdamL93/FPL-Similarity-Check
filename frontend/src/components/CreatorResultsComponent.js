import React from 'react';
import { Card } from 'react-bootstrap';

/**
 * CreatorResultsComponent displays a card with the searched content creator team ID, 
 * similarity percentage, and the highest gameweek similarity. 
 * The Average gameweek and highest gameweek similarity colours can be customised through props. 
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.teamId - The ID of the team to be displayed.
 * @param {number|string} props.similarity - The similarity percentage to be displayed.
 * @param {string} props.avgTextColour - The colour of the similarity percentage text.
 * @param {string} props.gwTextColour - The colour of the highest gameweek similarity text.
 * @param {number|string} props.highestGameweekSimilarity - The highest similarity percentage number to be displayed.
 * 
 * @example
 * const teamId = "Team A";
 * const similarity = 85;
 * const avgTextColour = "#FF5733";
 * const gwTextColour = "#33FF57";
 * const highestGameweekSimilarity = 90;
 * 
 * return (
 *   <CreatorResultsComponent
 *     teamId={teamId}
 *     similarity={similarity}
 *     avgTextColour={avgTextColour}
 *     gwTextColour={gwTextColour}
 *     highestGameweekSimilarity={highestGameweekSimilarity}
 *   />
 * );
 * 
 * @returns {JSX.Element} The rendered card component with the provided information.
 */
function CreatorResultsComponent({ teamId, similarity, avgTextColour, gwTextColour, highestGameweekSimilarity }) {

  return (
    <Card style={{ width: '18rem', marginTop: '40px' }}>
      <Card.Body>
        <Card.Title style={{ color: 'purple' }}>{teamId}</Card.Title>
        <Card.Text style={{ color: avgTextColour }}>{similarity}</Card.Text>
        <Card.Text style={{ color: gwTextColour }}>{highestGameweekSimilarity}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CreatorResultsComponent;
