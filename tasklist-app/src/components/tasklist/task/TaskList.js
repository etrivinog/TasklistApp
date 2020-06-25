import React from 'react';
import PropTypes from 'prop-types';
import TaskListItem from './TaskListItem';

const TaskList = ({tasks, urlPath}) => {

    return (
        <div>
            <div className="tasks-list">
                {   
                    tasks.map( c =>
                        <TaskListItem
                            taskId={c.taskId}
                            key={c.taskId}
                            description={c.description}
                            editAction={'Edit'}
                            delAction={'Delete'}
                            urlPath={urlPath}>
                        </TaskListItem>)
                }
            </div>
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired,
};

export default TaskList;