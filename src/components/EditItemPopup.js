import React from 'react';
import '../styles/AddItemPopup.css';

export default function EditItemPopup(props){
    const [item, setItem] = React.useState({
        name: props.taskName,
        description: props.description
    })
    function updateItemName(name){
        setItem((prevState) => {
            return {
                ...prevState,
                name: name
            }
        })
    };
    function updateItemDescription(description){
        setItem((prevState) => {
            return {
                ...prevState,
                description: description
            }
        })
    };

    return(
        <div className='add-item-popup'>
            <div className='close-popup'>
                <img onClick={() => {props.togglePopup(false)}} src='./images/close.png'/>
            </div>
            <h1>EDIT ITEM</h1>
            <input autoFocus type='text' placeholder='Task name...' onChange={(text) => updateItemName(text.target.value)} value={item['name']}/>
            <textarea placeholder='Description...' onChange={(text) => updateItemDescription(text.target.value)} value={item['description']}></textarea>
            <button onClick={() => {
                if(item['name'] !== ''){
                    props.editItem(props.id, item.name, item.description);
                    props.togglePopup(false); 
                }
                else{
                    props.togglePopup(false);
                }}}>DONE</button>
        </div>
    );
};