import React from 'react';
import './styles/General.css';
import Header from './components/Header';
import CompletedTasks from './components/CompletedTasks';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import AddItemButton from './components/AddItemButton';
import AddItemPopup from './components/AddItemPopup';
import EditItemPopup from './components/EditItemPopup';

export default function App(){

    const [showDropdown, setShowDropdown] = React.useState(false);
    const [allTasksCompleted, setAllTasksCompleted] = React.useState(false)
    const [numberOfTasks, setNumberOfTasks] = React.useState(0);
    const [taskList, setTaskList] = React.useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [showPopup, setShowPopup] = React.useState(false);
    const [popupType, setpopupType] = React.useState('');
    const [showEditPopup, setShowEditPopup] = React.useState();
    const [listView, setListView] = React.useState('all');
    const taskElements = {
        all: taskList.map((task) => {
                    return(
                        <TodoItem key={task.id} id={task.id} completed={task.completed} taskName={task.taskName} makeCompleted={makeCompleted} removeTask={removeTask} editItem={editItem} editTaskScreen={editTaskScreen} changePopupType={changePopupType} togglePopup={togglePopup}/>
                    );
                }),
        completed: taskList.map((task) => {
                if(task.status === 'completed'){
                    return(
                        <TodoItem key={task.id} id={task.id} completed={task.completed} taskName={task.taskName} makeCompleted={makeCompleted} removeTask={removeTask} editItem={editItem} editTaskScreen={editTaskScreen} changePopupType={changePopupType} togglePopup={togglePopup}/>
                    );
                }
            }),
        active: taskList.map((task) => {
                if(task.status === 'active'){
                    return(
                        <TodoItem key={task.id} id={task.id} completed={task.completed} taskName={task.taskName} makeCompleted={makeCompleted} removeTask={removeTask} editItem={editItem} editTaskScreen={editTaskScreen} changePopupType={changePopupType} togglePopup={togglePopup}/>
                    );
                }}),
    }
    let numberOfTasksinView = 0;
    taskElements[listView].forEach((task) => {
        return(task !== undefined ? numberOfTasksinView++ : null)
    })
    function toggleShowDropdown(value){
        setShowDropdown(value);
        
    };
    function toggelAllTasksComplted(value){
        setAllTasksCompleted(value);
    }
    function changeNumberOfTasks(value){
        setNumberOfTasks(value)
    };
    function changeTaskList(value){
        setTaskList(value);
    };
    function togglePopup(value){
        setShowPopup(value);
    };
    function changePopupType(value){
        setpopupType(value);
    };
    function newTaskScreen(){
        return(<AddItemPopup addNewItem={addNewItem} togglePopup={togglePopup} showPopup={showPopup}/>)
    };
    function editTaskScreen(id){
        id = id || 0;
        taskList.forEach((task) => {
            if(task.id === id){
                const taskName = task.taskName;
                const taskDescription = task.taskDescription;
                setShowEditPopup(<EditItemPopup id={task.id} addNewItem={addNewItem} togglePopup={togglePopup} showPopup={showPopup} taskName={taskName} description={taskDescription} editItem={editItem}/>)
            }
        })
    };
    function randomIdNumber(){
        let randomNumber = Math.floor(Math.random() * 1000);
        let chosenIdNumber;
        taskList.length > 0 ?  taskList.forEach((task) => {
            if(task.id === randomNumber){
                randomIdNumber()
            }
            else{
                chosenIdNumber = randomNumber
            }
        }) : chosenIdNumber = randomNumber
        return(chosenIdNumber)
    };
    function addNewItem(item){
        taskList.push({
            id: randomIdNumber(),
            completed: false,
            taskName: item.name,
            taskDescription: item.description,
            status: 'active'
        })
    };
    function editItem(id, newName, newDescription){
        let editedTask = taskList.map((task) => {
            if(task.id === id){
                return(
                    {
                        ...task,
                        taskName: newName,
                        taskDescription: newDescription
                    }
                )
            }
            else{
                return(task)
            }
        })
        setTaskList(editedTask);
    };
    function changeListView(value){
        setListView(value);
    };
    function makeCompleted(id){
        changeTaskList((prevState) => {
            return(prevState.map((task) => {
                let newTask = {};
                task.id === id ? newTask = {
                    ...task,
                    completed: !task.completed
                } : newTask = task
                
                newTask.completed ? newTask['status'] = 'completed' : newTask['status'] = 'active';

                return(newTask);
            }))
        })
    };
    function removeTask(id){
        changeTaskList(prevState => {
            return(prevState.filter((task) => task.id !== id))
        })
    };

    React.useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(taskList))
    }, [taskList])

    return(
        <div className='todo-app'>
            <Header showDropdown={showDropdown} toggleShowDropdown={toggleShowDropdown} changeListView={changeListView} listView={listView} taskElements={taskElements} changeNumberOfTasks={changeNumberOfTasks}/>
            {taskList.length <= 0 ? <p></p> : <CompletedTasks allTasksCompleted={allTasksCompleted} numberOfTasks={numberOfTasks} listView={listView} taskElements={taskElements} changeNumberOfTasks={changeNumberOfTasks}/>}
            {taskList.length <= 0 ? <h1 className='no-task-text'>No tasks here! <br/> Press the "ADD ITEM" button to create a  new task</h1> : <TodoList taskList={taskList} changeTaskList={changeTaskList} toggelAllTasksComplted={toggelAllTasksComplted} changeNumberOfTasks={changeNumberOfTasks} listView={listView} taskElements={taskElements} numberOfTasksinView={numberOfTasksinView}/>}
            {listView === 'all' ? <AddItemButton onClick={() => {togglePopup(true); changePopupType('addTask')}}/> : <p></p>}
            {showPopup && popupType === 'addTask' && newTaskScreen()}
            {showPopup && popupType === 'editTask' && showEditPopup}
        </div>
    );
};