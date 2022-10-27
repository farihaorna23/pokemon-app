import "./FormSelect.css";
import Form from "react-bootstrap/Form";
const FormSelect = props => {
  return (
    <div className="row">
      <Form.Select
        aria-label="Default select example"
        className="text-center"
        style={{ width: "25rem" }}
      >
        <option>Type</option>
        {props.type.map(type => {
          return <option value={type}>{type}</option>;
        })}
      </Form.Select>
      <Form.Select
        aria-label="Default select example"
        className="text-center"
        style={{ width: "25rem" }}
      >
        <option>Weakness</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </div>
  );
};

export default FormSelect;
