import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppTemplate from '../../components/AppTemplate';
import TasklistList from '../../components/tasklist/TasklistList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {fetchTasklist } from '../../actions/tasklistActions/fetchTasklist';
import { getTasklists } from '../../selectors/tasklist';

class TasklistsContainer extends Component {

    componentDidMount() {
        //If tasklists are not loaded
        if(this.props.tasklists.length === 0){
            //Load taskslists from server
            this.props.fetchTasklist();
        }
    }
    
    handleNewTasklist = () => {
        this.props.history.push('tasklist/new');
    }

    handleNewTask = (tasklistId) => {
        console.log("handleNewTask");
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    renderBody = (tasklists) => (
        <div>
            <TasklistList 
                tasklists={tasklists}
                urlPath="tasklist/"
            ></TasklistList>
            <button onClick={() => this.props.history.push("/")}>MAIN</button>
            <button onClick={this.handleNewTasklist}>ADD TASKLIST</button>
        </div>
    )
    
    render() {
        return (
            <div>
                <AppTemplate
                    header="Tasklists"
                    body={this.renderBody(this.props.tasklists)}
                    ></AppTemplate>
            </div>
        );
    }
}

TasklistsContainer.propTypes = {
    tasklists: PropTypes.array.isRequired,
};

TasklistsContainer.defaultProps = {
    tasklists: [
    ]
};

const mapStateToProps = (state) => ({
    tasklists: getTasklists(state),
});

export default withRouter(connect(mapStateToProps, { fetchTasklist })(TasklistsContainer));