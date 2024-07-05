// Results page
import React from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ResultsPage = () => {

  const location = useLocation();
  const { searchQuery } = location.state;
  const [result, setResult] = useState('');

  const fetchData = async () => {

      try {
          const response = await fetch(`/api/fplDatabase/${searchQuery}`);
          const result = await response.json();

          if (response.ok) {
            setResult(result);
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
  },[searchQuery])

  return (
    <div>
        <h1>THIS IS THE RESULTS PAGE</h1>
        <h2>The inputted team id is: {searchQuery} </h2>
        <pre>{result}</pre>

    </div>
  );
}

export default ResultsPage;