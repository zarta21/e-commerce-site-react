import React, { useState } from 'react'
import './products.scss'
import List from '../../components/ProductsList/List.jsx'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/dataSlice.js'
import Loader from '../../components/Loader/Loader.jsx'
import Error from '../../components/Error/Error.jsx'

const Products = () => {

    const [isOpen, setIsopen] = useState(false)
    const [filters, setFilters] = useState([])
    const [maxPrice, setMaxPrice] = useState(200)
    const [minPrice, setMinPrice] = useState(0)
    const [value, setValue] = useState(maxPrice)
    const [color, setColor] = useState("black")
    const [sort, setSort] = useState("Newest")
    const category = useLocation().pathname.split('/')[2]

    const data = useSelector(state => state.data)
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

     useEffect(() => {
        if (data.products.length > 0) {
            setMaxPrice(Math.max(...data.products.filter(item => item.subCategory.includes(`${category}`)).map(product => product.price)))
            setMinPrice(Math.min(...data.products.filter(item => item.subCategory.includes(`${category}`)).map(product => product.price)))
        }       
    }, [category])
    

    const categoryDataForFilterBox = () => {

        let t
        const arr = data?.products?.map(item => item.category)
        const categoryArr = []

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > 1) {
                categoryArr.push(arr[i].slice(0, 1))
            } else {
                categoryArr.push(arr[i])
            }
        }

        return categoryArr.filter(( t={}, a => !(t[a] = a in t)))
    }
    

    const colorDataForDropdown = () => {

        let t
        const arr = data?.products?.map(item => item.color)
        const colorsArr = []
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > 1) {
                colorsArr.push(arr[i].slice(0, 1))
            } else {
                colorsArr.push(arr[i])
            }
        }

        return colorsArr.filter(( t={}, a => !(t[a] = a in t)))
    }
    

    const resetDropdownMenu = () => {
        const menu = document.querySelectorAll('select')
        menu.forEach(item => {item.selectedIndex = 0})
    }
    

    const handleFilters = (name) => (e) => {
        const value = e.target.value        
        setFilters({...filters, [name]: value}) 
        
        switch (name) {
            case "price":
                setValue(value);
                break;
            case "color":                
                if (value !== "white" || value !== 'multicolor') {
                    setColor(value)
                } else {
                    setColor("black")
                }
                break;
            case 'category':
                break;
            case "clear":
                default:
                    setFilters([])
                    setValue(maxPrice)
                    setColor("black")
                    resetDropdownMenu()
                    document.querySelectorAll('input[type="radio"]').forEach(item => {
                        item.checked = false
                        if (item.value === "") {
                            item.checked = true
                        }
                    })
        }           
    }

    const Style = {
        textTransform: "capitalize",
        color: `${color}`
    }

  return (
    <div className='products'>
        <div className="wrapper">
            <div className="left">
                {data.loading  
                    ? (data.loading && data.error
                        ? <Error message="Something went wrong. Try again later" />
                        : <Loader />)
                    : !data.loading && data?.products?.length > 0
                        ? (<div className="filters" >
                            <div className="title" onClick={() => setIsopen(!isOpen)}>
                                <div className="title-container">
                                    <svg viewBox="0 0 24 24" fit="" height="26" width="26" preserveAspectRatio="xMidYMid meet" focusable="false">
                                        <path d="M8.5 17h-5c-.28 0-.5.22-.5.5s.22.5.5.5h5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zm12 0h-6c-.28 0-.5.22-.5.5s.22.5.5.5h6c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zM8.49 8.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM11.5 7h9c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-9c-.28 0-.5.22-.5.5s.22.5.5.5zm-8 0h2c.28 0 .5-.22.5-.5S5.78 6 5.5 6h-2c-.28 0-.5.22-.5.5s.22.5.5.5zm12.01 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2a2 2 0 002 2zm0-3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .44-1 1-1zm-4.01 4.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-8-6h9c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-9c-.28 0-.5.22-.5.5s.22.5.5.5zm17-1h-2c-.28 0-.5.22-.5.5s.22.5.5.5h2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5z" fill="currentColor"></path>
                                    </svg>
                                    <h4>Filters</h4>
                                </div>                                                                
                                <div className={`icon ${isOpen ? "hide" : "show"}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 128 128"><path d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"/></svg>
                                </div>
                                <div className={`icon ${isOpen ? "show" : "hide"}`} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128"><path d="M125.61 71.238H2.39A2.39 2.39 0 0 1 0 68.848v-9.787a2.39 2.39 0 0 1 2.39-2.39h123.22a2.39 2.39 0 0 1 2.39 2.39v9.787a2.39 2.39 0 0 1-2.39 2.39z"/></svg>
                                </div>
                            </div>
                            <div className={`filters-container ${isOpen ? "open" : ""}`}>
                                <div className='filter'>
                                    <h5>Category</h5>
                                    <div className="input category">                                
                                        <label >
                                            All
                                            <input type="radio" value='' name='category' onChange={handleFilters("category")} defaultChecked/>
                                            <span className='checkmark'></span>
                                        </label>
                                        {categoryDataForFilterBox().map(item => (
                                            <label key={item}>
                                                {item}
                                                <input type="radio" value={item} name='category' onChange={handleFilters("category")} />
                                                <span className='checkmark'></span>
                                            </label>
                                    ))}
                                    </div>
                                </div>
                                <div className='filter'>
                                    <h5>Price</h5>
                                    <div className="input price">
                                        <span>{minPrice}</span>
                                        <input type="range" min={minPrice} max={maxPrice} value={value} onChange={handleFilters("price")} />
                                        <span>{maxPrice}</span>
                                    </div>
                                </div>
                                <div className='filter'>
                                    <h5>Color</h5>
                                    <div className="select">
                                        <select defaultValue={"Color"} style={Style} name="color" onClick={handleFilters("color")}>
                                            <option value="" >All</option>
                                            {colorDataForDropdown().map(item => (
                                                <option value={item} key={item} name="color" style={{ color: "black" }}>{item}</option>
                                            ))}
                                        </select>
                                    </div>                            
                                </div>
                                <div className="filter">
                                    <h5>Sort</h5>
                                    <div className="select">
                                        <select defaultValue={"asc"} onClick={(e) => setSort(e.target.value)}>
                                            <option value={"asc"} >Price Increasing</option>
                                            <option value={"desc"} >Price Decreasing</option>
                                        </select>
                                    </div>      
                                </div>
                                <div className="clear-btn">
                                    <button onClick={handleFilters("clear")}>Clear filters</button>
                                </div>
                            </div>
                            
                        </div>)
                        : null
                }
            </div>
            <div className="right">
                <div className="category">
                    <img className="category-img" src={`/images/${category}.png`} alt="product"  />
                    <div className="category-title"><span>{category}</span></div>
                </div>
                <List category={category} filters={filters} sort={sort} />
            </div>
        </div>
    </div>
  )
}

export default Products
