import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TasklistListItem = ({id, name, urlPath, editAction, delAction}) => {
    return (
        <div key={id}>
            <div className="list-item">
                <div className="field">
                    <Link to={`${urlPath}${id}`}>{name}</Link>
                </div>
                <div className="field">
                    <Link to={`${urlPath}${id}/edit`}>{editAction}</Link>
                </div>
                <div className="field">
                    <Link to={`${urlPath}${id}/del`}>{delAction}</Link>
                </div>
            </div>
        </div>
    );
};

TasklistListItem.propTypes = {
    
};

export default TasklistListItem;