import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import "./App.css";
import { useNavigate } from "react-router-dom";

const CharacterList = () => {
  const [query, setQuery] = useState(""); // State to hold the search query
  const [characters, setCharacters] = useState([]); // State to hold fetched characters
  const [error, setError] = useState(null); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [totalCharacters, setTotalCharacters] = useState(0);
  const naviget = useNavigate();

  // Function to fetch characters from the API
  const fetchCharacters = async (searchQuery = "") => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/characters`, {
        params: {
          page: 1,
          limit: 15,
          q: searchQuery, // Set the q parameter dynamically based on searchQuery
          order_by: "favorites",
          sort: "desc",
        },
      });
      setCharacters(response.data.data);
      setTotalCharacters(response.data.pagination.items.total); // Set characters state with fetched data
      setError(response.data.data.length === 0 ? "No results found." : ""); // Set error message if no results found
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data."); // Set error message if an error occurs during fetching
    }
    setLoading(false); // Set loading to false after fetching completes
  };

  // Effect hook to fetch characters when the component mounts or query changes
  useEffect(() => {
    fetchCharacters(query);
  }, []); // Re-run effect when query changes

  // Function to handle search form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchCharacters(query); // Fetch characters with current query
  };

  const handleNaviget = (id) => {
    naviget(`/character/${id}`);
  };

  // JSX rendering
  return (
    <div className="centered-page">
      <div className="search-bar">
        <Form>
          <Form.Group className="mb-3" controlId="formGroupSearch">
            <Form.Control
              type="text"
              placeholder="Search"
              value={query}
              style={{ margin: 20, width: 200 }}
              onChange={(e) => setQuery(e.target.value)} // Update query state as user types
            />
          </Form.Group>
        </Form>
        <Button variant="success" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {!totalCharacters ? (
        <p>Total 0 Matching Anime Charater Found</p>
      ) : (
        <p>Total <b>{totalCharacters}</b> Matching Anime Charater Found</p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          <ul>
            {characters.map((character) => (
              <div className="card-container" key={character.mal_id}>
                <div className="centered-card">
                  <div className="card-content">
                    <img
                      src={character.images.jpg.image_url}
                      alt={`${character.name}'s image`}
                      className="character-image"
                    />
                    <div className="character-info">
                      <span>{character.name}</span>
                      <span>{character.nicknames.join(", ")}</span>
                    </div>
                    <button
                      className="arrow-button"
                      onClick={() => handleNaviget(character.mal_id)}
                    >
                      <FaArrowRight className="arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CharacterList;
