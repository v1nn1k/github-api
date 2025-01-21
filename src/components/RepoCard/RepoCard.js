import React from "react";
import starLogo from '../../assets/images/star-logo.svg';
import forksLogo from '../../assets/images/star-logo.svg';
import watchersLogo from '../../assets/images/star-logo.svg';
import '../RepoCard/RepoCard.css';
import { Link } from "react-router-dom";

function RepoCard({errorMessage, repos}) {
  
  return (
    <div>
      <div className="container">
        <div className="inner">
        {errorMessage ? (
          <p className="error">{errorMessage}</p>
          ) : repos && repos.length > 0 ? repos.map((repo) => (
          <div className="item" key={repo.id}>
            <h3 className="item__title">{repo.name}</h3>
            <p className="item__description">{repo.description}</p>
            <p className="item__language">Language: {repo.language}</p>
            <div className="icons">
              <div className="icon--item"><img className="icon" src={starLogo} alt="star" /><span>{repo.stargazers_count}</span></div>
              <div className="icon--item"><img className="icon" src={forksLogo} alt="forks" /><span>{repo.forks}</span></div>
              <div className="icon--item"><img className="icon" src={watchersLogo} alt="watchers" /><span>{repo.watchers}</span></div>
              </div>
            <a href={repo.clone_url} target="_blank">View on GitHub</a>
            <Link to={`/commits/${repo.full_name}`} className="view-commits-link"><p>View commits</p></Link>
          </div>)) : (<p>No repositories found</p>)}
      </div>
    </div>
  </div>
  )
}

export default RepoCard;