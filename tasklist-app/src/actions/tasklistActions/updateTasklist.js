import { UPDATE_TASKLIST } from '../../constants';
import { createAction } from 'redux-actions';
import { apiPut } from '../../api';
import { urlTasklist, update } from '../../api/urls';

//Make the asyc promise into sync
export const updateTasklist = createAction(UPDATE_TASKLIST,
    tasklist => apiPut(`${urlTasklist}${update}`, tasklist)() );