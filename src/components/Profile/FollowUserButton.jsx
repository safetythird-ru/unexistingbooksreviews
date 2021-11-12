import React from 'react';
import { useDispatch } from 'react-redux';
import agent from '../../agent';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../constants/actionTypes';

export const FollowUserButton = ({ user }) => {
  const dispatch = useDispatch();
  const handleClick = ev => {
    ev.preventDefault();
    if (user.following) {
      dispatch({
        type: UNFOLLOW_USER,
        payload: agent.Profile.unfollow(user.username)
      });
    } else {
      dispatch({
        type: FOLLOW_USER,
        payload: agent.Profile.follow(user.username)
      });
    }
  };

  return (
    <button className={`btn btn-sm action-btn ${user.following ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={handleClick}>
      <i className='ion-plus-round'></i>
      &nbsp;
      {user.following ? 'Unfollow' : 'Follow'} {user.username}
    </button>
  );
};
