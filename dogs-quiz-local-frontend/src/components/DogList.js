
import React, { useState, useEffect } from 'react';
import DogQuiz from './DogQuiz';
import Favorites from './Favorites';
import SubmitButton from './SubmitButton';
import FavoriteButton from './FavoriteButton';
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
    <div className="flex divide-x-4 bg-sky-100">
      <section className="w-1/2">
        <h2 className='text-xl m-4'>Dogs Quiz</h2>
        <h3 className='m-4'>Choose the dog breed based off the picture: </h3>
        <ul >
          {dogs && dogs.map((dog, index) => (
            <li key={`${dog.id}-${index}`}>
              <DogQuiz 
                dog={dog} 
                handleAnswer={handleAnswer} 
                userAnswers={userAnswers} 
              />
              {quizSubmitted && (
                <FavoriteButton onClick={() => addToFavorites(dog)}/>
              )}
              <hr />
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <SubmitButton onClick={handleSubmit}/>
          {score !== null && <p className='m-4'>Score: {(score / dogs.length * 100).toFixed(2)}%</p>}
        </div>
      </section>
      <section className="w-1/2">
        <Favorites favorites={favorites} quizSubmitted={quizSubmitted} />
      </section>
    </div>
  );
}

export default DogList;
