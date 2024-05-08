import React from 'react';

function DogQuiz({ dog, handleAnswer, userAnswers }) {
  return (
    <div className='flex'>
      <img 
        src={dog.image} 
        alt={dog.breed} 
        className='m-4 rounded-lg w-32 h-32 object-cover' 
      />
      <ul>
        {dog.options.map(option => (
          <li key={option}>
            <button 
              onClick={() => handleAnswer(dog.id, option)}
              className={`border mx-4 my-2 p-1 rounded-md text-sm ${userAnswers[dog.id] === option ? 'border-blue-500' : 'border-gray-300'} hover:bg-gray-100 hover:border-gray-400`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogQuiz;
