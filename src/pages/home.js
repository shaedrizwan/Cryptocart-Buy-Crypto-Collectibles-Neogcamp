import "../stylesheets/home.css"
import { Link } from "react-router-dom";
import { useProduct } from "../ProductContext";
import { CategoriesCard, HeroImage, ProductCard } from "../components";
import "../softui.css"

export function Home(){

    const {products} = useProduct();
    return(
        <div className="home-container">
            <HeroImage image="../assets/meebits.jpg" />
            <div className="title-main">Categories</div>
            <div className="categories-container">
                <CategoriesCard title="Art" image="../assets/category-art.png" />
                <CategoriesCard title="Cards" image="../assets/category-card.png" />
                <CategoriesCard title="Sports" image="../assets/category-sports.png" />
            </div>
            <div className="title-main">Products</div>
            <div className="product-grid">
                {!products && <div>Products loading... please wait!</div>}
                {products && products.filter((item,idx)=>idx<4).map(product =>{
                    return <ProductCard product={product} />
                })}
            </div>
            <Link to="/products" className="btn btn-pr" >View All Products</Link>
        </div>
    )
}