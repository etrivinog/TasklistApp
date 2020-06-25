import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field} from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import moment from 'moment';
import momentLocaliser from "react-widgets-moment";
import { connect } from 'react-redux';
import { setPropsAsInitial } from '../../../helpers/setPropsAsInitial';
import Action from '../../Action';
import { Prompt } from 'react-router-dom';
//CSS for the widgets
import 'react-widgets/dist/css/react-widgets.css'

momentLocaliser(moment)

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

const TaskEdit = ({tasklists, users, handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    
    const renderDropdownList = ({ input, data, valueField, textField }) =>
    <DropdownList {...input}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={input.onChange} />
        
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
     
    //Domain for the dropdown to choose status
    const statuses = [
        {status: "Open", value: 1},
        {status: "In progress", value: 2},
        {status: "Completed", value: 3},
        {status: "Archived", value: 4}
    ];
     
    //Domain for the dropdown to choose done option
    const done = [
        {done: "Yes", value: "Y"},
        {done: "No", value: "N"}
    ];
    
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
                <label>Tasklist</label>
                <Field
                    name="tasklist"
                    component={renderDropdownList}
                    data={transformedTasklists}
                    valueField="value"
                    textField="tasklist"
                    validate={isRequired} ></Field>
                <label>Done</label>
                <Field
                    name="done"
                    component={MyField}
                    component={renderDropdownList}
                    data={done}
                    valueField="value"
                    textField="done"
                    validate={isRequired} ></Field>
                <label>User</label>
                <Field
                    name="user"
                    component={renderDropdownList}
                    data={transformedUsers}
                    valueField="value"
                    textField="user"
                    validate={isRequired} ></Field>
                <label>Status</label>
                <Field
                    name="status"
                    component={renderDropdownList}
                    data={statuses}
                    valueField="value"
                    textField="status"
                    validate={isRequired} ></Field>
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

TaskEdit.propTypes = {
    name: PropTypes.string,
    onBack: PropTypes.func.isRequired,
};

const customerEditForm = reduxForm(
    {
        form: 'TaskEdit'
    })(TaskEdit);

export default setPropsAsInitial(customerEditForm);