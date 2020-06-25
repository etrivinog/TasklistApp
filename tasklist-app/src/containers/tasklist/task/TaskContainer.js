import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppTemplate from '../../../components/AppTemplate';
import PropTypes from 'prop-types';
import { getTaskById, getTaskFromFormResult } from '../../../selectors/task';
import { Route, withRouter } from 'react-router-dom';
import { fetchTasks } from '../../../actions/taskActions/fetchTasks';
import { fetchTasklist } from '../../../actions/tasklistActions/fetchTasklist';
import { fetchUsers } from '../../../actions/userActions/fetchUsers';
import { updateTask } from '../../../actions/taskActions/updateTask';
import { SubmissionError } from 'redux-form';
import { deleteTask } from '../../../actions/taskActions/deleteTask';
import TaskEdit from '../../../components/tasklist/task/TaskEdit';
import TaskData from '../../../components/tasklist/task/TaskData';
import { getUsers } from '../../../selectors/user';
import { getTasklists } from '../../../selectors/tasklist';

/**
 * This component is shown to display the information of a especific
 * task selected by the user in <TasksContainer>
 */
class TaskContainer extends Component {
    
    componentDidMount() {

        if(!this.props.task) {
            this.props.fetchTasks();
        }
        
        /* Loads the tasklists and users to create a dropdown menu in the creation/edit from*/
        //If tasklists are not loaded
        if(this.props.tasklists.length === 0){
            //Load taskslists from server
            this.props.fetchTasklist();
        }
        
        //If users are not loaded
        if (this.props.users.length === 0) {
            //Load users from server
            this.props.fetchUsers();
        }
    }
    
    handleOnBack = () => {
        this.props.history.goBack();
    }
    
    //This function receives the values from the submitted form
    handleSubmit = task => {
        
        console.log(`JSON form: ${JSON.stringify(task)}`)
        
        //Receives the form data and transforms it into a task
        const taskToSave = getTaskFromFormResult(task);
        
        console.log(`JSON taskToSave: ${JSON.stringify(taskToSave)}`)
        
        //Returns the promise to indicate submitting status and lock the button
        return this.props.updateTask(taskToSave).then(data => 
            console.log("update ok"))
        .catch(err => {
            console.log(JSON.stringify(err));
        });

    }
    
    handleOnDelete = (id) => {
        this.props.deleteTask(id).then(v => {
            this.props.history.goBack();
        });
    }

    //When the request is done, goes back
    onSubmitSuccess = () => {
        this.props.history.goBack();
    }

    renderCustomerControl = (isEdit, isDelete) => {
        if (this.props.task) {
            const TaskControl = isEdit ?  TaskEdit : TaskData;

            //Renders the component and sends properties
            return <TaskControl {...this.props.task} 
                                        tasklists={this.props.tasklists}
                                        users={this.props.users}
                                        onSubmit={this.handleSubmit}
                                        onSubmitSuccess={this.onSubmitSuccess}
                                        onBack={this.handleOnBack}
                                        isDeleteAllowed={!!isDelete}
                                        onDelete={this.handleOnDelete} />;
        }
        
        return "Loading..."; 
        
    }
    renderBody = () => (
        <Route path="/task/:taskId/edit" children={
            ( { match: isEdit } ) => (
                <Route path="/task/:taskId/del" children={
                    ( {match: isDelete} ) => (
                        this.renderCustomerControl(isEdit, isDelete) )
                } />
            )
        }/>
    )

    render() {
        return (
            <div>
                <AppTemplate   header={`Task ${this.props.taskId}`}
                            body={ this.renderBody() }>
                    
                </AppTemplate>
            </div>
        );
    }
}

/**
 * Validates props
 */
TaskContainer.propTypes = {
    taskId: PropTypes.number,
    task: PropTypes.object,
    fetchTasks: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

/**Gets information from the global store and map it into the props
 * of the component.
 * Uses the "selector" design pattern to abstract the state structure
 */
const mapStateToProps = (state, props) => ({
    task: getTaskById(state, props),
    users: getUsers(state),
    tasklists: getTasklists(state),
});

/**
 * Connect the component to the global store and map the indicated funcions into the properties
 * Also uses withRouter to acces the vavigation and maps fetch, update and delete functions to props
 */
export default withRouter(connect(mapStateToProps, {
    fetchTasks,
    updateTask,
    deleteTask,
    fetchUsers,
    fetchTasklist,
})(TaskContainer));