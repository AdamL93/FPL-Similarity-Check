import React from 'react';
import { render, screen } from '@testing-library/react';
import AddProgressBar from '../components/ProgressBar';

describe(AddProgressBar, () => {

    it("Should render the progress bar component", () => {
        render(<AddProgressBar />)
        const progressBar = screen.getByRole("progressbar")
        expect(progressBar).toBeInTheDocument();

    })

    it("Should set variant to bg-warning(Yellow) when progressNumber is between 40-60", () => {
        render(<AddProgressBar progressNumber={40}/>)
        const progressBar = screen.getByRole("progressbar")
        expect(progressBar).toHaveClass("bg-warning");

    })

    it("Should set variant to bg-success(Green) when progressNumber < 40", () => {
        render(<AddProgressBar progressNumber={39}/>)
        const progressBar = screen.getByRole("progressbar")
        expect(progressBar).toHaveClass("bg-success");

    })

    it("Should set variant to bg-danger(Red) when progressNumber > 60", () => {
        render(<AddProgressBar progressNumber={88}/>)
        const progressBar = screen.getByRole("progressbar")
        expect(progressBar).toHaveClass("bg-danger");

    })

    it("Should render the number correctly", () => {
        render(<AddProgressBar progressNumber={50}/>)
        const labelNumber = screen.getByText("50%")
        expect(labelNumber).toBeInTheDocument();
    })


})