import React from 'react';
import '../Search/Search.css'

function Input ({inputValue, setInputValue, changeUrl}){
  return (
    <div className="search">
      <div className="container">
        <div className="search__inner">
          <h1 className='search__title'>GitHub Repository Explorer</h1>
          <div className='search__flex'>
            <input type="text" value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Put username here"/>
            <button onClick={changeUrl}>Load Repos</button>
          </div>
        </div>
      </div>
    </div>    
  )}

export default Input;