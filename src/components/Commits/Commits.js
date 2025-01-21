import React, { useEffect, useState } from "react";
import '../Commits/Commits.css'
import { useParams, useNavigate } from "react-router-dom";
import LucideLogo from '../../assets/images/lucide-logo.svg'

function Commits(){
  
  const { username, repoName }= useParams();
  const [commits, setCommits] = useState([]); 
  const navigate = useNavigate();
  
  useEffect(() => {
   const getCommits = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`);
      if (!response.ok) {
        throw new Error ('Fuck you degan there are not commits') 
      }
      const data = await response.json();
      console.log(data);
      setCommits(data);
    } catch(err) {
      console.error(Error.message);
    }
  };
     getCommits()}
    , [username, repoName])
  
  const backToRepos = () => {
    navigate(`/?query=${username}`);
  }
  
  return (
    <div className="commits">
      <div className="container">
        <button onClick={backToRepos}>Go back</button>
        <div className="commits__inner">
          {commits.map((comm) => (
            <div className="commits__item" key={comm.sha}>
              <p className="item__title">{comm.commit.message}</p>
              <div className="commits__item__inner">
                <div className="commits__item__inner--lucide">
                  <img className="icon" src={LucideLogo} alt="" />
                  <p>{comm.sha.substring(0,7)}</p>
                </div>
              <p>{comm.commit.author.name}</p>
              <p>{new Date(comm.commit.author.date).toLocaleDateString()}</p>
              </div>
              <a href={comm.html_url} target="_blank">View on GitHub</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Commits;

