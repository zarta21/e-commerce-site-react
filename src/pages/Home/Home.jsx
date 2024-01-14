import React from 'react'
import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Banner from '../../components/Banner/Banner'

const Home = () => {

  const accessoriesText = {
    title: 'All eyes on the details',
    text: 'Fun accessories to update your outfit',
    img: 'https://img01.ztat.net/banner/4ed4da29c40e4a9fab0ed989e5b52fe9/889bac57177648c79a866cec0a51e64e.jpg?imwidth=1200'
  }

  const clothingText = {
    title: 'The Checklist',
    text: 'Invest in your modern capsule wardrobe',
    img: 'https://img01.ztat.net/banner/dadd4bd9c49d45ea8f6554e34036fbb5/0289eae89f32433698cfc8384e7dde55.jpg?imwidth=1200'
  }

  return (
    <div className='home'>
      <Slider />
      <FeaturedProducts type="new products" attribute="isNew"/>
      <Banner text={accessoriesText} bgColor="#000" category="accessories"/>
      <FeaturedProducts type="Sale" attribute="oldPrice"/>
      <Banner text={clothingText} bgColor="green" category="clothing"/>
    </div>
  )
}

export default Home