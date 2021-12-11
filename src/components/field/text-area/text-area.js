import textArea from './text-area.module.css';
import Field from '../field';

const TextArea = ({ labelName, type, placeholder, onChange, name, value, disabled, errorText }) => {

  return (
    <Field name={name} labelName={labelName} errorText={errorText}>
        <textarea
          className={`${textArea.textarea} ${errorText && textArea.textarea_error}`}
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          value={value}
        />
    </Field>
  );
};

export default TextArea;
