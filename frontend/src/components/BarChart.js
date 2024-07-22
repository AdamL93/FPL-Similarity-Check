import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Rectangle, ResponsiveContainer } from 'recharts';

/**
 * BarChartComponent displays a responsive bar chart using the Recharts library.
 * The chart adjusts its height based on the window size and displays similarity percentages across different gameweeks.
 * 
 * @component
 * @param {Object[]} props.data - The data to be displayed in the bar chart. Each item in the array should be an object with `gameweek` and `similarity` properties.
 * @param {string|number} props.data[].gameweek - The gameweek number for each data point.
 * @param {number} props.data[].similarity - The similarity percentage to be displayed as a bar in the chart.
 * 
 * @example
 * const data = [
 *   { gameweek: 1, similarity: 65 },
 *   { gameweek: 2, similarity: 70 },
 *   { gameweek: 3, similarity: 80 },
 * ];
 * 
 * return <BarChartComponent data={data} />;
 * 
 * @returns {JSX.Element} The rendered bar chart component.
 */
function BarChartComponent({ data }) {
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

  const chartHeight = Math.min(windowHeight * 0.5, 400);

  return (
    <div data-testid='bar chart'>
      <ResponsiveContainer width={"100%"} height={chartHeight}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          <Bar 
            dataKey="similarity" 
            name="Similarity %" 
            fill="purple" 
            activeBar={<Rectangle stroke="purple" />} 
            barSize={8} 
            barGap={1} 
          />
          <Legend verticalAlign="top" align="center" wrapperStyle={{ marginLeft: 40 }} />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
