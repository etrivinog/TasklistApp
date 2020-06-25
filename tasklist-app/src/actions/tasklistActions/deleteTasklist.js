import { DELETE_TASKLIST } from '../../constants';
import { createAction } from 'redux-actions';
import { apiDelete } from '../../api';
import { urlTasklist, delete_ } from '../../api/urls';

//Make the asyc promise into sync
export const deleteTasklist = createAction(DELETE_TASKLIST,
    id => apiDelete(`${urlTasklist}${delete_}`, id)() );