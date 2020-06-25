import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppTemplate from '../../components/AppTemplate';
import TasklistList from '../../components/tasklist/TasklistList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {fetchTasklist } from '../../actions/tasklistActions/fetchTasklist';
import { getTasklists } from '../../selectors/tasklist';

/**
 * This component loads a list of tasklists from the server
 * and map it into the global store
 */
class TasklistsContainer extends Component {

    //Once the component is mounted
    componentDidMount() {
        //If tasklists are not loaded
        if(this.props.tasklists.length === 0){
            //Load taskslists from server
            this.props.fetchTasklist();
        }
    }
    
    handleNewTasklist = () => {
        //Change the url to display the form
        this.props.history.push('tasklist/new');
    }

    //There are two buttons, the first one goes to the main screen
    //and the second one goes to the from to create a user
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

/**
 * Validates props
 */
TasklistsContainer.propTypes = {
    tasklists: PropTypes.array.isRequired,
};


/**
 * Initialize the properties
 */
TasklistsContainer.defaultProps = {
    tasklists: [
    ]
};

/**
 * Get information from the global store and map it into the props
 * of the component.
 * Uses the selector design pattern to abstract the state structure
 */
const mapStateToProps = (state) => ({
    tasklists: getTasklists(state),
});

export default withRouter(connect(mapStateToProps, { fetchTasklist })(TasklistsContainer));