import React from 'react'
import './featuredProducts.scss'
import Card from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/dataSlice'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

const FeaturedProducts = ({ type, attribute }) => {

    const data = useSelector(state => state.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    
  return (
    <div className='featured-products'>
        <div className="wrapper">
            <div className="top">
                <h2>{type}</h2>
            </div>
            <div className="bottom">
                {data.loading 
                    ? (data.loading && data.error
                        ? <Error message="Something went wrong. Try again later" />
                        : <Loader />) 
                    : (!data.loading && data?.products?.length > 0
                        ? (attribute === "isNew" 
                            ? data?.products?.filter(item => item.isNew).slice(3, 7).map(item => (<Card item={item} key={item.id} />))
                            : data?.products?.filter(item => item.oldPrice).slice(10, 14).map(item => (<Card item={item} key={item.id} />)))
                        : <Error message="Looks like the lost connection with the database. Try again later"/>)
                }
            </div>
        </div>
    </div>
  )
}

export default FeaturedProducts
