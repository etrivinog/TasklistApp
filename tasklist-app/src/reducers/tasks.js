import { handleActions } from 'redux-actions';
import { FETCH_TASKS, INSERT_TASK, UPDATE_TASK, DELETE_TASK } from '../constants';

export const tasks = handleActions(
    {
        [FETCH_TASKS]: (state, action) => [...action.payload],
        [INSERT_TASK]: (state, action) => [...state, action.payload],
        [UPDATE_TASK]: (state, action) => {
            const taskPayload = action.payload;
            const { taskId } = taskPayload;

            const tasks = state;
            const initialValue = [];

            const newTasklists = tasks.reduce( (acc, task) => {
                if(task.taskId === taskId){
                    return [ ...acc, taskPayload];
                }else{
                    return [ ...acc, task];
                }
            }, initialValue);
            
            return newTasklists;
            
        },
        [DELETE_TASK]: (state, action) => state.filter(t => t.taskId !== action.payload)
    }, //Action dispatched and function to execute for the action
    [] //Initial state
);