import { useState } from 'react';
import axios from 'axios';
import './Item.css';

const Item = ({ plant }) => {

    const [visible, setVisible] = useState('');

    const toggleDropdown = () => {
        if(visible === "visible") {
            setVisible('');
        } else {
            setVisible('visible');
        }
    }
    
    const deletePlant = async () => {
        let res = await axios.delete(`http://localhost:3001/plants/${plant.id}`);
    
        console.log(res);
    }

    return (
        <div className="Item">            
            <div className={`options-btn ${visible}`} onClick={toggleDropdown}>
                {
                    visible ?
                    <>
                        <div className='cross left'></div>
                        <div className='cross right'></div>
                    </>
                    :
                    <>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </>
                }
            </div>

            <div className={`dropdown ${visible}`}>
                <ul>
                    <li onClick={deletePlant}>Delete</li>
                </ul>

                <div className="triangle"></div>
            </div>

            <div className='pic-container'></div>
            <div className="content">
                <h2>{plant.name}</h2>
                <p>{plant.id}</p>
                <p>{plant.details}</p>
            </div>
            <div className="quantity">
                <h4>Quantity:</h4>
                <p><code>{plant.quantity}</code></p>
            </div>
        </div>
    )
}

export default Item;