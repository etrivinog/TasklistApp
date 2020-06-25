import React from 'react';
import PropTypes from 'prop-types';
import Action from '../Action';

const TasklistData = ({ tasklistId, name, onBack, isDeleteAllowed, onDelete }) => {
    return (
        <div>
            <div className="tasklist-data">
                <div><strong>Name: </strong><i>{name}</i></div>
            </div>
            <Action>
                <button onClick={onBack}>Back</button>
                {isDeleteAllowed && <button onClick={() => onDelete(tasklistId)}>Delete</button> }
            </Action>
        </div>
    );
};

TasklistData.propTypes = {
    tasklistId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default TasklistData;