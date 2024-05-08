import React from 'react';

function SelectedDogCard({ dog }) {
  return (
    <div className="border-4 border-yellow-100 rounded-lg p-4 mt-4">
      <img src={dog.image} alt={dog.breed} className='rounded-lg w-32 h-32 object-cover' />
      <div>
        <p className="text-xl">{dog.breed}</p>
        <p>Size: {dog.size}</p>
        <p>Exercise: {dog.exercise}</p>
        <p>Temperament: {dog.temperament}</p>
      </div>
    </div>
  );
}

export default SelectedDogCard;
