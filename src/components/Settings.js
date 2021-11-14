import { useEffect, useState } from 'react';
import { useSelector,
         useDispatch } from 'react-redux';

import ListErrors from './ListErrors';
import agent from '../agent';

import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';

const SettingsForm = ({ image,
                        username,
                        bio,
                        email,
                        password,
                        inProgress,
                        onSubmitForm }) => {

  const [oState, setOState] = useState({ image: image || '',
                                         username: username || '',
                                         bio: bio || '',
                                         email: email || '',
                                         password: password || '' });
  
  const updateState = field => ev => {
    setOState({ ...oState,
                [field]: ev.target.value });
  };

  const submitForm = ev => {
    ev.preventDefault();

    const oSettings = {...oState};
    if (!oSettings.password) {
      delete oSettings.password;
    }

    onSubmitForm(oSettings);
  };


  return (
    <form onSubmit={submitForm}>
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={oState.image}
            onChange={updateState('image')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={oState.username}
              onChange={updateState('username')} />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={oState.bio}
              onChange={updateState('bio')}>
            </textarea>
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={oState.email}
              onChange={updateState('email')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={oState.password}
              onChange={updateState('password')} />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={inProgress}>
            Update Settings
          </button>

        </fieldset>
      </form>
  );
}

const Settings = () => {
  const dispatch = useDispatch();
  const oCurrentUser =
                 useSelector(store => ({ ...store.common.currentUser,
                                         ...store.settings }));
  const onClickLogout = () => {
    dispatch({ type: LOGOUT });
  };
  
  const onSubmitForm = (oUser) => {
    dispatch({ type: SETTINGS_SAVED,
               payload: agent.Auth.save(oUser) });
  };
  
  const onUnload = () => {
    dispatch({ type: SETTINGS_PAGE_UNLOADED });
  };
  
  useEffect(() => {
    return onUnload;
  }, []);
    
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            
            <ListErrors errors={null} />

            <SettingsForm onSubmitForm={onSubmitForm} {...oCurrentUser} />

            <hr />

            <button className="btn btn-outline-danger" onClick={onClickLogout}>
              Or click here to logout.
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;