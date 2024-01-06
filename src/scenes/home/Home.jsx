//import { useEffect } from 'react'
import MainCarousel from './MainCarousel'
import ShoppingList from './ShoppingList'
import Subscribe from './Subscribe'

const Home = () => {
  // used to give window position for scrolling reference
  // const handleScroll = () => {
  //   const scrollPosition = window.scrollY // => scroll position
  //   console.log(scrollPosition)
  // }
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
    </div>
  )
}

export default Home
