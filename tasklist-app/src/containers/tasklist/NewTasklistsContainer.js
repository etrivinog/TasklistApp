import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppTemplate from '../../components/AppTemplate';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { insertTasklist } from '../../actions/tasklistActions/insertTasklist';
import { SubmissionError } from 'redux-form';
import TasklistEdit from '../../components/tasklist/TasklistEdit';

class NewTasklistsContainer extends Component {
    
    
    handleOnSubmit = tasklist => {
        
        return  this.props.insertTasklist(tasklist).then(data => 
            console.log("tasklist saved"))
        .catch(error => {
            throw new SubmissionError(error);
        });

    }
    
    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }
    renderBody = () => {
        return  <TasklistEdit
                    onBack={this.handleOnBack}
                    onSubmit={this.handleOnSubmit}
                    onSubmitSuccess={this.handleOnSubmitSuccess}
                    ></TasklistEdit>
    }
    
    render() {
        return (
            <div>
                <AppTemplate
                    header="NEW TASKLIST"
                    body={this.renderBody()}
                ></AppTemplate>
            </div>
        );
    }
}

NewTasklistsContainer.propTypes = {
    insertTasklist: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { insertTasklist })(NewTasklistsContainer));