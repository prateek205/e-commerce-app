import Hero from "../../component/Hero/Hero"
import ProductSection from "../../component/ProductSection/ProductSection"
import "./Home.css"

const Home = () => {
  return (
    <div className="home_hero">
      <Hero/>      
      <ProductSection/>
    </div>
  )
}

export default Home
