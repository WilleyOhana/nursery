import './AddItem.css';
import { GiTreeBranch } from 'react-icons/gi';

const AddItem = () => {

    const submitAddItemForm = (e) => {
        e.preventDefault();


    }

    return (
        <div className="add-item">
            <form onSubmit={(e) => submitAddItemForm(e)}>
                <GiTreeBranch className='icon' />
                <h3>Add New Plant</h3>

                <label htmlFor="name">Name of plant:</label>
                <input name="name" type="text" id="name" placeholder="Name" />

                <label htmlFor="quantity">Quantity on hand</label>
                <input name="quantity" type="number" id="quantity" placeholder="Quantity" />

                <label htmlFor="details">Details</label>
                <textarea rows="5" placeholder='e.g. 2 gallon pot, requires loose soil and daily water' />

                <input type="submit" />
            </form>
        </div>
    )
}

export default AddItem;