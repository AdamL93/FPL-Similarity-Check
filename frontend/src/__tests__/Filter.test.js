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

    render(<AddSwitch label="Test Switch" onChange={toggleSwitch} />);
    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);
    expect(toggleSwitch).toHaveBeenCalledTimes(1);
    })

})