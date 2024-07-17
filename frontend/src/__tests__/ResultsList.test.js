import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultsList from '../components/ResultsList';

describe('ResultsList component', () => {

  const mockFilteredResult = [
    { gameweek: 1, similarity: 70 },
    { gameweek: 2, similarity: 50 },
  ];

  const mockToggleFilter = jest.fn();
  const mockGetSimilarityColour = jest.fn().mockReturnValue('green');

  beforeEach(() => {
    render(
      <ResultsList
        filteredResult={mockFilteredResult}
        toggleFilter={mockToggleFilter}
        getSimilarityColour={mockGetSimilarityColour}
      />
    );
  });

  it('Should render the results list', () => {
    const renderList = screen.getByText('Gameweek Similarity')
    expect(renderList).toBeInTheDocument();
  });

  it('should render the correct number of list items', () => {
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBe(mockFilteredResult.length)
  });

  it('Should call toggleSwitch when AddSwitch is changed', () => {
    const similarityFilter = screen.getByRole('checkbox');
    fireEvent.click(similarityFilter);
    expect(mockToggleFilter).toHaveBeenCalled();
  });

  it('Should give feedback if there are no results', () => {
    render(<ResultsList filteredResult={[]}/>);
    const noResultsMessage = screen.getByText('No available data')
    expect(noResultsMessage).toBeInTheDocument();
  });


  it('renders filtered result items with AddProgressBar', () => {

    const gameweekElement = screen.getByText(`GW 1:`);
    const similarityElement = screen.getByText('70%', { selector: 'span' });
    
    expect(gameweekElement).toBeInTheDocument();
    expect(similarityElement).toBeInTheDocument();

    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars).toHaveLength(mockFilteredResult.length);


  });

});
