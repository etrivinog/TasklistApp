import { createSelector } from 'reselect';

export const getTasklists = state => state.tasklists;

export const getTasklistById = createSelector(
    (state, props) => state.tasklists.find( t => t.tasklistId == props.tasklistId),
    tasklist => tasklist
)

export const getTasks = createSelector(
    (state) => state.tasks,
    tasklist => tasklist
)
