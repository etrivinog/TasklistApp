import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field} from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import { connect } from 'react-redux';
import { setPropsAsInitial } from '../../../helpers/setPropsAsInitial';
import Action from '../../Action';
import { Prompt } from 'react-router-dom';
//CSS for the widgets
import 'react-widgets/dist/css/react-widgets.css'

const isRequired = value => (
    !value && "This field is required"
)

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

const isNoY = value => {
    if(value != "N" && value != "Y"){
        return "The value must be N or Y "+value;
    }
}

const isRequiredFormat = value => {
    if( isNaN(value) || (value != 1 && value != 2 && value != 3 && value != 4)){
        return "The value must be in (1, 2, 3, 4)";
    }
}

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previousValue, values) => (
    value && ( !previousValue ? value : (value > previousValue ? value : previousValue))
);

const CustomerEdit = ({tasklists, users, handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    
    //Make a list of values with the tasklists (not used)
    const transformedTasklists = tasklists.reduce( (acc, tasklist) => {
        const value = ({
            tasklist: tasklist.name,
            value: tasklist.tasklistId,
        });
        return [...acc, value]
      },[] );
     
    //Make a list of values with the users (not used)
    const transformedUsers = users.reduce( (acc, user) => {
        const value = ({
            user: user.name,
            value: user.userId,
        });
        return [...acc, value]
      },[] );
      
    console.log(`Transformedtasklists: ${JSON.stringify(transformedTasklists)}`);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="description"
                    component={MyField}
                    type="text"
                    validate={isRequired} 
                    label="Description"></Field>
                <Field
                    name="tasklist"
                    component={MyField}
                    validate={isRequired} 
                    type="text"
                    label="Tasklist"></Field>
                <Field
                    name="done"
                    component={MyField}
                    type="text"
                    validate={isNoY}
                    label="Done"></Field>
                <Field
                    name="user"
                    component={MyField}
                    type="text"
                    label="User"></Field>
                <Field
                    name="status"
                    component={MyField}
                    type="text"
                    validate={isRequiredFormat}
                    label="Status (1 - Open, 2 - In Progress, 3 - Completed, 4 - Archived"></Field>
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

CustomerEdit.propTypes = {
    name: PropTypes.string,
    onBack: PropTypes.func.isRequired,
};

const customerEditForm = reduxForm(
    {
        form: 'CustomerEdit'
    })(CustomerEdit);

export default setPropsAsInitial(customerEditForm);