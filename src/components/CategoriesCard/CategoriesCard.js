import React from 'react'
import { Link } from 'react-router-dom'
import "./CategoriesCard.css"

function CategoriesCard({image,title,category}) {
    return (
        <Link to={`/category/${category}`} className="category">
            <img src={image} className="img-category" alt={title}/>
                <div className="category-title">{title}</div>
        </Link>
    )
}

export default CategoriesCard
