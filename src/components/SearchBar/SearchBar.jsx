import React, { useEffect, useState } from 'react'
import './searchBar.scss'
import { data } from '../../data'
import Card from '../Card/Card'

const SearchBar = ({ open, setOpen }) => {

    const [query, setQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    // const keys = ['brand', 'subCategory', 'subSubCategory' ]

    useEffect(() => {
        // setFilteredProducts(data.filter(item => keys.some(key => item[key].includes(query)) ))
        setFilteredProducts(data.filter(item => item.brand.toLowerCase().includes(query) || item.subCategory.includes(query) || item.subSubCategory.includes(query)))
    },[query])

  return (
    <div className='search-bar'>
        <div className="wrapper">
            <div className="input">
                <input className='search' type="text" defaultValue={'Type to search...'} onFocus={(e) => e.target.value = ''} onChange={(e) => setQuery(e.target.value.toLowerCase())} style={{ fontSize: "18px"}}/>
                <div className="close-icon" onClick={() => setOpen(!open)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13M13 13L1 1"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
            </div>
            <div className="list">
                {query && filteredProducts?.map(item => (<Card item={item} key={item.id} />))}
            </div>
        </div>
    </div>
  )
}

export default SearchBar