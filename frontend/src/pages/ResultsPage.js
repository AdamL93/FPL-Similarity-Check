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
            setResult(JSON.stringify(result,null, 1))

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
      <h1>THIS IS THE RESULTS PAGE</h1>
      <h2>The inputted team id is: {inputValue} </h2>
      
        <div className="result-container">
          <div className="result-box">
          <h1>THIS IS THE FIRST SET OF DATA</h1>
          <ul>
            {result}

          </ul>
          </div>
      </div>
    </div>
  );
}

export default ResultsPage;