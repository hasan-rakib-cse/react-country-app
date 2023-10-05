import React, { useEffect, useState } from 'react'

const Search = (props) => {

    const [searchText, setSearchText] = useState("");

    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    useEffect(() => { //we get the value when rendering
        props.onSearch(searchText);
    
    }, [searchText])
    

  return (
    <div className='text-center'>
        <input type='text' placeholder='Search Country' value={searchText} onChange={handleChange} />
    </div>
  )
}

export default Search