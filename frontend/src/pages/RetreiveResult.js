

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ResultsList from '../components/ResultsList';
import GetSimilarityColour from '../components/GetSimilarityColour';
import MappedResults from '../components/MapResults';
import { useState } from "react"


const RetreiveResult = () => {

    const [inputValue, setInputValue] = useState("")
    const [retreivedResult, setRetreivedResult] = useState("");


    //handle retreive button submit
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const response = await fetch(`/api/fplDatabase/SavedResults/${inputValue}`)

        console.log(response)

        const json = await response.json()
    
        if (!response.ok) {
            console.log("Retreival Unsuccessful")
            console.log(json)
        }
        if(response.ok) {
            
            console.log("Retrieval Successful");
            console.log("This is the result array:", json.resultsArray);
            console.log("Type of json.resultsArray:", typeof json.resultsArray);
            console.log("Is json.resultsArray an array?", Array.isArray(json.resultsArray));
            console.log("Contents of json.resultsArray:", json.resultsArray);

            const mappedResults = MappedResults(json.resultsArray)
            setRetreivedResult(mappedResults)
        }
    }
 
    return (

        <Container fluid="xs" className="d-flex justify-content-center align-items-center" style={{ minHeight: '15vh' }}>
            <Row className="d-flex justify-content-center w-50">
            <form onSubmit={handleSubmit}>
                <h3>Retreive Results</h3>
                <input 
                    type="string"
                    placeholder="Enter result object id"
                    value={inputValue}
                    onChange={({target}) => {
                    console.log(target.value)
                    setInputValue(target.value)}
                }
                />
                <button type="submit" >Retreive</button>
            </form>  
            </Row> 

            <Row>
            <ResultsList
            filteredResult={retreivedResult}
            getSimilarityColour={GetSimilarityColour}
          />
            </Row>


        </Container>
    );
};

export default RetreiveResult;



