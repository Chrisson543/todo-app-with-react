import React from 'react';
import '../styles/AddItemPopup.css';

export default function AddItemPopup(props){
    const [newItem, setNewItem] = React.useState({
        name: props.taskName || '',
        description: props.description || ''
    })
    // function closePopup(e){
    //     if(e.keyCode === 13){
    //         console.log('press')
    //     }
    // };
    function updateNewItemName(name){
        setNewItem((prevState) => {
            return {
                ...prevState,
                name: name
            }
        })
    };
    function updateNewItemDescription(description){
        setNewItem((prevState) => {
            return {
                ...prevState,
                description: description
            }
        })
    };

    // React.useEffect(() => {
    //     document.addEventListener("keypress", (e) => closePopup(e))
    // })

    return(
        <div className='add-item-popup'>
            <div className='close-popup'>
                <img onClick={() => {props.togglePopup(false)}} src='./images/close.png'/>
            </div>
            <h1>ADD ITEM</h1>
            <input autoFocus type='text' placeholder='Task name...' onChange={(text) => updateNewItemName(text.target.value)} value={newItem['name']}/>
            <textarea placeholder='Description...' onChange={(text) => updateNewItemDescription(text.target.value)} value={newItem['description']}></textarea>
            <button onClick={() => {
                if(newItem['name'] !== ''){
                    props.togglePopup(false);
                    props.addNewItem(newItem); 
                }
                else{
                    props.togglePopup(false);
                }}}>DONE</button>
            {/* {document.removeEventListener("keypress", (e) => closePopup(e))} */}
        </div>
    );
};