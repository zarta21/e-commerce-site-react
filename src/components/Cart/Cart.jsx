import React from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decreaseQuantity, increaseQuantity, removeItem } from '../../redux/cartReducer'
import { Link } from 'react-router-dom'


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

    // const data = [
    //     {
    //         id: 1,
    //         img: "https://img01.ztat.net/article/spp-media-p1/0af71cf7bec54d929fe16147551a8673/54a5bd9d86f445f692a79ffc5954c28a.jpg?imwidth=1800",
    //         img2: "https://img01.ztat.net/article/spp-media-p1/324b55d63631490dae2111fc969a75d9/270cb9dea3394268ae1fd3f227006587.jpg?imwidth=1800",
    //         title: "ESSENTIALS 3STRIPES - Tracksuit bottoms",
    //         desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem explicabo rerum ab ratione repudiandae quis laboriosam. Maxime molestias mollitia repudiandae!",
    //         isNew: true,
    //         oldPrice: 37.95,
    //         price: 19.95,
    //         quantity: 1
    //     },
    //     {
    //         id: 2,
    //         img: "https://img01.ztat.net/article/spp-media-p1/3ff8b4e109563d26a3789e6457cd5b79/e4326574d9b24d87a76d47e9aedb3058.jpg?imwidth=1800",
    //         img2: "https://img01.ztat.net/article/spp-media-p1/afa7e003124938d5a8aff3b5bbf96f9e/6236b667c6cf4714b2575ae1103674b4.jpg?imwidth=1800",
    //         title: "ORIGINAL SLIM FIT - Long sleeved top",
    //         desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem explicabo rerum ab ratione repudiandae quis laboriosam. Maxime molestias mollitia repudiandae!",
    //         isNew: true,
    //         oldPrice: 30.99,
    //         price: 25.00,
    //         quantity: 1
    //     },
    //     {
    //         id: 3,
    //         img: "https://img01.ztat.net/article/spp-media-p1/90b82d5578c831c999af4b9cd6c6e652/14590978bc22491ab8cd642faf818654.jpg?imwidth=1800",
    //         img2: "https://img01.ztat.net/article/spp-media-p1/eae7d1db02d0356db1b8f17c6bab88e9/f03130fe95d94e2dbc2361db7a4aa1c8.jpg?imwidth=1800",
    //         title: "Jumper",
    //         desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem explicabo rerum ab ratione repudiandae quis laboriosam. Maxime molestias mollitia repudiandae!",
    //         isNew: true,
    //         oldPrice: 27.99,
    //         price: 17.00,
    //         quantity: 1
    //     },
    //     {
    //         id: 4,
    //         img: "https://img01.ztat.net/article/spp-media-p1/6e6f9aa504314d99acab97396877a291/49ecbe7d4f2f4339ae4586d6da5f5dea.jpg?imwidth=762",
    //         img2: "https://img01.ztat.net/article/spp-media-p1/fa4d6d87c55f41aa8dab4c8e52851497/e56e634f5cae4f99af6c7613aae60f12.jpg?imwidth=400",
    //         title: "LONG SLEEVE SPORT - Shirt",
    //         desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem explicabo rerum ab ratione repudiandae quis laboriosam. Maxime molestias mollitia repudiandae!",
    //         isNew: false,
    //         oldPrice: 135.00,
    //         price: 81.00,
    //         quantity: 1
    //     },
    // ]
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
                <button className='checkout-btn'>checkout</button>
                <button className='clear-btn' onClick={() => dispatch(clearCart())}>clear cart</button>
            </div>
        </div>
    </div>
  )
}

export default Cart