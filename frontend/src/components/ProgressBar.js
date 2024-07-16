import ProgressBar from 'react-bootstrap/ProgressBar';


function AddProgressBar({ progressNumber }) {
    let barColour = "warning";

    if (progressNumber >= 60) {
        barColour = "danger"
    } else if (progressNumber < 40) {
        barColour = "success"
   
    }

    return <ProgressBar 
        variant={barColour}
        animated now={progressNumber} 
        label={`${progressNumber}%`} 
        style={{ width: '90%'  }}
    
    />;
  }

  export default AddProgressBar;
