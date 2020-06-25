import { handleActions } from 'redux-actions';
import { FETCH_TASKLISTS, INSERT_TASKLIST, UPDATE_TASKLIST, DELETE_TASKLIST } from '../constants';

export const tasklists = handleActions(
    {
        [FETCH_TASKLISTS]: (state, action) => [...action.payload],
        [INSERT_TASKLIST]: (state, action) => [...state, action.payload],
        [UPDATE_TASKLIST]: (state, action) => {
            const tasklistPayload = action.payload;
            const { tasklistId } = tasklistPayload;

            const tasklists = state;
            const initialValue = [];

            const newTasklists = tasklists.reduce( (acc, tasklist) => {
                if(tasklist.tasklistId === tasklistId){
                    return [ ...acc, tasklistPayload];
                }else{
                    return [ ...acc, tasklist];
                }
            }, initialValue);
            
            return newTasklists;
            
        },
        [DELETE_TASKLIST]: (state, action) => state.filter(t => t.tasklistId !== action.payload)
    }, //Action dispatched and function to execute for the action
    [] //Initial state
);