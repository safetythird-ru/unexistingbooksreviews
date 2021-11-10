import React from 'react';
import { Link } from 'react-router-dom';

export const ProfileTabs = ({ username }) => {
  return (
    <div className='articles-toggle'>
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <Link className='nav-link active' to={`/@${username}`}>
            My Articles
          </Link>
        </li>

        <li className='nav-item'>
          <Link className='nav-link' to={`/@${username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    </div>
  );
};
