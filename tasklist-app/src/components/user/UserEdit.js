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

const isNumber = value => (
    isNaN(value) && "The value must be a number."
)

const MyField = ({input, meta, type, label, name}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type={ !type ? "text" : type }/>
        {
            meta.touched && meta.error && <span>{meta.error}</span>
        }
    </div>
);

const toLower = value => value && value.toLowerCase();

const UserEdit = ({handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    return (
        <div>
            <h2>User edit</h2>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="name"
                    component={MyField}
                    type="text"
                    validate={isRequired} 
                    label="Name"></Field>
                <Field
                    name="email"
                    component={MyField}
                    type="text"
                    validate={[isRequired]}
                    label="Email"
                    parse={toLower}
                    format={toLower}></Field>
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

UserEdit.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    onBack: PropTypes.func.isRequired,
};

const userEditForm = reduxForm(
    {
        form: 'UserEdit',
        validate
    })(UserEdit);

export default setPropsAsInitial(userEditForm);