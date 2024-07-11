import Form from 'react-bootstrap/Form';

function AddSwitch({ label, onToggle }) {
    return (
      <Form>
        <Form.Check
          type="switch"
          id="switch"
          label={label}
          onToggle={onToggle}
        />
      </Form>
    );
  }
  

export default AddSwitch;