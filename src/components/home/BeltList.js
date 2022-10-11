import React from 'react';
import {Link} from 'react-router-dom';
import loaderImg from '../../assets/nobg2.png';

const URL = process.env.REACT_APP_API_URL;

const BeltList = ({ items }) => {
    return (
        <>
            { items.map( (item, i) => (
                <Link to={ item && item.slug ? `/products/${item.slug}` : ''} key={i}>
                    <div className="ticker-item">
                        { item && item.image && item.name ? (
                            <img src={ item.image.url } alt={ item.name } />
                        ) : (
                            <img src={loaderImg} alt="wonder which one it is?" className="blur"/>
                        )}
                    </div>
                </Link>
            ))}
        </>
    )
}

export default BeltList
