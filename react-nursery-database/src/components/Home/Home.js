import { useEffect } from 'react';
import axios from 'axios';
import Item from '../Item/Item';
import './Home.css';
import { useState } from 'react';

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