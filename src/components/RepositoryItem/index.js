// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, starsCount, issuesCount, forksCount, avatarUrl} = repoDetails

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="repo-avatar-image" />
      <h1 className="repo-name">{name}</h1>
      <div className="icon-and-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-icon"
        />
        <p className="count-text">{starsCount} stars</p>
      </div>
      <div className="icon-and-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-icon"
        />
        <p className="count-text">{forksCount} forks</p>
      </div>
      <div className="icon-and-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-icon"
        />
        <p className="count-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
