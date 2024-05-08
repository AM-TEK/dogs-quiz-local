import React, { useState } from 'react';
import SelectedDogCard from './SelectedDogCard';

function Favorites({ favorites, quizSubmitted }) {
  const [selectedDog, setSelectedDog] = useState(null);

  const handleClick = (dog) => {
    setSelectedDog(dog);
  };

  return (
    <div>
      <h2 className='text-xl m-4'>Favorites</h2>
      {favorites.length === 0 && !quizSubmitted && (
        <p className="m-4">Add your favorite dog breeds after taking the quiz!</p>
      )}
      <ul>
        {favorites.map(dog => (
          <li key={dog.id} className="flex items-center space-x-4 p-2">
            <img
              src={dog.image}
              alt={dog.breed}
              className='rounded-lg w-32 h-auto object-cover cursor-pointer'
              onClick={() => handleClick(dog)}
            />
            <span className="text-lg">{dog.breed}</span>
          </li>
        ))}
      </ul>
      {selectedDog && <SelectedDogCard dog={selectedDog} />}
    </div>
  );
}

export default Favorites;
