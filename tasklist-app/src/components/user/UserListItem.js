import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserListItem = ({ userId, name, delAction, editAction, urlPath }) => {
    return (
        <div key={userId}>
            <div className="list-item">
                <div className="field">
                    <Link to={`${urlPath}${userId}`}>{name}</Link>
                </div>
                <div className="field">
                    <Link to={`${urlPath}${userId}/edit`}>{editAction}</Link>
                </div>
                <div className="field">
                    <Link to={`${urlPath}${userId}/del`}>{delAction}</Link>
                </div>
            </div>
        </div>
    );
};

UserListItem.propTypes = {
    userId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    editAction: PropTypes.string.isRequired,
    delAction: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
};

export default UserListItem;