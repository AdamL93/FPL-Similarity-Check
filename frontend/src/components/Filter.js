import Form from 'react-bootstrap/Form';

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