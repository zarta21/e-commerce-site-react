import React from 'react'
import './featuredProducts.scss'
import Card from '../Card/Card'
import { data } from "../../data"

const FeaturedProducts = ({ type, attribute }) => {

    // const data = [
    //     {
    //         id: 1,
    //         img: "https://shop.zalgiris.lt/cdn/shop/files/skydo_640x_crop_center.jpg?v=1696327297",
    //         img2: "https://shop.zalgiris.lt/cdn/shop/files/namu_a270a3fe-378a-4f9f-99c8-f8d02c872e72_640x_crop_center.jpg?v=1696327365",
    //         title: "Juodi marškinėliai „Skydas“",
    //         isNew: true,
    //         oldPrice: 23.00,
    //         price: 23.00
    //     },
    //     {
    //         id: 2,
    //         img: "https://shop.zalgiris.lt/cdn/shop/files/Tams_640x_crop_center.jpg?v=1693561695",
    //         img2: "https://shop.zalgiris.lt/cdn/shop/files/tamsus_640x_crop_center.jpg?v=1693561697",
    //         title: "Tamsiai žali marškinėliai „Skydas“",
    //         isNew: true,
    //         oldPrice: 23.00,
    //         price: 23.00
    //     },
    //     {
    //         id: 3,
    //         img: "https://shop.zalgiris.lt/cdn/shop/files/baltoskojines_640x_crop_center.jpg?v=1693915881",
    //         img2: "https://shop.zalgiris.lt/cdn/shop/files/baltosdetails_640x_crop_center.jpg?v=1693915880",
    //         title: "Baltos kojinės „Žalgiris“",
    //         isNew: true,
    //         oldPrice: 13.00,
    //         price: 13.00
    //     },
    //     {
    //         id: 4,
    //         img: "https://img01.ztat.net/article/spp-media-p1/6e6f9aa504314d99acab97396877a291/49ecbe7d4f2f4339ae4586d6da5f5dea.jpg?imwidth=762",
    //         img2: "https://img01.ztat.net/article/spp-media-p1/fa4d6d87c55f41aa8dab4c8e52851497/e56e634f5cae4f99af6c7613aae60f12.jpg?imwidth=400",
    //         title: "LONG SLEEVE SPORT - Shirt",
    //         isNew: false,
    //         oldPrice: 135.00,
    //         price: 81.00
    //     },
    // ]
    
  return (
    <div className='featured-products'>
        <div className="wrapper">
            <div className="top">
                <h2>{type}</h2>
            </div>
            <div className="bottom">
                {attribute === "isNew" 
                    ? data?.filter(item => item.isNew).slice(3, 7).map(item => (<Card item={item} key={item.id} />))
                    : data?.filter(item => item.oldPrice).slice(10, 14).map(item => (<Card item={item} key={item.id} />))
                }
            </div>
        </div>
    </div>
  )
}

export default FeaturedProducts