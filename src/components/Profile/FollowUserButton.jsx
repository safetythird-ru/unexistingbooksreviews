import React from 'react';

export const FollowUserButton = props => {
  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username);
    } else {
      props.follow(props.user.username);
    }
  };

  return (
    <button className={`btn btn-sm action-btn ${props.user.following ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={handleClick}>
      <i className='ion-plus-round'></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};
