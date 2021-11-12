import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from '../../constants/actionTypes';
import ArticleList from '../ArticleList';
import { EditProfileSettings } from './EditProfileSettings';
import { FollowUserButton } from './FollowUserButton';
import { ProfileTabs } from './ProfileTabs';
import agent from '../../agent';

export const ProfileMain = () => {
    const dispatch = useDispatch();
  const { profile, common, articleList } = useSelector(state => state);
  console.log(profile, common, articleList);

  useEffect(() => {

    dispatch({
        type: PROFILE_PAGE_LOADED,
        payload: Promise.all([agent.Profile.get()])
    })
  }, [common]);

  return (
      // все закомментить
    <>
      <div className='profile-page'>
        <div className='user-info'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-10 offset-md-1'>
                <img src={profile.image} className='user-img' alt={profile.username} />
                <h4>{profile.username}</h4>
                {/* <p>{profile.bio}</p> */}
                {profile.username === common.currentUser.username ? <EditProfileSettings /> : <FollowUserButton user={profile} />}
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              <ProfileTabs username={profile.username} />
              <ArticleList
                pager={this.props.pager}
                articles={this.props.articles}
                articlesCount={this.props.articlesCount}
                state={this.props.currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
