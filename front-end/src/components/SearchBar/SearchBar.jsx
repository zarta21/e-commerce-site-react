import React, { useEffect, useState } from 'react'
import './searchBar.scss'
import Card from '../Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/dataSlice'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

const SearchBar = ({ open, setOpen }) => {

    const [query, setQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    const data = useSelector(state => state.data)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    
    useEffect(() => {
        setFilteredProducts(data?.products?.filter(item => item.brand.toLowerCase().includes(query) || item.subCategory.includes(query) || item.subSubCategory.includes(query)))
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
                {data?.loading 
                    ? (data?.loading && data?.error 
                        ? <Error message="Something went wrong. Try again later" />
                        : <Loader />)
                    : (data?.products && query
                        ? (query && filteredProducts.length > 0
                            ? filteredProducts?.map(item => (<Card item={item} key={item.id} />))
                            : (<div className="not-found">
                                <img src="/icons/man-with-magnifying-glass.png" alt="man-with-magnifying-glass" />                            
                                <span>Nothing was found...</span>
                            </div> )   )
                        : null)
                }
            </div>
        </div>
    </div>
  )
}

export default SearchBar
