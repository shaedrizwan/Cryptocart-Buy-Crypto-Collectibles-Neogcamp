import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import "./SearchBar.css"
import { Link } from 'react-router-dom';
import { useProduct } from '../../ProductContext';

function SearchBar() {

    const [searchText,setSearchText] = useState("")
    const [searchOutput,setSearchOutput] = useState([])

    const {products} = useProduct()

    const searchChangeHandler = (e) =>{
        const searchValue = e.target.value
        setSearchText(searchValue)
        setSearchOutput(products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase())))
    }

    const ClearSearch = () =>{
        setSearchText("")
        setSearchOutput([])
    }

    return (
        <div className="search-bar">
            <div className="search-input">
                <input type="text" value={searchText} onChange={searchChangeHandler} placeholder="Search for product..."/>
                {searchText.length !== 0 ? <CloseIcon className="search-icons" onClick={ClearSearch} />:<SearchIcon className="search-icons"/>}
            </div>
            { searchOutput.length !== 0 && searchText.length !==0 && <div className="search-output">
                {searchOutput.slice(0.10).map(product => <Link key={product._id} className="search-items" onClick={ClearSearch} to={`/product/${product.slug}`}>{product.name}</Link>)}
            </div>}
        </div>
    )
}

export default SearchBar
