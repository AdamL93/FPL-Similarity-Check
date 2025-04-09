import ProgressBar from 'react-bootstrap/ProgressBar';

/**
 * AddProgressBar is a React component that renders a Bootstrap progress bar with a colour specified by the progressNumber.
 * 
 * The colour of the progress bar changes according to the progress percentage:
 * - Red (danger) if the progress is 60% or more
 * - Green (success) if the progress is less than 40%
 * - Yellow (warning) otherwise
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {number} props.progressNumber - The current progress percentage (0-100). Determines the width and colour of the progress bar.
 * 
 * @example
 * return (
 *   <AddProgressBar progressNumber={70} />
 * );
 * 
 * @returns {JSX.Element} The rendered ProgressBar component.
 */
function AddProgressBar({ progressNumber }) {
    let barColour = "warning";

    if (progressNumber >= 60) {
        barColour = "danger";
    } else if (progressNumber < 40) {
        barColour = "success";
    }

    return (
        <ProgressBar 
            variant={barColour}
            animated 
            now={progressNumber} 
            label={`${progressNumber}%`} 
            style={{ width: '90%' }}
        />
    );
}

export default AddProgressBar;

