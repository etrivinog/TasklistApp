import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppTemplate from '../../../components/AppTemplate';
import PropTypes from 'prop-types';
import { getTaskById } from '../../../selectors/task';
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

class TaskContainer extends Component {
    
    componentDidMount() {

        if(!this.props.task) {
            this.props.fetchTasks();
        }
        
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
    handleSubmit = values => {
        console.log(JSON.stringify(values));
        
        //Returns the promise to indicate submitting status and lock the button
        return this.props.updateTask(values).then(data => 
            console.log("Se resolvio con exito"))
        .catch(err => {
            throw new SubmissionError(err);
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

TaskContainer.propTypes = {
    taskId: PropTypes.number,
    task: PropTypes.object,
    fetchTasks: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    task: getTaskById(state, props),
    users: getUsers(state),
    tasklists: getTasklists(state),
});

export default withRouter(connect(mapStateToProps, {
    fetchTasks,
    updateTask,
    deleteTask,
    fetchUsers,
    fetchTasklist,
})(TaskContainer));