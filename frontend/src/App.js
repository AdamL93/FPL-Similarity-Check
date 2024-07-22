import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import NavbarHeader from './components/Navbar';
import ResultsPage from './pages/ResultsPage';
import CreatorResults from './pages/CreatorResults';
import RetreiveResult from './pages/RetreiveResult';

/**
 * Main application component that sets the routing and state management for the app.
 * 
 * Uses React Router to manage routes.
 * displays the correct page depending on the current URL. 
 * 
 * @component
 * @example
 * return (
 *   <App />
 * );
 */
function App() {

  // State to hold search results across different pages
  const [searchResults, setSearchResults] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarHeader />
        
        <div className="pages">
          <Routes>
            {/* Route for the Home page */}
            <Route
              exact
              path="/"
              element={<Home searchResults={searchResults} setSearchResults={setSearchResults} />}
            />
            {/* Route for the ResultsPage */}
            <Route
              path="/ResultsPage"
              element={<ResultsPage searchResults={searchResults} setSearchResults={setSearchResults} />}
            />
            {/* Route for the CreatorResults page */}
            <Route
              path="/CreatorResults"
              element={<CreatorResults searchResults={searchResults} setSearchResults={setSearchResults} />}
            />
            {/* Route for the RetrieveResult page */}
            <Route
              path="/RetreiveResult"
              element={<RetreiveResult />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
