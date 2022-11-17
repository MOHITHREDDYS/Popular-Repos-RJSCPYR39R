import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {filterOption: languageFiltersData[0].id, popularReposList: []}

  componentDidMount() {
    this.getRepos()
  }

  onFetchingSuccess = fetchedRepos => {
    const formattedRepos = fetchedRepos.map(eachRepo => ({
      id: eachRepo.id,
      name: eachRepo.name,
      starsCount: eachRepo.stars_count,
      issuesCount: eachRepo.issues_count,
      forksCount: eachRepo.forks_count,
      avatarUrl: eachRepo.avatar_url,
    }))
    console.log(formattedRepos)

    this.setState({popularReposList: formattedRepos})
  }

  getRepos = async () => {
    const {filterOption} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${filterOption}`

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      this.onFetchingSuccess(data.popular_repos)
    }
  }

  changeLanguage = filterOption => {
    this.setState({filterOption})
  }

  getLanguageRepos = () => {
    const {popularReposList} = this.state
    return (
      <ul>
        {popularReposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  render() {
    const {filterOption} = this.state
    return (
      <div className="background-container">
        <div className="main-container">
          <h1 className="page-heading">Popular</h1>
          <ul className="filter-list-container">
            {languageFiltersData.map(eachFilter => (
              <LanguageFilterItem
                key={eachFilter.id}
                languageDetails={eachFilter}
                changeLanguage={this.changeLanguage}
                filterOption={filterOption}
              />
            ))}
          </ul>
          {this.getLanguageRepos()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
