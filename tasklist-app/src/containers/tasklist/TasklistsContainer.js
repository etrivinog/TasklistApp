import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppTemplate from '../../components/AppTemplate';
import TasklistList from '../../components/tasklist/TasklistList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {fetchTasklist } from '../../actions/tasklistActions/fetchTasklist';
import { getTasklists } from '../../selectors/tasklist';

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

TasklistsContainer.propTypes = {
    tasklists: PropTypes.array.isRequired,
};


//Initialize the properties
TasklistsContainer.defaultProps = {
    tasklists: [
    ]
};

//Takes the imformation from state and put a copy of then into the properties
const mapStateToProps = (state) => ({
    tasklists: getTasklists(state),
});

export default withRouter(connect(mapStateToProps, { fetchTasklist })(TasklistsContainer));