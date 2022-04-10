import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Item.css';

const Item = ({ plant }) => {

    const [dropdownVisible, setDropdownVisible] = useState('');
    const [ellipsesVisible, setEllipsesVisible] = useState('');

    const detailsRef = useRef(null);

    // Check if the details are overflowing, and place ellipses if so
    useEffect(() => {
        if(detailsRef.current.scrollHeight > detailsRef.current.clientHeight) {
            setEllipsesVisible('show');
        }
    }, [])

    // Set dropdown CSS if user clicks button
    const toggleDropdown = () => {
        if(dropdownVisible === "visible") {
            setDropdownVisible('');
        } else {
            setDropdownVisible('visible');
        }
    }
    
    // API call to delete plant
    const deletePlant = async () => {
        let res = await axios.delete(`http://localhost:3001/plants/${plant.id}`);

        console.log(res);
    }

    return (
        <div className="Item">            
            <div className={`options-btn ${dropdownVisible}`} onClick={toggleDropdown}>
                {
                    dropdownVisible ?
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

            <div className={`dropdown ${dropdownVisible}`}>
                <ul>
                    <li onClick={deletePlant}>Delete</li>
                    <li>Edit</li>
                </ul>

                <div className="triangle"></div>
            </div>

            <div className='pic-container'></div>
            <div className="content">
                <h3>{plant.name}</h3>
                <p ref={detailsRef} className="details">
                    {plant.details}
                    <div className={`ellipses ${ellipsesVisible}`}>...</div>
                </p>
            </div>
            <div className="quantity">
                <h4>Quantity:</h4>
                <p><code>{plant.quantity}</code></p>
            </div>
        </div>
    )
}

export default Item;