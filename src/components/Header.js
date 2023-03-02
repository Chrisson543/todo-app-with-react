import '../styles/Header.css';
export default function Header(props){
    return(
        <header>
            <div className='logo'>
                <h1>TODO LIST <span className='author'>by Chrisson</span></h1>
            </div>
            <div className='options'>
                <button onClick={() => props.toggleShowDropdown((prevState) => !prevState)}>
                    <img src="./images/options.png"/>
                </button>
                {props.showDropdown && 
                    <ul>
                        <li onClick={() => {props.changeListView('all'); props.toggleShowDropdown((prevState) => !prevState); props.changeNumberOfTasks(props.taskElements[props.listView].length)}}>All Tasks</li>
                        <li onClick={() => {props.changeListView('active'); props.toggleShowDropdown((prevState) => !prevState); props.changeNumberOfTasks(props.taskElements[props.listView].length)}}>Active Tasks</li>
                        <li onClick={() => {props.changeListView('completed'); props.toggleShowDropdown((prevState) => !prevState); props.changeNumberOfTasks(props.taskElements[props.listView].length)}}>Completed Tasks</li>
                    </ul>
                }

            </div>
        </header>
    );
};