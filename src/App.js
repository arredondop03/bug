import React, { useState } from 'react';
import axios from 'axios';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import './App.css';
import data from './data';


function App() {
  const [breedImages, setBreedImages] = useState([]);
  const [currentBreed, setCurrentBreed] = useState({});

  const loadBreed = (breedRoute, breedInfo) => {
    try {
      const response = axios.get(`https://dog.ceo/api/breed/${breedRoute}/images`)
      setBreedImages(response.data.message);
      setCurrentBreed(breedInfo);
      
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Doggies</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Breed</th>
            <th>Life Expectancy</th>
            <th>Size</th>
            <th>Popularity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((breed) => (
            <tr key={breed.breedRoute}>
              <td>{breed.breedName}</td>
              <td>{breed.lifeExpectancy}</td>
              <td>{breed.size}</td>
              <td>{breed.popularity}</td>
              <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip>
                            View breed details
                        </Tooltip>
                    }
                    delay={250}
                    placement="left"
                >
                    <Button onClick={loadBreed(breed.breedRoute, breed)}>
                        <i className="fas fa-eye" />
                    </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h1>{currentBreed.breedName}</h1>
      <p>Life Expectancy: {currentBreed.lifeExpectancy}</p>
      <p>Size: {currentBreed.size}</p>
      <p>Popularity: {currentBreed.popularity}</p>
      <p>Temperament: {currentBreed.temperament}</p>
      <p>About:</p>
      <p>{currentBreed.about}</p>

      {breedImages.map((url) => (
        <img key={url} alt="dog" src={url}/>
      ))}
    </div>
  );
}

export default App;
