
import { useEffect } from 'react';
import agent from '../../agent';
import { useDispatch } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../../constants/actionTypes';
import Form from './form';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import TagList from './tag-list';

const Editor = (props) => {
  const dispatch = useDispatch();
  const { articleSlug, body, description, tagInput, tagList, title } = useSelector(store => store.editor);
  const updateFieldEvent = key => ev => dispatch({ type: UPDATE_FIELD_EDITOR, key, value: ev.target.value });
  const changeTitle = updateFieldEvent('title');
  const changeDescription = updateFieldEvent('description');
  const changeBody = updateFieldEvent('body');
  const changeTagInput = updateFieldEvent('tagInput');

  const formik = useFormik({
    initialValues: {
      title: '',
      comment: '',
      description: '',
      tags: ''
    },
    onSubmit: values => {
      console.log(values);
      const article = { title, description, body, tagList };

      const slug = { slug: articleSlug };
      const promise = articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Articles.create(article);
  
      dispatch({ type: ARTICLE_SUBMITTED, payload: promise });
    }
  });

  const watchForEnter = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      dispatch({ type: ADD_TAG });
    }
  };
  
  useEffect(() => {
    dispatch({ type: EDITOR_PAGE_UNLOADED });
    const payload = agent.Articles.get(props.match.params.slug);
    dispatch({ type: EDITOR_PAGE_LOADED, payload });
  }, [props.match.params.slug]);

  useEffect(() => {
    console.debug(props.match.params.slug);
    if (props.match.params.slug) {
      const payload = agent.Articles.get(props.match.params.slug);
      return dispatch({ type: EDITOR_PAGE_LOADED, payload });
    }
    dispatch({ type: EDITOR_PAGE_LOADED, payload: null });
    return () => dispatch({ type: EDITOR_PAGE_UNLOADED })
  }, []);

  return (
      <Form errors={props.errors} onSubmit={formik.handleSubmit}>
        <BiggerFieldInput name="title" value={formik.values.title} placeholder="Article Title" onChange={formik.handleChange}/>
        <FieldInput name="description" value={formik.values.description} placeholder="What's this article about?" onChange={formik.handleChange}/>
        <TextArea name="comment" placeholder="Write your article (in markdown)" onChange={formik.handleChange}>
          {formik.values.comment}
        </TextArea>
        <FieldInput name="tags" value={formik.values.tags} placeholder="Enter tags" onChange={formik.handleChange} onKeyUp={watchForEnter}>
          <TagList tags={tagList}/>
        </FieldInput>
        <Button disabled={props.inProgress}/>
      </Form>
  );
}

const FormFieldSet = ({children}) => (<fieldset className="form-group">{children}</fieldset>)

const TextArea = ({children, placeholder, onChange}) => (
  <FormFieldSet>
    <textarea
      className="form-control"
      rows="8"
      placeholder={placeholder}
      value={children}
      onChange={onChange}>
    </textarea>
  </FormFieldSet>
)

const FieldInput = ({placeholder, name, value, onChange, children, onKeyUp}) => (
  <FormFieldSet>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onKeyUp={onKeyUp}
        onChange={onChange} />
        {children}
  </FormFieldSet>
)

const BiggerFieldInput = ({placeholder, name, value, onChange, children}) => (
  <FormFieldSet>
      <input
        className="form-control form-control-lg"
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
        {children}
  </FormFieldSet>
)

const Button = ({disabled, onClick}) => (
  <button
    className="btn btn-lg pull-xs-right btn-primary"
    type="submit"
    disabled={disabled}
    onClick={onClick}>
    Publish Article
  </button>
)

export default Editor;
