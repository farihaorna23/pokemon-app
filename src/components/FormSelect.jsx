import "./FormSelect.css";
import Form from "react-bootstrap/Form";
const FormSelect = props => {
  return (
    <div className="row">
      <Form.Select
        aria-label="Default select example"
        className="text-center"
        style={{ width: "25rem" }}
        onChange={e => props.typeHandler(e.target.value)}
      >
        <option>Type</option>
        {props.getType.map(type => {
          return <option key={type}>{type}</option>;
        })}
      </Form.Select>
      <Form.Select
        aria-label="Default select example"
        className="text-center"
        style={{ width: "25rem" }}
        onChange={e => props.weaknessHandler(e.target.value)}
      >
        <option>Weaknesses</option>
        {props.getWeaknesses.map(weakness => {
          return <option key={weakness}>{weakness}</option>;
        })}
      </Form.Select>
    </div>
  );
};

export default FormSelect;
