// Write your code here

import './index.css'

const RepositoryItem = props =>{
    const {repoDetails} = props
    const {name, starsCount, issuesCount, forksCount, avatarUrl} = repoDetails

    return (
        <li>
            <img src={avatarUrl} alt={name} className="repo-avatar-image"/>
            <p className="repo-name">{name</p>
        </li>
    )
}