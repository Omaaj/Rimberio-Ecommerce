import React from 'react';
import "./FeaturedList.css";
import ProductsCard from '../productsCard/ProductsCard';
import { Link } from 'react-router-dom';

export default function FeaturedList({data}) {
    return (
      <>
        {
          data.length === 0 ? (<p>Loading...</p>)
          :
          (
            <div className='boxshadow'>
              <div className="box">
                {
                  data.map((dat) => {
                    const {productId, img, price, oldPrice, title} = dat
                    return (
                      <Link to={`/shop/${productId}`} key={productId}>
                          <div >
                              <div className="img_box" >
                                <img src={img} alt={title} />
                              </div>
                              <div className="detailed">
                                  <h2>{title}</h2>
                                  {/* <h2>{shortenText(title, 20)}</h2> */}
                                  <div className="prices">
                                      <h3>{`${oldPrice > 1 ? `$${oldPrice}` : ''}`}</h3>
                                      <h3 className='h3w'>{`$${price}`}</h3>
                                  </div>
                              </div>

                          </div>

                      </Link>

                    )
                  })
                }
              </div>
            </div>
          )
        }
  </>
      )
}
