// Results page
import React from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts';



const ResultsPage = () => {

  const location = useLocation();
  const { inputValue, inputValue2 } = location.state;
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);

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
  

  useEffect(() => {
    const newData = []
    for (let i = 0; i<20;i++) {
      newData.push({
        day:i+1,
        similarity: (Math.random() * 20 + 20).toFixed(2),
        humidity:(Math.random() * 10 + 10).toFixed(2)
      })
    }
    setData(newData)
  },[])


  const getColorClassName = (item) => {

    const number = parseFloat(item.split(':')[1].trim().replace('%', ''));

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
          <XAxis dataKey={"day"} />
          <YAxis dataKey={"similarity"} domain={[0,100]} type="number"/>
          <CartesianGrid stroke="grey" strokeDasharray="5 5"/>
          <Line dataKey={"similarity"} stroke="purple" strokeWidth={4} isAnimationActive={false}/>
          <Line dataKey={"humidity"} stroke="orange" strokeWidth={4} isAnimationActive={false}/>
          <Legend />
          <Tooltip content={<div>a</div>} />


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