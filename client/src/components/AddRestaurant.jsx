import React, { useState } from 'react';
import { useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';


const AddRestaurant = () => {
    const {AddRestaurant} = useContext(RestaurantsContext);
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location
            });
            AddRestaurant(response.data.data.restaurants);
            console.log(response);
        } catch (err) {

        }
    }
  return (
    <form className="form">
           <div className="input-group text-center"> 
                <div className="col-xs-12 col-md-offset-15">
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder='name'/>
                </div>
                <div className="col-xs-12 col-md-offset-15">
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder='location'/>
                </div>
                <div className="col-xs-12 col-md-offset-15"> 
                <button onClick={handleSubmit} type='submit' className="btn btn-primary">Add</button>
                </div>
            </div>
    </form>
  );
};


export default AddRestaurant;