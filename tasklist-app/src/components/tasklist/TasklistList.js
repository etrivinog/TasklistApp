import React from 'react';
import PropTypes from 'prop-types';
import TasklistListItem from './TasklistListItem';
import TasklistEdit from './TasklistEdit';

const TasklistList = ({tasklists, urlPath}) => {
    
    return (
        <div>
            <div className="list">
                {
                    tasklists.map(t => 
                        <div key={`${t.tasklistId}${t.name}`}>
                            <TasklistListItem
                                id={t.tasklistId}
                                name={t.name}
                                urlPath={urlPath}
                                editAction="EDIT"
                                delAction="DELETE"
                                >
                            </TasklistListItem>
                             
                        </div>) 
                }
            </div>
        </div>
    );
};

TasklistList.propTypes = {
    tasklist: PropTypes.array,
    urlPath: PropTypes.string.isRequired,
};

export default TasklistList;