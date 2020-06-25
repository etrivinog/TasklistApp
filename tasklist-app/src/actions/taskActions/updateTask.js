import { UPDATE_TASK } from '../../constants';
import { createAction } from 'redux-actions';
import { apiPut } from '../../api';
import { urlTask, update } from '../../api/urls';

//Make the asyc promise into sync
export const updateTask = createAction(UPDATE_TASK,
    task => apiPut(`${urlTask}${update}`, task)() );