import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppTemplate from '../../components/AppTemplate';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { insertTasklist } from '../../actions/tasklistActions/insertTasklist';
import { SubmissionError } from 'redux-form';
import TasklistEdit from '../../components/tasklist/TasklistEdit';

/**
 * This container is shown when the user has indicated to create a unew tasklist
 */
class NewTasklistsContainer extends Component {
    
    //When the form is submitted
    handleOnSubmit = tasklist => {
        
        return  this.props.insertTasklist(tasklist).then(data => 
            console.log("tasklist saved"))
        .catch(error => {
            throw new SubmissionError(error);
        });

    }
    
    //When the submitting process ends rigth
    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    //When the user select "BACK" in the form
    handleOnBack = () => {
        //goes back in navigation history
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


//Validates properties
NewTasklistsContainer.propTypes = {
    insertTasklist: PropTypes.func.isRequired,
};

//Connect the component to the global store and map the indicated funcions into the properties
//Also uses withRouter to acces the vavigation.
export default withRouter(connect(null, { insertTasklist })(NewTasklistsContainer));