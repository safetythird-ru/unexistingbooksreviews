import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { FOLLOW_USER, UNFOLLOW_USER, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from '../../constants/actionTypes';
import ArticleList from '../ArticleList';
import { EditProfileSettings } from './EditProfileSettings';
import { FollowUserButton } from './FollowUserButton';
import { ProfileTabs } from './ProfileTabs';
import { ProfileMain } from './ProfileMain';

class Profile extends React.Component {
  componentWillMount() {
    console.log(this.props)
    this.props.onLoad(Promise.all([agent.Profile.get(this.props.match.params.username), agent.Articles.byAuthor(this.props.match.params.username)]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser && this.props.profile.username === this.props.currentUser.username;

    return (
      <div className='profile-page'>
        <ProfileMain />
        <div className='user-info'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-10 offset-md-1'>
                <img src={profile.image} className='user-img' alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                {isUser ? <EditProfileSettings /> : <FollowUserButton user={profile} follow={this.props.onFollow} unfollow={this.props.onUnfollow} />}
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
    );
  }
}

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username =>
    dispatch({
      type: FOLLOW_USER,
      payload: agent.Profile.follow(username)
    }),
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: username =>
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username)
    }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile };
