import { FETCH_USERS } from '../../constants';
import { createAction } from 'redux-actions';
import { apiGet } from '../../api';
import { urlUser, findAll } from '../../api/urls';

//Make the asyc promise into sync
export const fetchUsers = createAction(FETCH_USERS, apiGet(`${urlUser}${findAll}`));