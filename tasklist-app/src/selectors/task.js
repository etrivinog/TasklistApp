import { createSelector } from 'reselect';


export const getTaskById = createSelector(
    (state, props) => state.tasks.find( t => t.taskId == props.taskId),
    task => task
)
