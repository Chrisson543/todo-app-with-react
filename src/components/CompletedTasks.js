import '../styles/CompletedTasks.css';

export default function CompletedTasks(props){
    return(
        <div className='completed-tasks'>
            <div className='completed-tasks-div1'>
                <img src={`./images/${props.allTasksCompleted ? 'checked-checkbox-small.png' : 'empty-checkbox-small.png'}`}/>
                <p>{props.numberOfTasks} Task{props.numberOfTasks === 1 ? '' : 's'}</p>
            </div>
            <div className='completed-tasks-div2'>
                <h1>Current View: {props.listView}</h1>
            </div>
        </div>
    );
};