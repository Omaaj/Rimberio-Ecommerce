import React from 'react'
import "./ProductsCard.css";
import { Link, useNavigate } from 'react-router-dom';

export default function ProductsCard({ item, id, img, cat, title, oldprice, price}) {
  return (
    <div>
        <div className="boxss">
          <Link to={`/shop/${id}`}>
              <div>
                  <div className="img_box11" >
                    <img src={img} alt={cat} />
                  </div>
                  <div className="detailed">
                    <h2>{title.length > 20 ? title.substring(0, 20).concat("...") : title}</h2>
                      <div className="prices">
                          <h3>{`${oldprice > 1 ? `$${oldprice}` : ''}`}</h3>
                          <h3 className='h3w'>{`$${price}`}</h3>
                      </div>
                  </div>

              </div>

          </Link>
        </div>
    </div>
  )
}
