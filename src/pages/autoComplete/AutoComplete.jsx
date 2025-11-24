import React from 'react'
import "./AutoComplete.css"
import { useAutoComplete } from './useAutoComplete';
const AutoComplete = () => {
  var {searchText, setSearchText, suggestions, isLoading} = useAutoComplete()
  return (
    <div className='autocomplete'>
      <div className='search-holder'>
        <input type='text' className='search-input' placeholder='Search Here...' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/> 
        <div className='suggestion-list-holder'>
          {suggestions.length>0 && <ul className='suggestions-list'>
            {
              suggestions.map(({word}, index)=>{
                return <li key={index} className='suggestion-item'>{word}</li>
              })
            }
          </ul>}
        </div>
      </div>

    </div>
  )
}

export default AutoComplete