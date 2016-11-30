import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { error } }) => (
  <div>
    <label htmlFor={ input.name }>
      { label }
    </label>
    <div>
      <input {...input} placeholder={ label } type={ type }/>
      <br/>
      <span>{ error }</span>
    </div>
  </div>
);

class ProjectCreationForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  render() {
    const { handleSubmit, onSubmit, error, submitting } = this.props;

    return (
      <form onSubmit={ handleSubmit(onSubmit) }>
        <Field name="name" label="프로젝트 명" type="text" component={ renderField }/>
        <Field name="description" label="프로젝트 설명" type="text" component={ renderField }/>
        <br/>
        { error && <strong>{ error }</strong> }
        <button type="submit" disabled={ submitting }>생성</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'submitValidation'
})(ProjectCreationForm);
