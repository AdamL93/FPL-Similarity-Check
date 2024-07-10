import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react'

//pages and components
import Home from './pages/Home'
import NavbarFunction from './components/Navbar'
import ResultsPage from './pages/ResultsPage'

function App() {

  const [searchResults, setSearchResults] = useState({})

  return (
    <div className="App">
      <BrowserRouter>
      <NavbarFunction />
      
      <div className="pages">
        <Routes>
          <Route exact path="/" element ={<Home searchResults={searchResults} setSearchResults={setSearchResults}/>} />
          <Route path="/ResultsPage" element={<ResultsPage searchResults={searchResults} setSearchResults={setSearchResults}/>}/> 
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
