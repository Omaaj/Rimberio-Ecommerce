import React, { useEffect, useState } from 'react'
import Slider from '../components/slider/Slider'
import Categories from '../components/categories/Categories'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'
import Helment from '../components/helment/Helment'
import Offers from '../components/timeoffering/offers/Offers'
import FeaturedProducts from '../components/featuredproduct/FeaturedProducts';
import Trending from '../components/trending/Trending'
import TrendingFea from '../components/trending/TrendingFea'
import Clock from '../components/timeoffering/clock/Clock'

export default function Home() {
  return (
    <Helment title={"Home"}>
      <div className='home'>
        <NavBar />
        <Slider/>
        <FeaturedProducts  type="New Arrivals"/>
        <Categories/>
        <Trending type="Trending"/>
        <Offers />
        <TrendingFea type="Featured"/>
        <Footer />
      </div>
    </Helment>
  )
}
