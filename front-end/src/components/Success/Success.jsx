import React, { useEffect } from 'react'
import './success.scss'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../redux/cartReducer'

const Success = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearCart())
    }, [])

  return (
    <div className='success'>
        <div className="wrapper">
            <div className="checkmark-container">
                <i className='checkmark'>✓</i>
            </div>
            <h1>Success</h1>
            <span>We received your purchase request.</span>
            <span>We'll be in touch shortly!</span>
        </div>
    </div>
  )
}

export default Success
