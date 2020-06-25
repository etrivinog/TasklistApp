import { UPDATE_USER } from '../../constants';
import { createAction } from 'redux-actions';
import { apiPut } from '../../api';
import { urlUser, update } from '../../api/urls';

//Make the asyc promise into sync
export const updateUser = createAction(UPDATE_USER,
    user => apiPut(`${urlUser}${update}`, user)() );