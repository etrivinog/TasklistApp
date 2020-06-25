import React from 'react';
import PropTypes from 'prop-types';
import Action from '../../Action';

const TaskData = ({ id, done, user, status, tasklist, description, age, onBack, isDeleteAllowed, onDelete }) => {
    return (
        <div>
            <div className="customer-data">
                <div><strong>Description: </strong><i>{description}</i></div>
                <div><strong>Tasklist: </strong><i>{tasklist}</i></div>
                <div><strong>Done: </strong>{done}</div>
                <div><strong>User: </strong>{user}</div>
                <div><strong>Status: </strong>{status}</div>
            </div>
            <Action>
                <button onClick={onBack}>Back</button>
                {isDeleteAllowed && <button onClick={() => onDelete(id)}>Delete</button> }
            </Action>
        </div>
    );
};

TaskData.propTypes = {
    taskId: PropTypes.number,
    description: PropTypes.string.isRequired,
    tasklist: PropTypes.number.isRequired,
    done: PropTypes.string.isRequired,
    user: PropTypes.number.isRequired,
    statusId: PropTypes.number.isRequired,
};

export default TaskData;