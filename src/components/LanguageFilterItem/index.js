// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, changeLanguage, filterOption} = props
  const {language, id} = languageDetails

  const onClickingLanguage = () => {
    changeLanguage(id)
  }

  const filterButtonColor = filterOption === id ? 'active-filter-button' : ''

  return (
    <li>
      <button
        type="button"
        className={`${filterButtonColor} language-button`}
        onClick={onClickingLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
