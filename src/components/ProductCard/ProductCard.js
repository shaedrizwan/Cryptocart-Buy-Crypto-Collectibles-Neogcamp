import React from 'react'
import { Link } from 'react-router-dom'
import "./ProductCard.css"

function ProductCard({product}) {
    return (
            <Link className="linkTo" key={product._id} to={`/product/${product.slug}`}>
                <div className="product-wrap">
                    <img src={product.image} alt={product.slug} className="product-thumb"/>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">Ξ {product.price}</div>
                    <div className="product-owner">Owner: {product.owner}</div>
                </div>
            </Link>
    )
}

export default ProductCard
