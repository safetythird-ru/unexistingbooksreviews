import { excPoint } from '../../../constants/svg-icons';
import input from './input.module.css';
import { useMemo } from 'react';
import Field from '../field';

const Input = ({ labelName, type, placeholder, onChange, name, value, disabled, errorText, icon, onIconClick }) => {
  const iconToRender = useMemo(() => {
    const resIcon = icon ? icon : errorText ? excPoint : null;
    return resIcon ? (
      <div
        className={`${input.icon} ${errorText && input.icon_error} ${disabled && input.icon_disabled}`}
        onClick={onIconClick}
        style={onIconClick && { cursor: 'pointer' }}>
        {resIcon}
      </div>
    ) : null;
  }, [icon, onIconClick]);

  return (
    <Field name={name} labelName={labelName} errorText={errorText}>
      <div className={input.wrapper}>
        <input
          className={`${input.input} ${errorText && input.input_error}`}
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          value={value}
          style={iconToRender && { paddingRight: '50px' }}
        />
        {iconToRender}
      </div>
    </Field>
  );
};

export default Input;
