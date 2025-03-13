import React from 'react'

const Search = () => {
  return (
   <div className="search">
    <div className="searchform">
        <input className='inputform' placeholder='find a user' type="text" />
    </div>

    <div className="userchat">
        <span>Prince</span>
        <p>online</p>

    </div>
   </div>
  )
}

export default Search