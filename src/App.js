import React from 'react';
import { useState, useEffect} from 'react';
import './App.css';
import './styles/reset.css';
import Input from './components/Search/Search';
import RepoCard from './components/RepoCard/RepoCard';
import Commits from './components/Commits/Commits';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



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
        console.log(json);
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
    <>
    <Router>
      <Routes>
        <Route path='/' 
        element={
        <><Input
          inputValue={inputValue}
          setInputValue={setInputValue}
          changeUrl={changeUrl}
        />
        <RepoCard 
          errorMessage={errorMessage}
          repos={repos}
        />
        </>}
        />
        <Route path="/commits/:username/:repoName"
        element={
          <Commits
          />}
        />
        </Routes>
      </Router>
  </>
  );
}

export default App;