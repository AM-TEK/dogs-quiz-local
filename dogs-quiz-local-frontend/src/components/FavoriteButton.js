import React from 'react';

function FavoriteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white text-sm p-1 mx-4 my-1 rounded-md"
    >
      Add to Favorites
    </button>
  );
}

export default FavoriteButton;
