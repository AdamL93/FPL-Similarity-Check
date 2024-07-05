// Results page
import React from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ResultsPage = () => {

  const location = useLocation();
  const { inputValue, inputValue2 } = location.state;
  const [result, setResult] = useState('');
  const [result2, setResult2] = useState('');
  const [similarityResult, setSimilarityResult] = useState('')

  const fetchData = async () => {

      try {
          const response = await fetch(`/api/fplDatabase/${inputValue}`);
          const response2 = await fetch(`/api/fplDatabase/${inputValue2}`);
          const result = await response.json();
          const result2 = await response2.json();

          if (response.ok) {
            setResult(result)
            setResult2(result2)
            console.log('Response Ok');
          } else {
            throw new Error('Failed to fetch data');
          }
          
        } catch (err) {
          console.log("error occurred")
        }

        const response3 = await fetch('/api/fplDatabase/comparison', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            team1Data: result,
            team2Data: result2,
          }),
        });

        if (response3.ok) {
          setSimilarityResult(similarityResult)
        } else {
          throw new Error('Failed to compare team results')
        }
  }

  useEffect(() => {
    fetchData()
  },[inputValue, inputValue2])

  return (
    <div>
        <h1>THIS IS THE RESULTS PAGE</h1>
        <h2>The inputted team id is: {inputValue} </h2>
        <div>
          <h1>THIS IS THE FIRST SET OF DATA</h1>
          <pre>{similarityResult}</pre>
        </div>
        

    </div>
  );
}

export default ResultsPage;