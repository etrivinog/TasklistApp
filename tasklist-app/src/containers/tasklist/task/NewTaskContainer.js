import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppTemplate from '../../../components/AppTemplate';
import TaskEdit from '../../../components/tasklist/task/TaskEdit';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { insertTask } from '../../../actions/taskActions/insertTask';
import { SubmissionError } from 'redux-form';
import { fetchUsers } from '../../../actions/userActions/fetchUsers';
import { fetchTasklist } from '../../../actions/tasklistActions/fetchTasklist';
import { getUsers } from '../../../selectors/user';
import { getTasklists } from '../../../selectors/tasklist';

class NewTaskContainer extends Component {
    
    componentDidMount() {
        
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
    

    handleOnSubmit = task => {
        
        return  this.props.insertTask(task).then(data => 
            console.log("Success"))
        .catch(error => {
            throw new SubmissionError (error);
        });
    }
    
    handleOnSubmitSucess = () => {
        this.props.history.goBack();
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    renderBody = () => {
        return <TaskEdit
                    tasklists={this.props.tasklists}
                    users={this.props.users}
                    onSubmit={this.handleOnSubmit}
                    onSubmitSuccess={this.handleOnSubmitSucess}
                    onBack={this.handleOnBack}>

                </TaskEdit>
    }

    render() {
        return (
            <div>
                <AppTemplate
                    header="New Task"
                    body={this.renderBody()}>
                </AppTemplate>
            </div>
        );
    }
}

NewTaskContainer.propTypes = {
    insertTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    users: getUsers(state),
    tasklists: getTasklists(state),
});

export default withRouter(connect(mapStateToProps, { 
    insertTask,
    fetchUsers,
    fetchTasklist,
})(NewTaskContainer));