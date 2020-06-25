import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppTemplate from '../../components/AppTemplate';
import UserEdit from '../../components/user/UserEdit';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { insertUser } from '../../actions/userActions/insertUser';
import { SubmissionError } from 'redux-form';

class NewUserContainer extends Component {
    
    handleOnSubmit = user => {
        
        return  this.props.insertUser(user).then(data => 
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
        return <UserEdit
                    onSubmit={this.handleOnSubmit}
                    onSubmitSuccess={this.handleOnSubmitSucess}
                    onBack={this.handleOnBack}>

                </UserEdit>
    }

    render() {
        return (
            <div>
                <AppTemplate
                    header="New User"
                    body={this.renderBody()}>
                </AppTemplate>
            </div>
        );
    }
}

NewUserContainer.propTypes = {
    insertUser: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { insertUser })(NewUserContainer));