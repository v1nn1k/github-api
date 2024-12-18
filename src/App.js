import React from 'react';
import { useState, useEffect} from 'react';
import './App.css';


function App() {
  const [inputValue, setInputValue] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const usernameFromURL = params.get('query'); 
    return usernameFromURL || '';
  })
  const [repos, setRepos] = useState([]);
  const [errorMessage, setError] = useState(null);

  const getRepoByUsername =  (username = inputValue) => {
    if (!username.trim()) {
      setError("Please enter a username");
      setRepos([]);
      return;
    }
    setError(null);
    fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
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
      setError(error.message);
    })
  }
      
    const changeUrl = () => {
      const params = new URLSearchParams(window.location.search);
      params.set('query', inputValue);
      window.history.replaceState(null, '', `?${params.toString()}`);
      getRepoByUsername();
    }
    
    useEffect(() => {
        getRepoByUsername(inputValue);
    }, [inputValue]);
  
  return (
    <div className="container">
      <h1>GitHub Repository Explorer</h1>
      <div>
        <input type="text" value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Put username here"/>
        <button onClick={changeUrl} className='load-button'>Load Repos</button>
      <div className="main">
      {errorMessage ? (
        <p>{errorMessage}</p>
        ) :       repos.map((repo) => (
          <div className='repos' key={repo.id}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <p>Language: {repo.language}</p>
            <a href={repo.clone_url}>View on GitHub</a>
          </div>
      ))}
      </div>
    </div>
  </div>
  );
}

export default App;