import field from './field.module.css'

const Field = ({children, name, labelName, errorText}) => {
    return (
        <div className={field.container}>
        <label className={field.label} htmlFor={name}>
          {labelName}
        </label>
            {children}
        <span className={field.error_message}>{errorText}</span>
      </div>
    )
}

export default Field