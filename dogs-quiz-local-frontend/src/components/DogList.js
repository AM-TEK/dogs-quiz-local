
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DogList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/dogs')
      .then(response => {
        setDogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching dogs:', error);
      });
  }, []);

  const handleAnswer = (dogId, selectedOption) => {
    const selectedDog = dogs.find(dog => dog.id === dogId);
    if (selectedDog.answer === selectedOption) {
      alert('Correct!');
    } else {
      alert('Incorrect. The correct answer is ' + selectedDog.answer);
    }
  };

  return (
    <div>
      <h1>Dogs Quiz</h1>
      <ul>
        {dogs && dogs.map(dog => (
          <li key={dog.id}>
            <img src={dog.image} alt={dog.breed} />
            <ul>
              {dog.options.map(option => (
                <li key={option}>
                  <button onClick={() => handleAnswer(dog.id, option)}>{option}</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogList;
