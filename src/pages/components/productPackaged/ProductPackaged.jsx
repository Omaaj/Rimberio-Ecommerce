import React from 'react';
import { Link } from 'react-router-dom';
import "./ProductPackaged.css";
import { display } from './ProductArray';

export default function ProductPackaged() {
  return (
    <div className='card-boxss'>
        {
            display.map((disp) => (
                <div className="card-boxs11" key={disp.id}>
                    <Link to={disp.path}>
                        <div className="titles">{disp.name}</div>
                        <img src={disp.img} alt="" />
                        <p>Shop Now</p>
                    </Link>
                </div>
            ))
        }
    </div>
  );
}