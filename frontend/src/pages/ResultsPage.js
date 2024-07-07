// Results page
import React from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ResultsPage = () => {

  const location = useLocation();
  const { inputValue, inputValue2 } = location.state;
  const [result, setResult] = useState('');

  const fetchData = async () => {

      try {
          const response = await fetch(`/api/fplDatabase/${inputValue}/${inputValue2}`);
          const result = await response.json();

          if (response.ok) {
            //const formattedResulted = result.map(num => num.toString()).join(' ')
            setResult(result)

            console.log('Response Ok');
          } else {
            throw new Error('Failed to fetch data');
          }
          
        } catch (err) {
          console.log("error occurred")
        }
  }

  useEffect(() => {
    fetchData()
  },[inputValue, inputValue2])

  return (
    <div>
      <div className="banner">Results</div>
      <div className="team-id">
        <span style={{ marginRight: '10px' }}>Team Id: {inputValue}</span>
        Team Id 2: {inputValue2}
      </div>
      <div className="result-container">
        <h2>Results List</h2>
        <div className="result-box">
          <ul>
            {result.length > 0 ? (
              result.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <li>No data available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;