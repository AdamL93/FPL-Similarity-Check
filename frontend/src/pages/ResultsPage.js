// Results page
import React from 'react';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



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
  <Container fluid="xs">
    <Row className="banner">
      <Col>Results </Col>
    </Row>
    <Row>
      <div className="team-id">
        <span style={{ marginRight: '10px' }}>Team Id: {inputValue}</span>
        Team Id 2: {inputValue2}
      </div>
    </Row>
    <Row className="gx-5">
      <Col className="result-container">
       
          <h2>Gameweek Similarity</h2>
            <ul>
              {result.length > 0 ? (
                result.slice(0,-1).map((item, index) => { 
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
      </Col>
      <Col>
        <Row className="overall-container">
          <Col>{`Overall Similarity: ${result[38]}%`}</Col>
        </Row>
        <Row>
          <Col className="mt-5 mb-5">
            <LineChart width={500} height={300} data={data}>
              <XAxis dataKey="gameweek" />
              <YAxis domain={[0, 100]} />
              <CartesianGrid stroke="grey" strokeDasharray="2 2" />
              <Line type="linear" dataKey="similarity" name ="Similarity %" stroke="purple" strokeWidth={2} dot={false} />
              <Legend />
              <Tooltip />
            </LineChart>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
  );
}

export default ResultsPage;