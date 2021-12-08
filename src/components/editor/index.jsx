
import { useEffect } from 'react';
import agent from '../../agent';
import { useDispatch } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED
} from '../../constants/actionTypes';
import Form from './form';
import { useSelector } from 'react-redux';
import { Field, FormikProvider, useFormik } from 'formik';
import TagList from './tag-list';
import PublishButton from './publish-button';

const Editor = (props) => {
  const dispatch = useDispatch();
  const { articleSlug, tagList } = useSelector(store => store.editor);

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      description: '',
      tags: ''
    },
    onSubmit: ({title, description, body, tagList}) => {
      const article = { title, description, body, tagList };
      const slug = { slug: articleSlug };
      const promise = articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Articles.create(article);
  
      dispatch({ type: ARTICLE_SUBMITTED, payload: promise, article });
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
      <FormikProvider value={formik}>
      <Form errors={props.errors} onSubmit={formik.handleSubmit}>
        <BiggerFieldInput name="title" value={formik.values.title} placeholder="Article Title" onChange={formik.handleChange}/>
        <FieldInput name="description" value={formik.values.description} placeholder="What's this article about?" onChange={formik.handleChange}/>
        <FormFieldSet>
          <Field  className="form-control"
            rows="8"
            value={formik.values.body}
            name="body" component="textarea" placeholder="Write your article (in markdown)"/>
        </FormFieldSet>
        <FieldInput name="tags" value={formik.values.tags} placeholder="Enter tags" onChange={formik.handleChange} onKeyUp={watchForEnter}>
          <TagList tags={tagList}/>
        </FieldInput>
        <PublishButton inProgress={props.inProgress}/>
      </Form>
      </FormikProvider>
  );
}

const FormFieldSet = ({children}) => (<fieldset className="form-group">{children}</fieldset>)

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

export default Editor;
