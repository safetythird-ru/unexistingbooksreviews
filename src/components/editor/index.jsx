
import React, { useEffect } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../../constants/actionTypes';
import Form from './form';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: _ =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

const Editor = (props) => {
  const updateFieldEvent =
    key => ev => props.onUpdateField(key, ev.target.value);
  const changeTitle = updateFieldEvent('title');
  const changeDescription = updateFieldEvent('description');
  const changeBody = updateFieldEvent('body');
  const changeTagInput = updateFieldEvent('tagInput');

  const watchForEnter = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      props.onAddTag();
    }
  };

  const removeTagHandler = tag => () => {
    props.onRemoveTag(tag);
  };

  const submitForm = ev => {
    ev.preventDefault();
    const article = {
      title: props.title,
      description: props.description,
      body: props.body,
      tagList: props.tagList
    };

    const slug = { slug: props.articleSlug };
    const promise = props.articleSlug ?
      agent.Articles.update(Object.assign(article, slug)) :
      agent.Articles.create(article);

    props.onSubmit(promise);
  };
  
  useEffect(() => {
    props.onUnload();
    props.onLoad(agent.Articles.get(props.match.params.slug));
  }, [props.match.params.slug]);

  useEffect(() => {
    console.debug(props.match.params.slug);
    if (props.match.params.slug) {
      return props.onLoad(agent.Articles.get(props.match.params.slug));
    }
    props.onLoad(null);
    return () => props.onUnload();
  }, []);

  return (
      <Form errors={props.errors}>
        <BiggerFieldInput value={props.title} placeholder="Article Title" onChange={changeTitle}/>
        <FieldInput value={props.description} placeholder="What's this article about?" onChange={changeDescription}/>
        <TextArea placeholder="Write your article (in markdown)" onChange={changeBody}>
          {props.body}
        </TextArea>
        <FieldInput value={props.tagInput} placeholder="Enter tags" onChange={changeTagInput} onKeyUp={watchForEnter}>
          <TagList tagList={props.tagList} removeTagHandler={removeTagHandler}/>
        </FieldInput>
        <Button disabled={props.inProgress} onClick={submitForm}/>
      </Form>
  );
}

const TextArea = ({children, placeholder, onChange}) => (
  <fieldset className="form-group">
    <textarea
      className="form-control"
      rows="8"
      placeholder={placeholder}
      value={children}
      onChange={onChange}>
    </textarea>
  </fieldset>
)

const TagList = ({tagList, removeTagHandler}) => (
  <div className="tag-list">
    {(tagList || []).map(tag => <Tag removeTagHandler={removeTagHandler}>{tag}</Tag>)}
  </div>
)

const Tag = ({children, removeTagHandler}) => (
  <span className="tag-default tag-pill" key={children}>
    <i className="ion-close-round" onClick={removeTagHandler(children)}/>
    {children}
  </span>
)

const FieldInput = ({placeholder, value, onChange, children, onKeyUp}) => (
  <fieldset className="form-group">
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        value={value}
        onKeyUp={onKeyUp}
        onChange={onChange} />
        {children}
  </fieldset>
)

const BiggerFieldInput = ({placeholder, value, onChange, children}) => (
  <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
        {children}
  </fieldset>
)

const Button = ({disabled, onClick}) => (
  <button
    className="btn btn-lg pull-xs-right btn-primary"
    type="button"
    disabled={disabled}
    onClick={onClick}>
    Publish Article
  </button>
)

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
