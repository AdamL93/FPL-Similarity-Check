

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const RetreiveResult = () => {

    const [inputValue, setInputValue] = useState("")

    return (
        <Container fluid="xs" className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
        <Row className="d-flex justify-content-center w-50">
            <form >
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
                
        </Container>
    );
};

export default RetreiveResult;



