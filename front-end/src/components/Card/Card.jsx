import React from 'react'
import "./card.scss"
import { Link } from 'react-router-dom'

const Card = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`} state={{...item}}>
        <div className="card">
            <div className="image">
                {item?.isNew && !item?.oldPrice
                    ? <span className='new'>new</span>
                    : <span className='sale'>Sale %</span>
                }
                <img src={item?.img} alt="" className="main-image" loading='lazy' />
                {item.img2 && <img src={item?.img2} alt="" className="second-image" loading='lazy' />}
            </div>
            <div className="info">
                <div className="title">
                    <span>{item?.brand}</span>
                    <h5>{item?.title}</h5>
                </div>
                <div className="prices">
                    {item?.oldPrice ? (<div className='price-container'><span className='old-price'>€{item.oldPrice}</span><span>€{item?.price}</span></div>) : (<span>€{item?.price}</span>)}
                </div>
            </div>

        </div>
    </Link>
  )
}

export default Card
