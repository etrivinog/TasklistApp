import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppTemplate from '../../components/AppTemplate';
import UserEdit from '../../components/user/UserEdit';
import UserData from '../../components/user/UserData';
import PropTypes from 'prop-types';
import { getUserById } from '../../selectors/user';
import { Route, withRouter } from 'react-router-dom';
import { fetchUsers } from '../../actions/userActions/fetchUsers';
import { updateUser } from '../../actions/userActions/updateUser';
import { SubmissionError } from 'redux-form';
import { deleteUser } from '../../actions/userActions/deleteUser';

class UserContainer extends Component {
    
    componentDidMount() {

        if(!this.props.user) {
            this.props.fetchUsers(); 
        }

    }
    
    handleOnBack = () => {
        this.props.history.goBack();
    }
    
    //This function receives the values from the submitted form
    handleSubmit = values => {
        console.log(JSON.stringify(values));
        
        //Returns the promise to indicate submitting status and lock the button
        return this.props.updateUser(values).then(data => 
            console.log("Success"))
        .catch(err => {
            throw new SubmissionError(err);
        });

    }
    
    handleOnDelete = (id) => {
        this.props.deleteUser(id).then(v => {
            this.props.history.goBack();
        });
    }

    //When the request is done, goes back
    onSubmitSuccess = () => {
        this.props.history.goBack();
    }

    renderUserControl = (isEdit, isDelete) => {
        if (this.props.user) {
            const UserControl = isEdit ?  UserEdit : UserData;
            return <UserControl {...this.props.user} 
                                        onSubmit={this.handleSubmit}
                                        onSubmitSuccess={this.onSubmitSuccess}
                                        onBack={this.handleOnBack}
                                        isDeleteAllowed={!!isDelete}
                                        onDelete={this.handleOnDelete} />;
        }
        
        return "Loading..."; 
        
    }
    renderBody = () => (
        <Route path="/user/:userId/edit" children={
            ( { match: isEdit } ) => (
                <Route path="/user/:userId/del" children={
                    ( {match: isDelete} ) => (
                        this.renderUserControl(isEdit, isDelete) )
                } />
            )
        }/>
    )
    //<p>Datos del cliente {this.props.user.name}</p>
    render() {
        return (
            <div>
                <AppTemplate    header={`User ${this.props.userId}`}
                                body={ this.renderBody() }>
                    
                </AppTemplate>
            </div>
        );
    }
}

UserContainer.propTypes = {
    userId: PropTypes.number.isRequired,
    user: PropTypes.object,
    fetchUsers: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    user: getUserById(state, props),
});

export default withRouter(connect(mapStateToProps, {
    fetchUsers,
    updateUser,
    deleteUser,
})(UserContainer));