import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResultsList from '../components/ResultsList';
import GetSimilarityColour from '../components/GetSimilarityColour';
import MappedResults from '../components/MapResults';
import TeamDetails from '../components/TeamDetails';
import { useState } from "react";

/**
 * The `RetreiveResult` component allows users to retrieve saved search results from the database.
 * 
 * It provides a form for users to input an object ID which fetches the data from the server. 
 * The data is retrieved and the results displayed. 
 * 
 * @component
 * @returns {JSX.Element} The rendered RetreiveResult component which includes a form to retrieve and display the results.
 */
const RetreiveResult = () => {

    const [inputValue, setInputValue] = useState("");
    const [retreivedResult, setRetreivedResult] = useState([]);
    const [overallSimilarity, setOverallSimilarity] = useState();
    const [teamIds, setTeamIds] = useState([]);
    const [timestamp, setTimestamp] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);

    /**
     * Determines the colour for the overall similarity text based on its value.
     * 
     * @type {string}
     */
    const similarityColour = GetSimilarityColour(overallSimilarity);

    /**
     * Handles form submission to retrieve saved results based on the provided result object ID.
     * Fetches data from the server and updates the component state with the retrieved results.
     * 
     * @async
     * @function
     * @param {React.FormEvent} e - The form submit event.
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputValue !== "") {
            const response = await fetch(`/api/fplDatabase/SavedResults/${inputValue}`);
            console.log(response);

            const json = await response.json();

            if (!response.ok) {
                console.log("Retreival Unsuccessful");
                console.log(json);
                setRetreivedResult([]);
                setOverallSimilarity(null);
                setTeamIds([" null", " null"]);
                setTimestamp(null);
                setIsSubmitted(true);
            } else {
                console.log("Retrieval Successful");
                console.log("This is the result array:", json.resultsArray);
                console.log("Type of json.resultsArray:", typeof json.resultsArray);
                console.log("Is json.resultsArray an array?", Array.isArray(json.resultsArray));
                console.log("Contents of json.resultsArray:", json.resultsArray);

                const mappedResults = MappedResults(json.resultsArray);
                setRetreivedResult(mappedResults);
                setOverallSimilarity(json.overallSimilarity);
                setTeamIds(json.teamIds);
                setTimestamp(json.createdAt);
                setIsSubmitted(true);
            }
        }
    }

    return (
        <Container fluid="xs" style={{ minHeight: '100vh' }}>
            <Row className="d-flex justify-content-center align-items-center" style={{ minHeight: '15vh' }}>
                <Col xs={12}>
                    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                        <h3>Retrieve Results</h3>
                        <input 
                            type="text"
                            placeholder="Enter result object id"
                            value={inputValue}
                            onChange={({ target }) => setInputValue(target.value)}
                            className="mb-2"
                        />
                        <button type="submit">Retrieve</button>
                    </form>
                </Col>
            </Row>

            {isSubmitted && (
                <Row className="mt-3">
                    <Col xs={12} md={6}>
                        <ResultsList
                            filteredResult={retreivedResult}
                            getSimilarityColour={GetSimilarityColour}
                        />
                    </Col>
                    
                    <Col>
                        <Row className="overall-container">
                            <h2>
                                <span style={{ color: similarityColour }}>
                                    {`Overall Similarity: ${overallSimilarity}%`}
                                </span>
                            </h2>
                        </Row>

                        <Row className="overall-container">
                            <TeamDetails inputValue={teamIds[0]} inputValue2={teamIds[1]} />
                        </Row>

                        <Row className="overall-container">
                            <span style={{ fontSize: "16px" }}>
                                {`Date Saved: ${timestamp}`}
                            </span>
                        </Row>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default RetreiveResult;
