import Form from 'react-bootstrap/Form';

/**
 * AddSwitch is a React component that renders a Bootstrap switch (toggle) with a label.
 * The switch can be used to toggle an on/off state, and it allows for a change handler to be provided.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label to be displayed next to the switch.
 * @param {function} props.onChange - The callback function to be called when the switch value changes.
 * 
 * @example
 * return (
 * <AddSwitch label="label text" onChange={functionToCall} />
 * )
 * 
 * @returns {JSX.Element} The rendered Form component with a switch.
 */
function AddSwitch({ label, onChange }) {
    return (
      <Form>
        <Form.Check
          type="switch"
          id="switch"
          label={label}
          onChange={onChange}
        />
      </Form>
    );
}

export default AddSwitch;
