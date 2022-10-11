import React from 'react'

const Pagination = ({ productMeta, page, setPage }) => {    
    let pagesNums = []
    for(let i = 1; i <= productMeta.pages_count; i++){
        pagesNums.push(i)
    }

    return ( productMeta.pages_count < 1 ? (<></>) : (
            <div style={container}>
                { pagesNums.map( i => 
                    <div 
                    key={i}
                    className={i === page ? "selected_page page_item" : "page_item"}
                    onClick={() => setPage(i)}
                    >{i}</div>
                )}
            </div>
        ) 
    )
}

const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "60px",
}

export default Pagination