import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LineChartComponent from '../components/LineChart';

describe(LineChartComponent, () => {
  const testData = [
    { gameweek: 1, similarity: 0 },
    { gameweek: 2, similarity: 1 },
    { gameweek: 3, similarity: 10 },
    { gameweek: 4, similarity: 30},
    { gameweek: 5, similarity: 50 },
    { gameweek: 6, similarity: 99 },
    { gameweek: 7, similarity: 100 },
  ];

    beforeEach(() => {
        render(<LineChartComponent data={testData}/>);
    });

    it('renders LineChartComponent with test data', () => {
        const lineChart = screen.getByTestId('line chart');
        expect(lineChart).toBeInTheDocument();
    });

    it('Should render lines on the line chart', async () => {
        // Checks number of lines that have been rendered on the chart.
        render(<LineChartComponent data={testData}/>);
    
        // is waitfor necessary?
        await waitFor(() => {
            const lines = document.querySelectorAll('.recharts-line');
            expect(lines.length).toBeGreaterThan(0);
        });
    });



    it('Should render a tooltip', () => {
        const tooltip = document.querySelector('.recharts-tooltip-wrapper');
        expect(tooltip).toBeInTheDocument();
    });
    });


/*  CHECKS FOR NUMBER OF DATA POITNS ON THE LINE. NOT WORKING JUST NOW THOUGH "CIRCLES" IS NOT RECOGNISED.
    
    it('Should render correct number of data points on each line', async () => {
        await waitFor(() => {
            const lines = document.querySelectorAll('.recharts-line');
            lines.forEach((line, index) => {
                const dataPoints = line.querySelectorAll('circle');
                expect(dataPoints.length).toBe(testData.length);
            });
        });
    }); */