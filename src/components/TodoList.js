import React from 'react';
import '../styles/TodoList.css';
import TodoItem from './TodoItem';

export default function TodoList(props){
    props.changeNumberOfTasks(props.numberOfTasksinView);

    React.useEffect(() => {
        let allComplete = props.taskList.every((task) => {
            return(task.completed === true)
        });

        if(allComplete && (props.taskList.length > 0)){
            props.toggelAllTasksComplted(true)
        }
        else{
            props.toggelAllTasksComplted(false)
        }
    }, [props.taskList])

    return(
        <div className='todo-list'>
            {props.numberOfTasksinView > 0 ? props.taskElements[props.listView] : <h1 className='no-task-text2'>No Tasks here!</h1>}
        </div>
    );
};