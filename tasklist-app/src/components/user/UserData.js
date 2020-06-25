import React from 'react';
import PropTypes from 'prop-types';
import Action from '../Action';

const UserData = ({ userId, name, email, onBack, isDeleteAllowed, onDelete }) => {
    return (
        <div>
            <div className="user-data">
                <div><strong>Nanme: </strong><i>{name}</i></div>
                <div><strong>Email: </strong>{email}</div>
            </div>
            <Action>
                <button onClick={onBack}>Back</button>
                {isDeleteAllowed && <button onClick={() => onDelete(userId)}>Delete</button> }
            </Action>
        </div>
    );
};

UserData.propTypes = {
    userId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default UserData;