import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
   const {id} = useParams();
   let navigate = useNavigate();
   const { restaurants } = useContext(RestaurantsContext);
   const [name, setName] = useState("");
   const [location, setLocation] = useState("");
    
    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`);
            console.log(response.data.data);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location
        });
        navigate('/');
    };
    
  return <div>
    <form action=''>
        <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} id='name' className='form-control' type='text'/>
        </div>

        <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} id='location' className='form-control' type='text'/>
        </div>
        <button type='Submit' onClick={handleSubmit} className='btn btn-primary'>Submit</button>
    </form>
  </div>
};

export default UpdateRestaurant;