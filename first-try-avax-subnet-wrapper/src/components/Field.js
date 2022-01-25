import "./Field.css";

function Field(props) {
  return (
    <label className="Field">
      {props.label}
      <input type={props.type} placeholder={props.placeholder} />
    </label>
  );
}

export default Field;
