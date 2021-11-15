import React, { useState } from 'react';
import agent from '../../agent';
import { useDispatch } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';
import { on } from 'superagent';

const CommentInput = (props) => {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  const onChange = (ev) => {
    setBody(ev.target.value);
  }

  const onSubmit = (payload) => {
    dispatch({
      type: ADD_COMMENT,
      payload
    })
  }

  const createComment = (ev) => {
    ev.preventDefault();
    console.log(props.slug, { body: body })
    const payload = agent.Comments.create(props.slug,
      { body: body });
    onSubmit(payload);
    setBody('')
  }

  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={onChange}
          rows="3">
        </textarea>
      </div>
      <div className="card-footer">
        <img
          src={props.currentUser.image}
          className="comment-author-img"
          alt={props.currentUser.username} />
        <button
          className="btn btn-sm btn-primary"
          type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default CommentInput;
