import './belt.css'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import BeltList from './BeltList'

const Belt = () => {
    const belt = useSelector( state => state.belt );

    return (
        <div className="ticker-wrap">
            <div className="ticker">
                <div className="belt ticker-belt-1">
                    <BeltList items={belt.content.firstBelt} />
                </div>
                <div className="belt ticker-belt-2">
                    <BeltList items={belt.content.secondBelt} />
                </div>
            </div>
        </div>
    )
}

export default Belt
