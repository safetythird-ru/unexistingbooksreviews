import buttonBase from './button-base.module.css';
import PropTypes from 'prop-types'

const ButtonBase = ({ mixStyle, children, ...params }) => {
  return (
    <button className={`${buttonBase.main} ${mixStyle}`} {...params}>
      {children}
    </button>
  );
};

ButtonBase.propTypes = {
  children: PropTypes.element.isRequired,
  mixStyle: PropTypes.string,
  params: PropTypes.object
}

export default ButtonBase;
