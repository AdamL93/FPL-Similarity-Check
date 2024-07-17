import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home'; 
import SearchBar from '../components/SearchBar';

describe(Home, () => {

    it('Should receive correct values from search bar', () => {

        const handleSearchSubmit = jest.fn();
    
        render(<SearchBar handleSearchSubmit={handleSearchSubmit} />);
    
        const input1 = screen.getByPlaceholderText('Enter team id');
        const input2 = screen.getByPlaceholderText('Enter second team id');
        const button = screen.getByText('Search');
    
        fireEvent.change(input1, { target: { value: '123' } });
        fireEvent.change(input2, { target: { value: '456' } });
    
        fireEvent.click(button);
    
        expect(handleSearchSubmit).toHaveBeenCalledTimes(1);
        expect(handleSearchSubmit).toHaveBeenCalledWith('123', '456');
      });
});

