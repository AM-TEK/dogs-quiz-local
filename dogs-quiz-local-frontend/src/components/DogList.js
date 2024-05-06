
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DogList() {
  const [dogs, setDogs] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

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
    setUserAnswers(prevState => ({
        ...prevState,
        [dogId]: selectedOption
    }));
};

const handleSubmit = () => {
    axios.post('http://localhost:8080/score', userAnswers)
        .then(response => {
            setScore(response.data.score);
            setQuizSubmitted(true);
        })
        .catch(error => {
            console.error('Error calculating score:', error);
        });
};

const addToFavorites = (dog) => {
    // Update the backend to set the Favorites field to true
    axios.post('http://localhost:8080/dogs', { ...dog, favorites: true })
        .then(response => {
            if (!favorites.find(favorite => favorite.id === dog.id)) {
                setFavorites([...favorites, dog]);
            }
            console.log('Dog added to favorites:', dog);
        })
        .catch(error => {
            console.error('Error adding dog to favorites:', error);
        });
};

  return (
    <div className="flex">
        <div className="w-1/2">
            <h1 className='text-2xl font-bold m-4'>Dogs Quiz</h1>
                <ul>
                    {dogs && dogs.map((dog, index) => (
                        <li key={`${dog.id}-${index}`}>
                            <img src={dog.image} alt={dog.breed} className='m-4 rounded-lg' />
                            {quizSubmitted && (
                                <button
                                    onClick={() => addToFavorites(dog)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-4 rounded-md"
                                >
                                    Add to Favorites
                                </button>
                            )}
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
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={handleSubmit}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-4 rounded-md'
                    >
                    Submit Answers
                </button>
            {score !== null && <p className='mt-4'>Score: {score}</p>}
        </div>
        
        <div className="w-1/2">
            <h2 className='text-2xl font-bold m-4'>Favorites</h2>
            <ul>
                {favorites.map(dog => (
                <li key={dog.id} className="flex items-center space-x-4 p-2">
                    <img src={dog.image} alt={dog.breed} className='rounded-lg w-32 h-32' />
                    <span className="text-lg">{dog.breed}</span>
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
}

export default DogList;
