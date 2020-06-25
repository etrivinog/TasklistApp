import React from 'react';
import PropTypes from 'prop-types';
import UserListItem from './UserListItem';

const UserList = ({users, urlPath}) => {
    return (
        <div>
            <div className="list">
                {
                    users.map( user =>
                        <UserListItem
                            userId={user.userId}
                            key={user.userId}
                            name={user.name}
                            editAction={'Edit'}
                            delAction={'Delete'}
                            urlPath={urlPath}>
                        </UserListItem>)
                }
            </div>
        </div>
    );
};

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired,
};

export default UserList;