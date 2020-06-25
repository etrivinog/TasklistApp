import { INSERT_TASK } from '../../constants';
import { createAction } from 'redux-actions';
import { apiPost } from '../../api';
import { urlTask, save } from '../../api/urls';

//Make the asyc promise into sync
export const insertTask = createAction(INSERT_TASK,
    task => apiPost(`${urlTask}${save}`, task)() );