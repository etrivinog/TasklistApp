import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
import Action from '../Action';
import { Prompt } from 'react-router-dom';

const isRequired = value => (
    !value && "This field is required"
)

const validate = values => {
    
    //Global validation
    const error = {};
    
    /*
    if(!values.name) {
        error.name = "The field must have a value.";
    }
    */
    return error;
}

const MyField = ({input, meta, type, label, name}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type={ !type ? "text" : type }/>
        {
            meta.touched && meta.error && <span>{meta.error}</span>
        }
    </div>
);

const TasklistEdit = ({ name, handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    return (
        <div>
            <h2>Tasklist edit</h2>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="name"
                    component={MyField}
                    type="text"
                    validate={isRequired} 
                    label="Name"></Field>
                <Action>
                    <button type="button" disabled={submitting} onClick={onBack}>
                        Cancel
                    </button>
                    <button type="submit" disabled={pristine || submitting}>
                        Accept
                    </button>
                </Action>
                <Prompt
                    when={!pristine && !submitSucceeded}
                    message="Changes will be lost!"></Prompt>
            </form>
        </div>
    );
};

TasklistEdit.propTypes = {
    name: PropTypes.string,
    onBack: PropTypes.func.isRequired,
};

const tasklitEditForm = reduxForm(
    {
        form: 'TasklistEdit',
        validate
    })(TasklistEdit);

export default setPropsAsInitial(tasklitEditForm);