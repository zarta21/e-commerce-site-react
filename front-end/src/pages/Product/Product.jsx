import React, { useEffect, useState } from 'react'
import "./product.scss"
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartReducer'

const Product = () => {

    const location = useLocation()
    const item = location.state

    const dispatch = useDispatch()

    const [selectedImg, setselectedimg] = useState(item?.img)
    const [quantity, setQuantity] = useState(1)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [slidesLenght, setSlidesLenght] = useState(0)
    const [openMaterial, setOpenMaterial] = useState(false)
    const [openDelivery, setOpenDelivery] = useState(false)
    const [selectedSize, setSelectedSize] = useState(null)
    const [viewWidth, setViewWidth] = useState(1)

    useEffect(() => {
        const images = []
        
        for(const property in item) {
            if (property.includes('img')) {
                images.push(property)
            }
        }
        setViewWidth(images.length)
        setSlidesLenght(images.length - 1)
    },[item])

    useEffect(() => {
        const indicator = document.querySelectorAll("[data-indicator]")

        indicator.forEach(item => {
            item.style.setProperty("border", "1px solid grey")
            item.style.setProperty("color", "black")
            item.addEventListener('click', (e) => {
            
            if(e.target.innerText.toLowerCase() === selectedSize) {
                
                    item.style.setProperty("border", "2px solid black")
                    item.style.setProperty("color", "green")
            } 
        })
        })
    }, [selectedSize])
   
  return (
    <div className='product-page'>
        <div className="wrapper">
            <div className="left" style={{ width: `${viewWidth *100}vw` }}>
                <div className="images" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
                    <img src={item?.img} alt={item?.title} onClick={(e) => setselectedimg(item?.img)} loading='lazy' />
                    {item?.img2 && <img src={item?.img2} alt={item?.title} onClick={(e) => setselectedimg(item?.img2)} loading='lazy'/>}
                    {item?.img3 && <img src={item?.img3} alt={item?.title} onClick={(e) => setselectedimg(item?.img3)} loading='lazy'/>}
                    {item?.img4 && <img src={item?.img4} alt={item?.title} onClick={(e) => setselectedimg(item?.img4)} loading='lazy'/>}
                </div>
                <div className="main-image">
                    <img src={selectedImg} alt={item?.title} loading='lazy' />
                </div>
                <div className="buttons" style={{ left: `calc(50%/${viewWidth})`}}>
                    <div className="icon" onClick={() => {setCurrentSlide(currentSlide === 0 ? slidesLenght : (prev) => prev - 1)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/><path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z"/></svg>
                    </div>
                    <div className="icon" onClick={() => {setCurrentSlide(currentSlide === slidesLenght ? 0 : (prev) => prev + 1)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/><path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z"/></svg>
                    </div>
                </div>                
            </div>

            <div className="right">
                <div className="title">
                    <span>{item?.brand}</span>
                    <h3>{item?.title}</h3>
                </div>

                <div className="price">
                    {item?.oldPrice ? (<div className='price-container'><span className='old-price'>€{item.oldPrice}</span><span>€{item?.price}</span></div>) : <span>€{item?.price}</span>}
                </div>

                <div className="size">
                    <span>Size:</span>
                    <div id='size-row' className="size-row">
                        {item?.size.map(elem => (
                            <div className={`size-box ${elem }`} key={elem} data-indicator onClick={() => setSelectedSize(elem)}>
                                <span>{elem}</span>
                            </div>
                        ))}
                    </div>                    
                </div>
                <div className="add-to-cart">
                    <div className="quantity">
                        <button onClick={() => setQuantity(quantity === 1 ? 1 : prev => prev - 1)}>-</button>
                        {quantity}
                        <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                    </div>
                    <div className="add">
                        <button onClick={() => dispatch(addToCart({
                            id: item?.id,
                            img: item?.img,
                            img2: item?.img2,
                            img3: item?.img3,
                            img4: item?.img4,
                            img5: item?.img6,
                            img6: item?.img5,
                            brand: item?.brand,
                            title: item?.title,
                            price: item?.price,
                            oldPrice: item?.oldPrice,
                            size: item?.size,
                            color: item?.color,
                            category: item?.category,
                            subCategory: item?.subCategory,
                            subSubCategory: item?.subSubCategory,
                            quantity

                        }))}>Add to cart</button>
                    </div>
                </div>
                
                <div className="description">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, doloremque accusantium. Et blanditiis numquam a quia animi. Itaque nam ut ab quo culpa, cumque consectetur aut et exercitationem? Expedita, consequatur?
                        Illo impedit quisquam excepturi non, provident eos quam soluta quo molestias nisi vitae voluptate eum consequatur quas dolor explicabo porro aspernatur reiciendis. Est, totam corrupti obcaecati labore necessitatibus dicta harum!
                        Illo animi consequuntur, modi eos quo libero praesentium nostrum veniam, non perspiciatis quibusdam adipisci repellat. Minus maiores dolores iure assumenda tempore, corrupti rem nam, amet architecto ad ducimus accusantium recusandae.
                        Ab deleniti quae iusto molestias quia reiciendis, maiores doloribus quibusdam autem culpa. Veritatis voluptate error consequuntur nisi blanditiis nemo, ipsum quod quas. Neque nihil culpa error vitae consequatur cumque ipsam.
                        Temporibus voluptatum dolores dolore, dicta fuga ad rem adipisci esse autem id laudantium deserunt dignissimos quis odit iure doloremque error, ea cum veniam aut consectetur! Rerum corrupti atque accusamus ipsum!
                    </p>
                </div>

                <div className="info" onClick={() => setOpenMaterial(!openMaterial)}>
                    <div className={`details ${openMaterial ? "open" : ""}`}>
                        <h4>Material</h4>
                        <div className={`icon ${openMaterial ? "hide" : "show"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 128 128"><path d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"/></svg>
                        </div>
                        <div className={`icon ${openMaterial ? "show" : "hide"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128"><path d="M125.61 71.238H2.39A2.39 2.39 0 0 1 0 68.848v-9.787a2.39 2.39 0 0 1 2.39-2.39h123.22a2.39 2.39 0 0 1 2.39 2.39v9.787a2.39 2.39 0 0 1-2.39 2.39z"/></svg>
                        </div>
                    </div>
                    <div className="list">
                        <ul>
                            <li>Lorem ipsim</li>
                            <li>Lorem ipsim</li>
                            <li>Lorem ipsim</li>
                        </ul>
                    </div>
                </div>
                <div className="info" onClick={() => setOpenDelivery(!openDelivery)}>
                    <div className={`details ${openDelivery ? "open" : ""}`}>
                        <h4>Delivery</h4>
                        <div className={`icon ${openDelivery ? "hide" : "show"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 128 128"><path d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133H71.302v49.356c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159V71.214H7.302c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134h49.395V7.306c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127v49.356h49.395A7.276 7.276 0 0 1 128 63.954z"/></svg>
                        </div>
                        <div className={`icon ${openDelivery ? "show" : "hide"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128"><path d="M125.61 71.238H2.39A2.39 2.39 0 0 1 0 68.848v-9.787a2.39 2.39 0 0 1 2.39-2.39h123.22a2.39 2.39 0 0 1 2.39 2.39v9.787a2.39 2.39 0 0 1-2.39 2.39z"/></svg>
                        </div>
                    </div>
                    <div className="list">
                        <ul>
                            <li>Lorem ipsim</li>
                            <li>Lorem ipsim</li>
                            <li>Lorem ipsim</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product
