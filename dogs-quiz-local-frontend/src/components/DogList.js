import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DogList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/dogs')
      .then(response => {
        console.log(response);
        setDogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching dogs:', error);
      });
  }, []);

  return (
    <div>
      <h1>Dogs</h1>
      <ul>
        {dogs.map(dog => (
          <li key={dog.id}>
            <img src={dog.image} alt={dog.breed} />
            <p>{dog.breed}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogList;
