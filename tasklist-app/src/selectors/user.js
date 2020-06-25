import { createSelector } from 'reselect';

export const getUsers = state => state.users;

export const getUserById = createSelector(
    (state, props) => state.users.find( u => u.userId == props.userId),
    user => user
)