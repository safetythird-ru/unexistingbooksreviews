import buttonBase from './button-base.module.css';

const ButtonBase = ({ mixStyle, children, ...params }) => {
  return (
    <button className={`${buttonBase.main} ${mixStyle}`} {...params}>
      {children}
    </button>
  );
};

export default ButtonBase;
