import { DELETE_TASK } from '../../constants';
import { createAction } from 'redux-actions';
import { apiDelete } from '../../api';
import { urlTask, delete_ } from '../../api/urls';

//Make the asyc promise into sync
export const deleteTask = createAction(DELETE_TASK,
    taskId => apiDelete(`${urlTask}${delete_}`, taskId)() );