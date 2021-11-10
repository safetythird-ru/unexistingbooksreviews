import React from 'react';
import { Link } from 'react-router-dom';

export const EditProfileSettings = () => {
  return (
    <>
      <Link to='/settings' className='btn btn-sm btn-outline-secondary action-btn'>
        <i className='ion-gear-a'></i> Edit Profile Settings
      </Link>
    </>
  );
};
