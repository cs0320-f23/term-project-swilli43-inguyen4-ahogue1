import React, { useEffect, useState } from "react";
import "./styles/plant.css";
import plant1 from "./assets/plant1.png";
import plant2 from "./assets/plant2.png";

const RandomPlant = () => {
  const [image, setImage] = useState(plant1);

  const getRandomImage = () => {
    const plantArray = [plant1, plant2];

    const randomIndex = Math.floor(Math.random() * plantArray.length);

    // Set the image source to the randomly selected image
    setImage(plantArray[randomIndex]);
  };

  useEffect(() => {
    getRandomImage();
  }, []);
  
return (
    <div>
      <img className="plant-image" src={image} alt="Random Image" />
    </div>
  );
};

export default RandomPlant;
