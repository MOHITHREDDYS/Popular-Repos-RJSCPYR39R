import {Component} from 'react'
import Loader from 'react-loader-spinner'
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
const apiStatusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    filterOption: languageFiltersData[0].id,
    popularReposList: [],
    apiStatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getRepositoryList()
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

    this.setState({
      popularReposList: formattedRepos,
      apiStatus: apiStatusList.success,
    })
  }

  getRepositoryList = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const {filterOption} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${filterOption}`

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      this.onFetchingSuccess(data.popular_repos)
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  changeLanguage = filterOption => {
    this.setState({filterOption}, this.getRepositoryList)
  }

  getSuccessView = () => {
    const {popularReposList} = this.state
    return (
      <ul className="repository-list-container">
        {popularReposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  getFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  getLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getResultPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.success:
        return this.getSuccessView()
      case apiStatusList.failure:
        return this.getFailureView()
      case apiStatusList.loading:
        return this.getLoadingView()
      default:
        return null
    }
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
          {this.getResultPage()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
