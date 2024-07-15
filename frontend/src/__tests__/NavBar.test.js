import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavbarHeader from '../components/Navbar';


describe(NavbarHeader, () => {

    beforeEach(() => {
        render(
          <BrowserRouter>
            <NavbarHeader />
          </BrowserRouter>
        );
      });

    it("Should render NavBar Header component", () => {

        const header = screen.getByRole("navigation");
        expect(header).toBeInTheDocument();

    })
    
    describe("Tests for Logo", () => {

        it("Should render the logo component", () => {

            const logo = screen.getByAltText(/logo/i)
            expect(logo).toBeInTheDocument();
        })

        it('navigates to the home page when clicked', () => {
            const logo = screen.getByAltText(/logo/i);
            fireEvent.click(logo);
            expect(window.location.pathname).toBe('/');
          });
    })

    describe("Tests for HomeLink", () => {

        it("Should render the HomeLink component", () => {

            const homeLink= screen.getByRole('link', { name: /home/i });
            expect(homeLink).toBeInTheDocument();
        })

        it('navigates to the home page when clicked', () => {
            const homeLink = screen.getByRole('link', { name: /home/i });
            fireEvent.click(homeLink);
            expect(window.location.pathname).toBe('/');
          });
    })

    describe("Tests for Dropdown", () => {

        it("Should render the dropdown component", () => {

            const dropdownToggle = screen.getByRole('button', { name: /options/i });
            expect(dropdownToggle).toBeInTheDocument();

        })

        it('Should open the dropdown menu on click', () => {
            const dropdownToggle = screen.getByRole('button', { name: /options/i });
            fireEvent.click(dropdownToggle);
      
            const accountDetailsItem = screen.getByRole('link', { name: /account details/i });
            expect(accountDetailsItem).toBeInTheDocument();
      
            const signOutItem = screen.getByRole('link', { name: /sign out/i });
            expect(signOutItem).toBeInTheDocument();
          });
    })
})