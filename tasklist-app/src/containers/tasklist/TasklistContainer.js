import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppTemplate from '../../components/AppTemplate';
import { Route, withRouter } from 'react-router-dom';
import TasklistEdit from '../../components/tasklist/TasklistEdit';
import TasklistData from '../../components/tasklist/TasklistData';
import { connect } from 'react-redux';
import { getTasklistById, getTasks } from '../../selectors/tasklist';

import { fetchTasklist } from '../../actions/tasklistActions/fetchTasklist';
import { deleteTasklist } from '../../actions/tasklistActions/deleteTasklist';
import { updateTasklist } from '../../actions/tasklistActions/updateTasklist';
import { fetchTasks } from '../../actions/taskActions/fetchTasks';
import { SubmissionError } from 'redux-form';
import TasksContainer from './task/TasksContainer';

/**
 * This component is shown to display the information of a especific
 * tasklist selected by the user in <TasklistsContainer>
 */
class TasklistContainer extends Component {


    //If the prop tasklist is empty, loads the taskslist from the server
    componentDidMount() {
        
        if(!this.props.tasklist) {
            //Loads tasklists from server
            this.props.fetchTasklist();
        }


    }
    
    //When user choose back in the child component
    handleOnBack = () => {
        this.props.history.goBack();
    }
    
    //This function receives the values from the submitted form
    handleSubmit = values => {
        
        console.log(JSON.stringify(values));

        //Send the tasklist to the server to update it
        //Returns the promise to indicate submitting status and lock the button
        return this.props.updateTasklist(values).then(data => 
            console.log("Success!"))
        .catch(err => {
            return err
        });

    }
    
    /**
     * This function is executed when the user press the "Delete" button to
     * delete the tasklist.
     */
    handleOnDelete = (id) => {
        this.props.deleteTasklist(id).then(v => {
            this.props.history.goBack();
        });
    }

    //When the request is done, goes back
    onSubmitSuccess = () => {
        this.props.history.goBack();
    }

    renderCustomerControl = (isEdit, isDelete) => {
        //If the array of tasklists is not empty, render a component
        if (this.props.tasklist) {
            /*
              If the user has choosen the edit option, renderizes edit, else render the component
              to show the data without a form
              Passes the function as properties to be called in the buttons with onClick
              Also render <TasksContainer> to show the tasks of the selected tasklist
            */
            const TasklistControl = isEdit ?  TasklistEdit : TasklistData;
            return <div><TasklistControl {...this.props.tasklist} 
                                        onSubmit={this.handleSubmit}
                                        onSubmitSuccess={this.onSubmitSuccess}
                                        onBack={this.handleOnBack}
                                        isDeleteAllowed={!!isDelete}
                                        tasks={this.props.tasks}
                                        onDelete={this.handleOnDelete} />
                        
                        <TasksContainer
                            tasklistId={this.props.tasklistId}
                            isVisible={!isDelete}
                        ></TasksContainer>
                    </div>;
        }
        
        return "Loading..."; 
        
    }

    //Evaluates the url and indicates the component to display
    renderBody = () => (
        <div>
            <Route path="/tasklist/:tasklistId/edit" children={
                ( { match: isEdit } ) => (
                    <Route path="/tasklist/:tasklistId/del" children={
                        ( {match: isDelete} ) => (
                            this.renderCustomerControl(isEdit, isDelete) )
                    } />
                )
            }/>
        </div>

    )
    
    render() {
        return (
            <div>
                <AppTemplate    header={`Tasklist ${this.props.tasklistId}`}
                                body={ this.renderBody() }>
                    
                </AppTemplate>
            </div> 
        );
    }
}

/**
 * Validates properties
 */
TasklistContainer.propTypes = {
    tasklist: PropTypes.array,
};

/**
 * Gets information from the global store and map it into the props
 * of the component. Uses the selector design pattern to abstract the state structure
 */
const mapStateToProps = (state, props) => ({
    tasklist: getTasklistById(state, props),
})

/**
 * Connect the component to the global store and map the indicated
 * funcions into the properties. Also uses withRouter to acces the
 * vavigation and maps fetch, update and delete functions to props
 */
export default withRouter(connect(mapStateToProps, {
    fetchTasklist,
    updateTasklist,
    deleteTasklist,
})(TasklistContainer));