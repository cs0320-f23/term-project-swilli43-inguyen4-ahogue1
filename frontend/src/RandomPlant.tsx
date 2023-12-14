import React, { useEffect, useState } from "react";
import "./styles/plant.css";
import plant1 from "./assets/plant1.png";
import plant2 from "./assets/plant2.png";
import plant3 from "./assets/plant3.png";
import plant4 from "./assets/plant4.png";
import plant5 from "./assets/plant5.png";
import plant6 from "./assets/plant6.png";
import plant7 from "./assets/plant7.png";

const RandomPlant = () => {
  const [image, setImage] = useState(plant1);

  const getRandomImage = () => {
    const plantArray = [plant1, plant2, plant3, plant4, plant5, plant6, plant7];

    const randomIndex = Math.floor(Math.random() * plantArray.length);

    // Set the image source to the randomly selected image
    setImage(plantArray[randomIndex]);
  };

  useEffect(() => {
    getRandomImage();
  }, []);
  
return (
    <div>
      <img className="plant-image" aria-label="random plant image" src={image} alt="Random Plant Image" />
    </div>
  );
};

export default RandomPlant;
