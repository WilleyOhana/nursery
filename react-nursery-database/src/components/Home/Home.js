import { useEffect } from 'react';
import axios from 'axios';
import Item from '../Item/Item';
import './Home.css';
import { useState } from 'react';

const Home = () => {

    const [plants, setPlants] = useState([]);

    useEffect(() => {
        let asyncFunc = async () => {
            let res = await axios.get('http://localhost:3001/plants');
            console.log(res);
            setPlants(res.data);
        }

        asyncFunc();
    }, []);

    useEffect(() => {
        let asyncFunc = async () => {
            let res = await axios.post('http://localhost:3001/plants/rhody/35/new-plant/marinn');
            console.log(res);
        }

        asyncFunc();
    })

    return (
        <div className="Home">
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
    )
}

export default Home;