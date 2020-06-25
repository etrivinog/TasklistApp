import { INSERT_TASKLIST } from '../../constants';
import { createAction } from 'redux-actions';
import { apiPost } from '../../api';
import { urlTasklist, save } from '../../api/urls';

//Make the asyc promise into sync
export const insertTasklist = createAction(INSERT_TASKLIST,
    tasklist => apiPost(`${urlTasklist}${save}`, tasklist)() );