import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from '../components/SearchBar';

describe(SearchBar, () => {
    it('Should update and render inputValue state with inputed values', () => {

        //renders component to test (tells what component i'd like to test)
        render(<SearchBar handleSearchSubmit={jest.fn()} />);

        //gets element to be tested by definition 
        const input1 = screen.getByPlaceholderText('Enter team id');
        const input2 = screen.getByPlaceholderText('Enter second team id');

        //
        fireEvent.change(input1, { target: { value: '123' } });
        fireEvent.change(input2, { target: { value: '456' } });

        //assertion statement
        expect(input1.value).toBe('123');
        expect(input2.value).toBe('456');

        fireEvent.change(input1, { target: { value: '-' } });
        fireEvent.change(input2, { target: { value: '-' } });

        //assertion statement
        expect(input1.value).toBe('');
        expect(input2.value).toBe('');

    });

    it('should call handleSearchSubmit with correct values on form submit', () => {
        const handleSearchSubmit = jest.fn();
        render(<SearchBar handleSearchSubmit={handleSearchSubmit} />);

        const input1 = screen.getByPlaceholderText('Enter team id');
        const input2 = screen.getByPlaceholderText('Enter second team id');
        const searchButton = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input1, { target: { value: '123' } });
        fireEvent.change(input2, { target: { value: '456' } });

        fireEvent.click(searchButton);

        expect(handleSearchSubmit).toHaveBeenCalledWith('123', '456');
    });
});
