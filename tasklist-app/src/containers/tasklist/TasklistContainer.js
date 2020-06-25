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

class TasklistContainer extends Component {

    componentDidMount() {
        
        if(!this.props.tasklist) {
            this.props.fetchTasklist();
        }


    }
    
    handleOnBack = () => {
        this.props.history.goBack();
    }
    
    //This function receives the values from the submitted form
    handleSubmit = values => {
        console.log(JSON.stringify(values));
        
        //Returns the promise to indicate submitting status and lock the button
        return this.props.updateTasklist(values).then(data => 
            console.log("Success"))
        .catch(err => {
            return err
        });

    }
    
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
        console.log(`VALUE OF TASKLIST: ${JSON.stringify(this.props.tasklist)}`)
        if (this.props.tasklist) {
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

TasklistContainer.propTypes = {

};

const mapStateToProps = (state, props) => ({
    tasklist: getTasklistById(state, props),
})

export default withRouter(connect(mapStateToProps, {
    fetchTasklist,
    updateTasklist,
    deleteTasklist,
})(TasklistContainer));