const FormControl = ({ label, htmlFor, required, children, error }) => (
  <div className="FormControl">
    <label htmlFor={htmlFor}>
      {label}
      {required && <span className="required">*</span>}
    </label>
    {children}
    {error && <div className="error">{error}</div>}
  </div>
);

export default FormControl;
