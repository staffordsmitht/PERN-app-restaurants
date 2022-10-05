
import React, { useEffect } from 'react';
import { useContext } from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';


const RestaurantList = (props) => {
  const {restaurants, setRestaurants} = useContext(RestaurantsContext);
  let navigate = useNavigate()
  console.log(restaurants, setRestaurants);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        console.log(response.data.data);
        setRestaurants(response.data.data.restaurants);

      } catch (err) {}
    };
    fetchData();
  },[]);

  const handleDelete= async (id) => {
    try {
     const response = await RestaurantFinder.delete(`/${id}`);
     setRestaurants(
      restaurants.filter((restaurant) => {
      return restaurant.id !== id;
     })
     );
    } catch (err) {}
  };

  const handleUpdate = (id) => {
    navigate(`/restaurants/${id}/update`);
  }
  return (


<table className="table">
  <caption>List of Restaurants</caption>
    <thead>
      <tr>
        <th scope="col">Restaurant</th>
        <th scope="col">Location</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
      {restaurants && restaurants.map((restaurant) => {
      return (
        <tr key={restaurant.id}>
          <td>{restaurant.name}</td>
          <td>{restaurant.location}</td>
          <td>
            <button onClick={() => handleUpdate(restaurant.id)} type="button" className="btn btn-outline-warning">Update</button>
          </td>
          <td>
            <button onClick={() => handleDelete(restaurant.id)} type="button" className="btn btn-outline-danger">Delete</button>
          </td>
        </tr>
    ); 
  })}
    </tbody>
</table>
);
};

 

export default RestaurantList;

 {/* <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Ratings</td>
      <td>
        <button type="button" className="btn btn-outline-warning">Update</button>
      </td>
      <td>
        <button type="button" className="btn btn-outline-danger">Delete</button>
      </td>
    </tr>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Ratings</td>
      <td>
        <button type="button" className="btn btn-outline-warning">Update</button>
      </td>
      <td>
        <button type="button" className="btn btn-outline-danger">Delete</button>
      </td>
    </tr>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Ratings</td>
      <td>
        <button type="button" className="btn btn-outline-warning">Update</button>
      </td>
      <td>
        <button type="button" className="btn btn-outline-danger">Delete</button>
      </td>
    </tr>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Ratings</td>
      <td>
        <button type="button" className="btn btn-outline-warning">Update</button>
      </td>
      <td>
        <button type="button" className="btn btn-outline-danger">Delete</button>
      </td>
    </tr>  */} 