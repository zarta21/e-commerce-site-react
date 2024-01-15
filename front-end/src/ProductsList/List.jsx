import React, { useEffect, useState } from 'react'
import './list.scss'
import { data } from '../../data.js'
import Card from '../Card/Card'

const List = ({ category, filters, sort }) => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (category) {
      setProducts(data?.filter(item => item.subCategory.includes(`${category}`)))
    } else {
      setProducts(data)
    }
    
  }, [category])

  useEffect(() => {
    category && setFilteredProducts(products.filter(item => {
      const categoryMatch = !filters.category || item.category.includes(filters.category)
      const priceMatch = !filters.price || parseFloat(item.price) <= parseFloat(filters.price)
      const colorMatch = !filters.color || item.color.includes(filters.color)

      return categoryMatch && priceMatch && colorMatch
    }))
    
  }, [products, category, filters])

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
            {category 
                ? filteredProducts.map(item => (<Card item={item} key={item.id} />))
                : data?.map(item => <Card item={item} key={item.id}/> )}
        </div>
    </div>
  )
}

export default List