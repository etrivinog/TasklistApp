import { FETCH_TASKLISTS } from '../../constants';
import { createAction } from 'redux-actions';
import { apiGet } from '../../api';
import { urlTasklist, findAll } from '../../api/urls';

//Make the asyc promise into sync
export const fetchTasklist = createAction(FETCH_TASKLISTS, apiGet(`${urlTasklist}${findAll}`));