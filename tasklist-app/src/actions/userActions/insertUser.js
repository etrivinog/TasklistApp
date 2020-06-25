import { INSERT_USER } from '../../constants';
import { createAction } from 'redux-actions';
import { apiPost } from '../../api';
import { urlUser, save } from '../../api/urls';

//Make the asyc promise into sync
export const insertUser = createAction(INSERT_USER,
    user => apiPost(`${urlUser}${save}`, user)() );