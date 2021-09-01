import "../stylesheets/home.css"
import { Link } from "react-router-dom";
import { useProduct } from "../ProductContext";
import { CategoriesCard, HeroImage, ProductCard } from "../components";
import "../softui.css"
import BlockLoading from "react-loadingg/lib/BlockLoading";

export function Home(){

    const {products} = useProduct();
    return(
        <div className="home-container">
            <HeroImage image="../assets/meebits.jpg" />
            <div className="title-main">Categories</div>
            <div className="categories-container">
                <CategoriesCard title="Art" category="art" image="../assets/category-art.png" />
                <CategoriesCard title="Cards" category="cards" image="../assets/category-card.png" />
                <CategoriesCard title="Sports" category="sports" image="../assets/category-sports.png" />
            </div>
            <div className="title-main">Products</div>
            <div className="product-grid">
                {!products && <BlockLoading/>}
                {products && products.filter((item,idx)=>idx<4).map(product =>{
                    return <ProductCard product={product} />
                })}
            </div>
            <Link to="/products" className="btn btn-pr" >View All Products</Link>
        </div>
    )
}