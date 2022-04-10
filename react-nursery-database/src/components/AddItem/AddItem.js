import './AddItem.css';
import axios from 'axios';
import { GiTreeBranch } from 'react-icons/gi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [details, setDetails] = useState('');
    const [picture, setPicture] = useState(null);

    const navigate = useNavigate();

    const submitAddItemForm = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:3001/plants/${name}/${quantity}/${details}/MarinnCarpenter`);
        navigate('/');
    }

    return (
        <div className="add-item">
            <form onSubmit={(e) => submitAddItemForm(e)}>
                <GiTreeBranch className='icon' />
                <h3>Add New Plant</h3>

                <label htmlFor="name">Name of plant:</label>
                <input 
                    name="name" 
                    type="text" 
                    id="name" 
                    placeholder="Name" 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />

                <label htmlFor="quantity">Quantity on hand</label>
                <input 
                    name="quantity" 
                    type="number" 
                    id="quantity" 
                    placeholder="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                    required
                />

                <label htmlFor="details">Details</label>
                <textarea 
                    rows="5"
                    name="details"
                    id="details"
                    placeholder='e.g. 2 gallon pot, requires loose soil and daily water' 
                    onChange={(e) => setDetails(e.target.value)}
                    value={details}
                    required
                />

                <label htmlFor='picture'>Upload picture</label>
                <input
                    type="file"
                    name="picture"
                    id="picture"
                    onChange={(e) => setPicture(e.target.value)}
                    accept="image/jpeg, image/png" 
                    required
                />

                <input type="submit" />
            </form>
        </div>
    )
}

export default AddItem;