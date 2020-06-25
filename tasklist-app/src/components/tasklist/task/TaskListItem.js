import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TaskListItem = ({ taskId, description, delAction, editAction, urlPath }) => {
    return (
        <div key={taskId}>
            <div className="list-item">
                <div className="field">
                    <Link to={`/${urlPath}${taskId}`}>{description}</Link>
                </div>
                <div className="field">
                    <Link to={`/${urlPath}${taskId}/edit`}>{editAction}</Link>
                </div>
                <div className="field">
                    <Link to={`/${urlPath}${taskId}/del`}>{delAction}</Link>
                </div>
            </div>
        </div>
    );
};

TaskListItem.propTypes = {
    taskId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    editAction: PropTypes.string.isRequired,
    delAction: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
};

export default TaskListItem;