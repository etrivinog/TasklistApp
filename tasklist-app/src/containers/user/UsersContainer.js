import React, { Component } from 'react';
import AppTemplate from '../../components/AppTemplate';
import UserList from '../../components/user/UserList';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Import the selector
import { getUsers } from '../../selectors/user';

//Import the fetchCustomers action
import { fetchUsers } from '../../actions/userActions/fetchUsers';
import Action from '../../components/Action';

class UsersContainer extends Component {

    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.fetchUsers();
        }
    }
    
    handleAddNew = () => {
        this.props.history.push("user/new");
    }

    renderBody = (users) => (
        <div>
            <UserList
                users={users}
                urlPath="user/">
            </UserList>
            <Action>
                <button onClick={() => this.props.history.push("/")}>MAIN</button>
                <button onClick={this.handleAddNew}>New User</button>
            </Action>
        </div>
    );

    render() {
        return (
            <div>
                <AppTemplate
                    header="User List"
                    body={this.renderBody(this.props.users)}>
                </AppTemplate>
            </div>
        );
    }
}

UsersContainer.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
};

UsersContainer.defaultProps = {
    users: [
    ]
};

const mapStateToProps = state => ({
    users: getUsers(state),
});
                                                    //Mapea las funciones en las props
export default withRouter(connect(mapStateToProps, { fetchUsers })(UsersContainer));