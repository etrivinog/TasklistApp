import { handleActions } from 'redux-actions';
import { FETCH_USERS, INSERT_USER, UPDATE_USER, DELETE_USER } from '../constants';

export const users = handleActions(
    {
        [FETCH_USERS]: (state, action) => [...action.payload],
        [INSERT_USER]: (state, action) => [...state, action.payload],
        [UPDATE_USER]: (state, action) => {
            const userPayload = action.payload;
            const { userId } = userPayload;

            const users = state;
            const initialValue = [];

            const newUsers = users.reduce( (acc, user) => {
                if(user.userId === userId){
                    return [ ...acc, userPayload];
                }else{
                    return [ ...acc, user];
                }
            }, initialValue);
            
            return newUsers;
            
        },
        [DELETE_USER]: (state, action) => state.filter(c => c.userId !== action.payload)
    }, //Action dispatched and function to execute for the action
    [] //Initial state
);