

// watch mock requests tutorial!
//watch integration test!!


import React from 'react';
import { render } from '@testing-library/react';
import ResultsList from '../components/ResultsList';

// Mock components and functions as needed
jest.mock('../components/Filter', () => {
  return function MockAddSwitch({ label, onChange }) {
    return <div data-testid="mock-add-switch">{label}</div>;
  };
});

jest.mock('../components/ProgressBar', () => {
  return function MockAddProgressBar({ progressNumber }) {
    return <div data-testid="mock-add-progress-bar">{progressNumber}</div>;
  };
});

describe('ResultsList component', () => {
  it('renders with filtered results', () => {
    const filteredResult = [
      { gameweek: 1, similarity: 50 },
      { gameweek: 2, similarity: 60 },
    ];

    const toggleFilter = jest.fn();
    const getSimilarityColour = jest.fn().mockReturnValue('orange');

    const { getByText, getAllByTestId } = render(
      <ResultsList
        filteredResult={filteredResult}
        toggleFilter={toggleFilter}
        getSimilarityColour={getSimilarityColour}
      />
    );

    // Check if the component renders "Gameweek Similarity"
    expect(getByText('Gameweek Similarity')).toBeInTheDocument();

    // Check if AddSwitch component is rendered with correct label
    expect(getByText('Filter > 40%')).toBeInTheDocument();

    // Check if each filtered result item is rendered with correct gameweek and similarity
    filteredResult.forEach((result, index) => {
      expect(getByText(`GW ${result.gameweek}:`)).toBeInTheDocument();
      expect(getAllByTestId('mock-add-progress-bar')[index]).toHaveTextContent(`${result.similarity}`);
    });

    // Check if getSimilarityColour function is called for each filtered result
    expect(getSimilarityColour).toHaveBeenCalledTimes(filteredResult.length);
  });

  it('renders no data message when filteredResult is empty', () => {
    const filteredResult = [];

    const toggleFilter = jest.fn();
    const getSimilarityColour = jest.fn();

    const { getByText } = render(
      <ResultsList
        filteredResult={filteredResult}
        toggleFilter={toggleFilter}
        getSimilarityColour={getSimilarityColour}
      />
    );

    // Check if the component renders "No available data" message
    expect(getByText('No available data')).toBeInTheDocument();
  });
});