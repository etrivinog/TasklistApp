import React, { Component } from 'react';
import AppTemplate from '../../../components/AppTemplate';
import TaskList from '../../../components/tasklist/task/TaskList';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Import the selector
import { getTasks, getTasklists } from '../../../selectors/tasklist';

//Import the fetchTasks action
import { fetchTasks } from '../../../actions/taskActions/fetchTasks';
import { fetchTasklist } from '../../../actions/tasklistActions/fetchTasklist';
import { fetchUsers } from '../../../actions/userActions/fetchUsers';
import Action from '../../../components/Action';

import { getUsers } from '../../../selectors/user';

/**
 * This component loads a list of tasks from the server
 * and map it into the global store.
 * Also display the tasks of the tasklist indicated as parameter
 */
class TasksContainer extends Component {

    componentDidMount() {
        
        //If tasks are not loaded
        if (this.props.tasks.length === 0) {
            //Load tasks from server
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
    
    
    handleAddNew = () => {
        this.props.history.push("/task/new");
    }
    renderBody = (tasks) => {
        
        //If it is meant to be visible
        if(this.props.isVisible){

        //Filter tasks by the selected tasklistId
        const filteredTasks = tasks.filter(t => t.tasklist == this.props.tasklistId );
        
        return  <div>
                    <TaskList
                        tasks={filteredTasks}
                        tasklists={this.props.tasklists}
                        users={this.props.users}
                        urlPath="task/">
                    </TaskList>
                    <Action>
                        <button onClick={this.handleAddNew}>New Task</button>
                    </Action>
                </div>
        }
        
        return <div></div>

    };

    render() {
        return (
            <div>
                <AppTemplate
                    header="Tasks"
                    body={this.renderBody(this.props.tasks)}>
                </AppTemplate>
            </div>
        );
    }
}

/**
 * Validates props
 */
TasksContainer.propTypes = {
    fetchTasks: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
};

/**
 * Set default values to props
 */
TasksContainer.defaultProps = {
    tasks: [
    ]
};

/**
 * Get information from the global store and map it into the props
 * of the component.
 * Uses the selector design pattern to abstract the state structure
 */
 const mapStateToProps = state => ({
    tasks: getTasks(state),
    users: getUsers(state),
    tasklists: getTasklists(state),
});

/**
 * Connects the component with the global store of the application and
 * with react-router-dom for the navegation
 */
export default withRouter(connect(mapStateToProps, {fetchTasks,
                                                    fetchUsers,
                                                    fetchTasklist
                                                })(TasksContainer));