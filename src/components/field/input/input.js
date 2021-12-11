import { excPoint } from '../../../constants/svg-icons';
import input from './input.module.css';
import { useMemo } from 'react';
import Field from '../field';

const Input = ({ disabled, edited, labelName, errorText, icon, onIconClick, name, ...props }) => {
  const hasError = edited && errorText;
  const iconToRender = useMemo(() => {
    const resIcon = icon ? icon : hasError ? excPoint : null;
    return resIcon ? (
      <div
        className={`${input.icon} ${hasError && input.icon_error} ${disabled && input.icon_disabled}`}
        onClick={onIconClick}
        style={onIconClick && { cursor: 'pointer' }}>
        {resIcon}
      </div>
    ) : null;
  }, [icon, onIconClick, errorText]);

  return (
    <Field name={name} labelName={labelName} errorText={errorText} hasError={hasError}>
      <div className={input.wrapper}>
        <input
          className={`${input.input} ${hasError && input.input_error}`}
          name={name}
          style={iconToRender && { paddingRight: '50px' }}
          {...props}
        />
        {iconToRender}
      </div>
    </Field>
  );
};

export default Input;
