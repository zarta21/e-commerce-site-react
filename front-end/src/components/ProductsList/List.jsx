import React, { useEffect, useState } from 'react'
import './list.scss'
import Card from '../Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/dataSlice'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

const List = ({ category, filters, sort }) => {

  const [filteredProducts, setFilteredProducts] = useState([])

  const data = useSelector(state => state.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())    
  }, [])

  useEffect(() => {
    data?.products && category && setFilteredProducts(data?.products?.filter(item => item.subCategory.includes(`${category}`)).filter(item => {
      const categoryMatch = !filters.category || item.category.includes(filters.category)
      const priceMatch = !filters.price || parseFloat(item.price) <= parseFloat(filters.price)
      const colorMatch = !filters.color || item.color.includes(filters.color)
      
      return categoryMatch && priceMatch && colorMatch
    }))
    
  }, [category, filters])

  useEffect(() => {
    if(sort === "asc") {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else if (sort === "desc") {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
    
  }, [sort])

  return (
    <div className='products-list'>
        <div className="wrapper">
            {data?.loading 
            ? (data?.loading && data?.error
                ? <Error message="Something went wrong. Try again later" />
                : <Loader />) 
            : (!data.loading && data?.products?.length > 0
              ? (category
                  ? filteredProducts.map(item => (<Card item={item} key={item.id} />))
                  : data?.products?.filter(item => item.subCategory.includes(`${category}`)).map(item => <Card item={item} key={item.id}/> ))
              : <Error message="Looks like the lost connection with the database. Try again later"/>)
            }
        </div>
    </div>
  )
}

export default List
