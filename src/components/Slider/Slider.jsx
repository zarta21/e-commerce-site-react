import React, { useState } from 'react'
import "./slider.scss"

const Slider = () => {

    const [currentSlide, setCurrentSlide] = useState(0)

    const data = [
        "https://img01.ztat.net/cnt/contentful-apps/uploads/1ec762d1-d486-4db8-9d97-5e0b02974b86.jpeg?imwidth=1920",
        "https://img01.ztat.net/banner/58f4474abbf449dda861bc2a4236b63f/7b9a41981e754e1ab952c72465a50b13.jpg?imwidth=1200",
        "https://img01.ztat.net/banner/11e80130e4a04e449d3b66eec1c4d554/50c423c2135642efbb71475f0a4143be.jpg?imwidth=1200"
    ]

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1)
    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1)
    }

  return (
    <div className='slider'>
        <div className="img-container" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
            <img src={data[0]} alt="" />
            <img src={data[1]} alt="" />
            <img src={data[2]} alt="" />
        </div>
        <div className="header">
            <span>find your style</span>
        </div>
        <div className="buttons">
            <div className="icon" onClick={prevSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/><path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z"/></svg>
            </div>
            <div className="icon" onClick={nextSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/><path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z"/></svg>
            </div>
        </div>
    </div>
  )
}

export default Slider