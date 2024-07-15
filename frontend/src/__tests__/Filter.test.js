import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddSwitch from '../components/Filter';

describe(AddSwitch, () => {
    it('Should render text passed to label prop', () => {

        render(<AddSwitch label="Filter"/>);
        const switchLabel = screen.getByLabelText(/filter/i);
        expect(switchLabel).toBeInTheDocument();

    })

    it('calls toggleSwtich function when the switch is clicked', () => {
    const toggleSwitch = jest.fn();
    
    // Render the component
    render(<AddSwitch label="Test Switch" onChange={toggleSwitch} />);
    
    // Get the switch element by role
    const switchElement = screen.getByRole('checkbox');
    
    // mimics click event
    fireEvent.click(switchElement);
    
    // Check if the toggleSwitch function was called exactly once.
    expect(toggleSwitch).toHaveBeenCalledTimes(1);
    })

})