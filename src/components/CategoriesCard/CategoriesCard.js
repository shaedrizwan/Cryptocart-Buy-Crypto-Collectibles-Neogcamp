import React from 'react'
import "./CategoriesCard.css"

function CategoriesCard({image,title}) {
    return (
        <div className="category">
            <img src={image} className="img-category" alt={title}/>
                <div className="category-title">{title}</div>
        </div>
    )
}

export default CategoriesCard
