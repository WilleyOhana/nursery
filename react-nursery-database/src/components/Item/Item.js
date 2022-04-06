import './Item.css';

const Item = ({ plant }) => {
    return (
        <div className="Item">
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