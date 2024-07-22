import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * LineChartComponent renders a responsive line chart using the Recharts library.
 * The chart adjusts its width and height based on the devices window size and displays similarity percentages across different gameweeks.
 * 
 * @component
 * @param {Object[]} props.data - The data to be displayed in the line chart. Each item in the array should be an object with `gameweek` and `similarity` properties.
 * @param {string|number} props.data[].gameweek - The gameweek for each data point.
 * @param {number} props.data[].similarity - The similarity percentage to be displayed as a point on the line in the chart.
 * 
 * @example
 * const data = [
 *   { gameweek: 1, similarity: 60 },
 *   { gameweek: 2, similarity: 70 },
 *   { gameweek: 3, similarity: 80 },
 * ];
 * 
 * return <LineChartComponent data={data} />;
 * 
 * @returns {JSX.Element} The rendered line chart component.
 */
function LineChartComponent({ data }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const chartWidth = Math.min(windowWidth * 0.8, 800);
  const chartHeight = Math.min(windowHeight * 0.5, 400);

  return (
    <div data-testid="line chart">
      <ResponsiveContainer width={chartWidth} height={chartHeight}>
        <LineChart data={data}>
          <XAxis 
            dataKey="gameweek" 
            interval={0} 
            tick={{ fontSize: 12 }} 
            label={{
              value: 'Gameweek Number', 
              position: 'insideBottom', 
              offset: -5,
              style: { fontWeight: '500', fill: '#4A4A4A' }
            }}
          />
          <YAxis 
            domain={[0, 100]} 
            label={{
              value: 'Similarity %', 
              angle: -90, 
              position: 'insideLeft', 
              dy: 40,
              style: { fontWeight: '500', fill: '#4A4A4A' }
            }} 
          />
          <CartesianGrid stroke="grey" strokeDasharray="2 2" />
          <Line type="linear" dataKey="similarity" name="Similarity %" stroke="purple" strokeWidth={2} dot={false} />
          <Legend verticalAlign="top" align="center" wrapperStyle={{ marginLeft: 40 }} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;
