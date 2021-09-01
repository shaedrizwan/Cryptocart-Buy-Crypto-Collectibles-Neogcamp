import "../stylesheets/products.css"
import {useReducer} from "react"
import { useProduct } from "../ProductContext"
import { ProductCard } from "../components";
import BlockLoading from "react-loadingg/lib/BlockLoading";

export function Products(){

    const {products} = useProduct();
    let data;
    if(products){
        data = products.slice()
    }

    function getSortedData(state, action) {
    if (action.type === "PRICE_HIGH_TO_LOW") {
        return state = action.type
    }

    if (action.type === "PRICE_LOW_TO_HIGH") {
        return state = action.type
    }
    return state;
  }

  const sortingFunction = (products,sortBy) =>{
      if(sortBy && sortBy === "PRICE_LOW_TO_HIGH"){
          return products.sort((a,b)=>a["price"] - b["price"])
      }
      if(sortBy && sortBy === "PRICE_HIGH_TO_LOW"){
        return products.sort((a,b)=>b["price"] - a["price"])
    }
    return products
  }

  const [sortState,sortDispatch] = useReducer(getSortedData,null);

  const sortedProducts = sortingFunction(data,sortState)


    return (
        <div className="products-main">
            <div className="filter-container">
                <h3 style={{padding:"1rem"}}>Sort by Price</h3>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        onClick={() =>
                        sortDispatch({ type: "PRICE_HIGH_TO_LOW" })
                        }
                        >
                    </input>{" "}
                    Price - High to Low
                </label>

                <label>
                    <input
                        type="radio"
                        name="sort"
                        onClick={() =>
                        sortDispatch({ type:"PRICE_LOW_TO_HIGH" })
                        }
                        >
                    </input>{" "}
                    Price - Low to High
                </label>

            </div>
            <div className="prod-grid">
                {!sortedProducts && <BlockLoading/>}
                {sortedProducts && sortedProducts.map(product =>{
                    return <ProductCard product={product}/>
                })}
            </div>
        </div>
    )
}