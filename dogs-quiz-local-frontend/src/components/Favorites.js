import React from 'react';

function Favorites({ favorites, quizSubmitted }) {
  return (
    <div className="w-1/2">
      <h2 className='text-2xl font-bold m-4'>Favorites</h2>
      {favorites.length === 0 && !quizSubmitted && (
        <p className="m-4">Add your favorite dog breeds after taking the quiz</p>
      )}
      <ul>
        {favorites.map(dog => (
          <li key={dog.id} className="flex items-center space-x-4 p-2">
            <img src={dog.image} alt={dog.breed} className='rounded-lg w-32 h-32' />
            <span className="text-lg">{dog.breed}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
