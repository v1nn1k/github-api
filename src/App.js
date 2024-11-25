import React from 'react';
import { useState } from 'react';
import './App.css';


function App() {
  const [inputValue, setInputValue] = useState("");
  const [repos, setRepos] = useState([]);
  const [errorMessage, setError] = useState(null);

  const getRepoByUsername =  () => {
    if (!inputValue.trim()) {
      setError("Please enter a username");
      setRepos([]);
      return;
    }
    setError(null);
    fetch(`https://api.github.com/users/${inputValue}/repos`, {
    headers: {
      Authorization: `forsto`,
      "Content-Type": "application/json",
    },
    })
      .then((response) => {
        if(!response.ok) {
          setRepos([]);
          throw new Error ('User not found');
        }
          return response.json();
    })
      .then((json) => {
        setRepos(json);
      })
    .catch((error) => {
      setError(error.message)
    })}
      
  
  return (
    <div>
      <h1>GitHub Repository Explorer</h1>
      <div>
        <input type="text" value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Put username here"/>
        <button onClick={getRepoByUsername}>Show repos</button>
      </div>
      <div >
      {errorMessage ? (
        <p>{errorMessage}</p>
        ) :       repos.map((repo) => (
          <div className='repos' key={repo.id}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
          </div>
      ))}
  </div>
  </div>
  );
}

export default App;
