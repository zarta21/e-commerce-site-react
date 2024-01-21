import React from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decreaseQuantity, increaseQuantity, removeItem } from '../../redux/cartReducer'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Cart = ({ open, setOpen }) => {


    const products = useSelector(state => state.cart.products)
    const dispatch = useDispatch()

    const totalPrice = () => {
        let total = 0

        products.forEach(element => (total += element.quantity * element.price));
        return total.toFixed(2)
    }

    const handleClick = (e) => {
        if(e.target.classList.contains("cart")) {
            console.log(e.target.classList)
        }
    }

    const makePayment = () => {
        axios.post("http://localhost:5500/api/checkout/create-checkout-session", {
            products
        }).then(res => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch(error => console.log(error.message))
    }

    
  return (
    <div className='cart' onClick={handleClick}>
        <div className="wrapper">
            <div className="title">
                <h3>Products in your cart</h3>
                <div className="close-icon" onClick={() => setOpen(!open)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13M13 13L1 1" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
            </div>
            {products?.length === 0 
                ? <div className="empty-cart"><span>Cart is empty</span><div className="icon"><img src="/icons/empty-cart.png" alt="empty cart" /></div></div>
                : products?.map(item => (
                <div className="item" key={item.id}>
                    <Link to={`/product/${item.id}`} state={{...item}} >
                        <img src={item.img} alt={item.title} />
                    </Link>
                    <div className="details">
                        <span>{item.brand}</span>
                        <h4>{item.title}</h4>
                        <div className="price-container">
                            <div className="price">
                                {item.oldPrice && <span className='old-price'>€{item.oldPrice}</span>}
                                <span>€{item.price}</span>
                            </div>
                            <div className="quantity">
                                <button onClick={() => dispatch(decreaseQuantity(item))} >-</button>
                                {item.quantity}
                                <button onClick={() => dispatch(increaseQuantity(item))}>+</button>
                            </div>
                        </div>
                        
                        <div className="delete-icon" onClick={() => dispatch(removeItem(item.id))}>
                            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3L1 3M5.00024 6V10M8.00024 6V10M11.0002 3V12.5C11.0002 12.6326 10.9476 12.7598 10.8538 12.8536C10.76 12.9473 10.6329 13 10.5002 13H2.50024C2.36764 13 2.24046 12.9473 2.14669 12.8536C2.05292 12.7598 2.00024 12.6326 2.00024 12.5V3M9.00025 3V2C9.00025 1.73478 8.89489 1.48043 8.70735 1.29289C8.51982 1.10536 8.26546 1 8.00024 1H5.00024C4.73503 1 4.48067 1.10536 4.29314 1.29289C4.1056 1.48043 4.00024 1.73478 4.00024 2V3" stroke="#E93636" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </div>
                    </div>
                </div>
            ))}
            <div className="total">
                <span>Total</span>
                <span>€{totalPrice()}</span>
            </div>
            <div className="buttons">
                <button className='checkout-btn' onClick={makePayment}>checkout</button>
                <button className='clear-btn' onClick={() => dispatch(clearCart())}>clear cart</button>
            </div>
        </div>
    </div>
  )
}

export default Cart
