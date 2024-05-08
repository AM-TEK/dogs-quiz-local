import React from 'react';

function Quiz({ dog, handleAnswer, userAnswers }) {
  return (
    <div>
      <img src={dog.image} alt={dog.breed} className='m-4 rounded-lg' />
      <ul>
        {dog.options.map(option => (
          <li key={option}>
            <button 
              onClick={() => handleAnswer(dog.id, option)}
              className={`border mx-4 my-2 p-2 rounded-md ${userAnswers[dog.id] === option ? 'border-blue-500' : 'border-gray-300'}`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz;
