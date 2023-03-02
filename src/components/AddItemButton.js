import '../styles/AddItemButton.css';

export default function AddItemButton(props){
    return(
        <div className='add-item'>
            <button className='add-item-button' onClick={props.onClick}>
                <h1>ADD ITEM</h1>
            </button>
        </div>
    );
};