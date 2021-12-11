import textArea from './text-area.module.css';
import Field from '../field';

const TextArea = ({ edited, labelName, name, value, errorText, ...props }) => {
  const hasError = edited && errorText;
  return (
    <Field name={name} labelName={labelName} errorText={errorText} hasError={hasError}>
      <textarea className={`${textArea.textarea} ${hasError && textArea.textarea_error}`} name={name} {...props}>
        {value}
      </textarea>
    </Field>
  );
};

export default TextArea;
