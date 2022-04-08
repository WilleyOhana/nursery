import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Item from '../Item/Item';
import './Home.css';

const Home = () => {

    const [plants, setPlants] = useState([]);

    // Fetch all the plants from the database
    useEffect(() => {
        let asyncFunc = async () => {
            let res = await axios.get('http://localhost:3001/plants');
            setPlants(res.data);
        }


        asyncFunc();
    }, []);

    return (
        <div className="Home">
            <header>
                <Link className="add-btn" to="/add-item">
                    <div className="plus">+</div>
                    <div className="text">
                        <p>Add new plant</p>
                    </div>
                </Link>
            </header>

            <div className="plants-container">
                {
                    plants.map((plant) => {
                        return (
                            <Item
                                key={plant.id}
                                plant={plant}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;