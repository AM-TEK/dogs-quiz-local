import React from 'react';

function FavoriteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-4 rounded-md"
    >
      Add to Favorites
    </button>
  );
}

export default FavoriteButton;
