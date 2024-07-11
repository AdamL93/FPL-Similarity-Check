import ProgressBar from 'react-bootstrap/ProgressBar';


function AddProgressBar(progressNumber) {
    let chartColour = "warning";

    if (progressNumber >= 60) {
        chartColour = "danger"
    } else if (progressNumber < 40) {
        chartColour = "success"
   
    }

    return <ProgressBar 
        variant={chartColour}
        animated now={progressNumber} 
        label={`${progressNumber}%`} 
        style={{ width: '90%'  }}
    
    />;
  }

  export default AddProgressBar;
