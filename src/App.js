import React from 'react';
import { useState } from 'react';
import './App.css';


function App() {
  const [inputValue, setInputValue] = useState("");
  const [repos, setRepos] = useState([]);

  const getRepoByUsername =  () => {
    fetch(`https://api.github.com/users/${inputValue}/repos`, {
      method: "GET",
    headers: {
      Authorization: `forsto`,
      "Content-Type": "application/json",
    },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setRepos(json);
      });}
  
  return (
    <div>
      <div className="input">
        <input type="text" value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Put username here"/>
        <button onClick={getRepoByUsername}>Show repos</button>
      </div>
      <div>
    {repos.map((repo) => (
      <div key={repo.id}>
        <h3>{repo.name}</h3>
        <p>{repo.description}</p>
      </div>
    ))}
  </div>
</div>
  );
}

export default App;
