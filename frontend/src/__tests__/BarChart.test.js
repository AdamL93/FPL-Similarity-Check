import React from 'react';
import { render, screen } from '@testing-library/react';
import BarChartComponent from '../components/BarChart';

describe(BarChartComponent, () => {
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
        render(<BarChartComponent data={testData}/>);
    });

    it('Should render BarChartComponent with test data', () => {
        const barChart = screen.getByTestId('bar chart');
        expect(barChart).toBeInTheDocument();
    });

    it('Should render bars on the bar chart', () => {
        const bars = document.querySelectorAll('.recharts-bar');
        expect(bars.length).toBeGreaterThan(0); 
    });

    it('Should render a tooltip', () => {
        const tooltip = document.querySelector('.recharts-tooltip-wrapper');
        expect(tooltip).toBeInTheDocument();
    });
    });