import { DELETE_USER } from '../../constants';
import { createAction } from 'redux-actions';
import { apiDelete } from '../../api';
import { urlUser, delete_ } from '../../api/urls';

//Make the asyc promise into sync
export const deleteUser = createAction(DELETE_USER,
    id => apiDelete(`${urlUser}${delete_}`, id)() );