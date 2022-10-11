import './filter.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {sortTimeUp, sortTimeDown, sortPriceUp, sortPriceDown} from '../../actions/api';

const Filter = ({ sort, category, setCategory, setQuery, refreshShop }) => {
    const categories = useSelector( state => state.categories )
    const dispatch = useDispatch()
    
    const [search, setSearch] = useState("")

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if(search.length > 0) {
            setQuery(search)
            setSearch("")
        } else {
            refreshShop()
        }
    }

    const listColorItem = (color) => ({
        width: "25px",
        height: "25px",
        margin: "4px",
        borderRadius: "4px",
        backgroundColor: `${color}`,
        cursor: "pointer",
    })

    return (
        <div className="filter-container">

            <form style={block} onSubmit={handleSearchSubmit}>
                <h4 style={blockHeader}>Search:</h4>
                <div className="searchGroup">
                    <input 
                        type="text" 
                        name="search" 
                        className="searchInput" 
                        placeholder="search here ..." 
                        value={search} 
                        onChange={(e)=>setSearch(e.target.value)} 
                    />
                    <button
                        type="submit"
                        className="searchButton" 
                    >
                        {search.length > 0 ? (
                            <i className="fas fa-search" title="search"></i>
                        ) : (
                            <i className="fas fa-sync-alt" title="refresh"></i>
                        )}
                    </button>
                </div>
            </form>

            <div style={block}>
                <h4 style={blockHeader}>Sort by:</h4>
                <ul>
                    <li>
                        <p 
                            className={ sort === "SORT_TIME_DOWN" ? "selected_category" : "" }
                            style={listItem}
                            onClick={(e)=>dispatch(sortTimeDown())}
                        >Latest added</p>
                    </li>
                    <li>
                        <p  
                            className={ sort === "SORT_TIME_UP" ? "selected_category" : "" }
                            style={listItem}
                            onClick={(e)=>dispatch(sortTimeUp())}
                        >Oldest added</p>
                    </li>
                    <li>
                        <p 
                            className={ sort === "SORT_PRICE_UP" ? "selected_category" : "" }
                            style={listItem}
                            onClick={(e)=>dispatch(sortPriceUp())}
                        >Price: Low to High</p>
                    </li>
                    <li>
                        <p 
                            className={ sort === "SORT_PRICE_DOWN" ? "selected_category" : "" }
                            style={listItem}
                            onClick={(e)=>dispatch(sortPriceDown())}
                        >Price: High to Low</p>
                    </li>
                </ul>
            </div>

            <div style={block}>
                <h4 style={blockHeader}>Categories:</h4>
                <ul>
                    { categories.content.length > 0 ? categories.content.map((cat, i) => {
                            if( cat.type === "other" ){
                                return (<li key={i}>
                                    <p 
                                        className={
                                            category === cat.slug 
                                            ? "selected_category" 
                                            : ""
                                        }
                                        style={listItem}
                                        onClick={(e)=>setCategory(cat.slug)}
                                    >{cat.name}</p>
                                </li>)
                            }
                        }
                    ) : ("no categories in this shop")}
                </ul>
            </div>

            <div style={block}>
                <h4 style={blockHeader}>Colors:</h4>
                <ul style={horizontalList}>
                    { categories.content.length > 0 ? categories.content.map((cat, i) => {
                            if( cat.type === "color" ){
                                return (<li key={i}>
                                    <div
                                        className={
                                            category === cat.slug 
                                            ? "selected_color" 
                                            : ""
                                        }
                                        style={listColorItem(cat.name)}
                                        onClick={(e)=>setCategory(cat.slug)}
                                    ></div>
                                </li>)
                            }
                        }
                    ) : ("no colors in this shop")}
                </ul>
            </div>

            <div style={block}>
                <h4 style={blockHeader}>Sizes:</h4>
                <ul style={horizontalList}>
                    { categories.content.length > 0 ? categories.content.map((cat, i) => {
                            if( cat.type === "size" ){
                                return (<li key={i}>
                                    <div
                                        className={
                                            category === cat.slug 
                                            ? "selected_size size-item" 
                                            : "size-item"
                                        }
                                        style={sizeItem}
                                        onClick={(e)=>setCategory(cat.slug)}
                                    >{cat.name}</div>
                                </li>)
                            }
                        }
                    ) : ("no sizes in this shop")}
                </ul>
            </div>

        </div>
    )
}

const block = {
    margin: "0 0 1rem 0",
    width: "100%",
}

const blockHeader = {
    width: "100%",
    borderBottom: "2px solid black",
}

const listItem = {
    cursor: "pointer",
    lineHeight: "2rem",
    marginLeft: "1rem",
}

const horizontalList = {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "6px",
}

const sizeItem = {
    fontSize: 12,
    width: 30,
    height: 30,
    margin: 2,
}

export default Filter