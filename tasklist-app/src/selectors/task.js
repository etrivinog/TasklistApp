import { createSelector } from 'reselect';


export const getTaskById = createSelector(
    (state, props) => state.tasks.find( t => t.taskId == props.taskId),
    task => task
)

export const getTaskFromFormResult = createSelector (
    task => {
        
        //Receives the form data and transforms it into a task
        const task_ = {
            taskId:task.taskId,
            description: task.description,
            tasklist: task.tasklist.value ? task.tasklist.value : task.tasklist,
            done: task.done.value ? task.done.value : task.done,
            user: task.user.value ? task.user.value: task.user,
            status: task.status.value ? task.status.value : task.status
        }
        return task_
    },
    task => task
)