import React, { useState, useEffect } from 'react';
import DogQuiz from './DogQuiz';
import Favorites from './Favorites';
import SubmitButton from './SubmitButton';
import FavoriteButton from './FavoriteButton';
import dogsData from '../../lib/data';
import Map from './Map';
// import axios from 'axios';

function DogList() {
  const [dogs, setDogs] = useState(dogsData);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  //Fetch list of dogs from backend API with Axios GET request
  // useEffect(() => {
  //   axios.get('http://localhost:8080/dogs')
  //     .then(response => {
  //       setDogs(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching dogs:', error);
  //     });
  // }, []);
  //Update the userAnswers state to keep track of their selections
  // const handleAnswer = (dogId, selectedOption) => {
  //   setUserAnswers(prevState => ({
  //       ...prevState,
  //       [dogId]: selectedOption
  //   }));
  // };
  //Send a POST request to the '/score' endpoint with userAnswers data, use the response to update the score state and update quizSubmitted to true
  // const handleSubmit = () => {
  //   axios.post('http://localhost:8080/score', userAnswers)
  //     .then(response => {
  //         setScore(response.data.score);
  //         setQuizSubmitted(true);
  //     })
  //     .catch(error => {
  //         console.error('Error calculating score:', error);
  //     });
  // };
  //Send a POST request to the '/dogs' endpoint with the updated dog object (favorites: true)
  // const addToFavorites = (dog) => {
  //   axios.post('http://localhost:8080/dogs', { ...dog, favorites: true })
  //     .then(response => {
  //         if (!favorites.find(favorite => favorite.id === dog.id)) {
  //             setFavorites([...favorites, dog]);
  //         }
  //     })
  //     .catch(error => {
  //         console.error('Error adding dog to favorites:', error);
  //     });
  // };

  const handleAnswer = (dogId, selectedOption) => {
    setUserAnswers(prevState => ({
      ...prevState,
      [dogId]: selectedOption
    }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    dogs.forEach(dog => {
      if (userAnswers[dog.id] === dog.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setQuizSubmitted(true);
  };

  const addToFavorites = (dog) => {
    if (!favorites.find(favorite => favorite.id === dog.id)) {
      setFavorites([...favorites, { ...dog, favorites: true }]);
    }
  };
  
  // const MapComponent = React.memo(() => {
  //   useEffect(() => {
  //     const initMap = () => {
  //       navigator.geolocation.getCurrentPosition(
  //         position => {
  //           const { latitude, longitude } = position.coords;
  
  //           const map = new window.google.maps.Map(document.getElementById('map'), {
  //             center: { lat: latitude, lng: longitude },
  //             zoom: 15,
  //             mapId: '83b2492a8c4e8a88'
  //           });
  
  //           const placesService = new window.google.maps.places.PlacesService(map);
  //           const request = {
  //             location: map.getCenter(),
  //             radius: 5000,
  //             type: 'pet_store',
  //           };
  
  //           placesService.nearbySearch(request, (results, status) => {
  //             if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //               for (let i = 0; i < results.length; i++) {
  //                 const marker = new window.google.maps.marker.AdvancedMarkerElement({
  //                   position: results[i].geometry.location,
  //                   map,
  //                   title: results[i].name,
  //                 });
  
  //                 marker.setMap(map);
  //               }
  //             }
  //           });
  //         },
  //         error => {
  //           console.error('Error getting user location:', error);
  //         }
  //       );
  //     };
  
  //     if (window.google && window.google.maps && window.google.maps.marker) {
  //       initMap();
  //     } else {
  //       window.initMap = initMap;
  //     }
  //   }, []);
  
  //   return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
  // });
  
  return (
    <div className="flex flex-col divide-x-4 lg:flex-row bg-sky-100">
      <section className="w-full p-4 lg:w-1/2">
        <h2 className='m-4 text-xl'>Dogs Quiz</h2>
        <h3 className='m-4'>Choose the dog breed based off the picture: </h3>
        <ul>
          {dogs && dogs.map((dog, index) => (
            <li key={`${dog.id}-${index}`}>
              <DogQuiz
                dog={dog}
                handleAnswer={handleAnswer}
                userAnswers={userAnswers}
              />
              {quizSubmitted && (
                <FavoriteButton onClick={() => addToFavorites(dog)} />
              )}
              <hr />
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <SubmitButton onClick={handleSubmit} />
          {score !== null && <p className='m-4'>Score: {(score / dogs.length * 100).toFixed(2)}%</p>}
        </div>
      </section>
      <section className="w-full p-4 lg:w-1/2">
        <Favorites favorites={favorites} quizSubmitted={quizSubmitted} />
      </section>
      <section className="w-full p-4">
        <Map />
      </section>
    </div>
  );
}

export default DogList;
