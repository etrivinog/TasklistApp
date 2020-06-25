import { FETCH_TASKS } from '../../constants';
import { createAction } from 'redux-actions';
import { apiGet } from '../../api';
import { urlTask, findByTasklist, findAll } from '../../api/urls';

//Make the asyc promise into sync
export const fetchTasks = createAction(FETCH_TASKS, apiGet(`${urlTask}${findAll}`));