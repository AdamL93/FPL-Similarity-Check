// Results page
import React from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts';



const ResultsPage = () => {

  const location = useLocation();
  const { inputValue, inputValue2 } = location.state;
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {

      try {
          const response = await fetch(`/api/fplDatabase/${inputValue}/${inputValue2}`);
          const result = await response.json();

          if (response.ok) {
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
  

  useEffect(() => {
    const newData = result.slice(0,-1).map((value, index) => ({ gameweek: index + 1, similarity: value }));
    setData(newData);
  }, [result]);

  const getColorClassName = (number) => {

    if (number >= 60) {
      return 'red'; 
    } else if (number < 40) {
      return 'green'; 
    } else {
      return '';
    }
  };

  return (
  <div>
    <div className="banner">Results</div>
    <div className="team-id">
      <span style={{ marginRight: '10px' }}>Team Id: {inputValue}</span>
      Team Id 2: {inputValue2}
    </div>
    <div className = "results-page">
      <div className="overall-container">
          <h2>{result[38]}</h2>
      </div>
      <div>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="gameweek" />
        <YAxis domain={[0, 100]} />
        <CartesianGrid stroke="grey" strokeDasharray="2 2" />
        <Line type="monotone" dataKey="similarity" stroke="purple" strokeWidth={4} dot={false} />
        <Legend />
        <Tooltip />
      </LineChart>
      </div>
      <div className="result-container">
        <h2>Gameweek Similarity</h2>
        <div className="result-box">
          <ul>
            {result.length > 0 ? (
              result.map((item, index) => { 
                const className = getColorClassName(item);
                return (
                  <li
                    key={index}
                    className={className}
                  >
                    {item}
                  </li>
                );
              })
            ) : (
              <li>No available data</li>
            )}
          </ul>
        </div>

      </div>
    </div>
  </div>
  );
}

export default ResultsPage;