import { Link } from 'react-router-dom';
import ListErrors from '../ListErrors';
import React, { useEffect } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { UPDATE_FIELD_AUTH, REGISTER, REGISTER_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChange: (name, value) => dispatch({ type: UPDATE_FIELD_AUTH, key: name, value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED })
});

const Register = ({ onUnload, onChange, onSubmit, username, email, password, errors, inProgress }) => {
  const submitForm = (username, email, password) => ev => {
    ev.preventDefault();
    onSubmit(username, email, password);
  };

  useEffect(() => {
    return () => onUnload();
  }, []);

  const handleInputChange = ev => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; // На вырост. Вдруг появится чекбокс?
    const name = target.name;
    onChange(name, value);
  };

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign Up</h1>
            <p className='text-xs-center'>
              <Link to='/login'>Have an account?</Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={submitForm(username, email, password)}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={username || ''}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={email || ''}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password || ''}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <button className='btn btn-lg btn-primary pull-xs-right' type='submit' disabled={inProgress}>
                  Sign up
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
