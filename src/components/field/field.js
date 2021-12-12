import field from './field.module.css';

const Field = ({ hasError, children, name, labelName, errorText }) => {
  return (
    <div className={field.container}>
      <label className={field.label} htmlFor={name}>
        {labelName}
      </label>
      {children}
      {hasError && <span className={field.error_message}>{errorText}</span>}
    </div>
  );
};

export default Field;
