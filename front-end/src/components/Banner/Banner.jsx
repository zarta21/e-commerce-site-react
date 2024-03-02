import React from 'react'
import './banner.scss'
import { Link } from 'react-router-dom'

const Banner = ({ text, bgColor, category }) => {
  return (
    <div className='banner' style={{ backgroundColor: `${bgColor}`}}>
        <div className="wrapper">
            <div className="right">
                <div className="title">
                    <h4>{text?.title}</h4>
                    <span>{text?.text}</span>
                </div>
                <div className="link">
                    <Link to={`/products/${category}`}>
                        <span className='text'>Discower now</span>
                        <span className='icon-arrow'>
                            <svg viewBox="0 0 26 26" width="1em" height="1em" fill="currentColor" focusable="false"><path d="M.443 12c0 .414.336.75.75.75h20.869l-7.72 7.72a.75.75 0 0 0 1.06 1.06l7.94-7.94a2.252 2.252 0 0 0 0-3.18l-7.94-7.94a.75.75 0 0 0-1.06 1.06l7.72 7.72H1.192a.75.75 0 0 0-.75.75z"></path></svg>
                        </span>
                    </Link> 
                </div>
            </div>
            <div className="left">
                <Link to={`/products/${category}`}>
                    <img src={text?.img} alt="accessories" loading='lazy' />
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default Banner
