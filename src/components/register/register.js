import { Link } from 'react-router-dom';
import ListErrors from '../ListErrors';
import React, { useEffect, useState } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { REGISTER, REGISTER_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (data) => {
    const payload = agent.Auth.register(data);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED })
});

const Register = ({ onUnload, onSubmit, errors, inProgress }) => {
  const [data, setInputs] = useState({})

  const onChange = (name, value) => setInputs({...data, [name]: value })

  const submitForm = () => ev => {
    ev.preventDefault();
    onSubmit(data);
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

            <form onSubmit={submitForm(data)}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={data.username || ''}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={data.email || ''}
                    onChange={handleInputChange}
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={data.password || ''}
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
