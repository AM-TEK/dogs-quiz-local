
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DogList() {
  const [dogs, setDogs] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  //Fetch list of dogs from backend API with Axios GET request
  useEffect(() => {
    axios.get('http://localhost:8081/dogs')
      .then(response => {
        setDogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching dogs:', error);
      });
  }, []);
  //Update the userAnswers state to keep track of their selections
  const handleAnswer = (dogId, selectedOption) => {
    setUserAnswers(prevState => ({
        ...prevState,
        [dogId]: selectedOption
    }));
  };
  //Send a POST request to the '/score' endpoint with userAnswers data, use the response to update the score state and update quizSubmitted to true
  const handleSubmit = () => {
    axios.post('http://localhost:8081/score', userAnswers)
      .then(response => {
          setScore(response.data.score);
          setQuizSubmitted(true);
      })
      .catch(error => {
          console.error('Error calculating score:', error);
      });
  };
  //Send a POST request to the '/dogs' endpoint with the updated dog object (favorites: true)
  const addToFavorites = (dog) => {
    axios.post('http://localhost:8081/dogs', { ...dog, favorites: true })
      .then(response => {
          if (!favorites.find(favorite => favorite.id === dog.id)) {
              setFavorites([...favorites, dog]);
          }
      })
      .catch(error => {
          console.error('Error adding dog to favorites:', error);
      });
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        <h1 className='text-2xl font-bold m-4'>Dogs Quiz</h1>
        <h3 className='m-4'>Choose the dog breed based off the picture: </h3>

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
              <hr />
            </li>
          ))}
        </ul>
        <button 
          onClick={handleSubmit}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-4 rounded-md'
          >
          Submit Answers
        </button>
        {score !== null && <p className='m-4'>Score: {(score / dogs.length * 100).toFixed(2)}%</p>}
      </div>
  
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
    </div>
  );
}

export default DogList;
