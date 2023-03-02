import '../styles/TodoItem.css';

export default function TodoItem(props){
    return(
        <div className='todo-item'>
            <img className='checkbox' onClick={() => {props.makeCompleted(props.id)}} src={`./images/${props.completed ? 'checked-checkbox-big.png' : 'empty-checkbox-big.png'}`}/>
            <p className='todo-item-name' onClick={() => {props.togglePopup(true); props.changePopupType('editTask'); props.editTaskScreen(props.id)}}>{props.taskName}</p>
            <img onClick={() => props.removeTask(props.id)} className='remove-item' src='./images/remove-item.png'/>
        </div>
    );
};