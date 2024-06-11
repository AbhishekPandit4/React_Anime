// CharacterDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/characters/${id}`);
        setCharacter(response.data.data);
      } catch (err) {
        setError("Error fetching character details.");
      }
    };

    fetchCharacter();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!character) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.images.jpg.image_url} alt={`${character.name}`} />
      <p>{character.about}</p>
      <p>{character.url}</p>
    </div>
  );
};

export default CharacterDetail;
