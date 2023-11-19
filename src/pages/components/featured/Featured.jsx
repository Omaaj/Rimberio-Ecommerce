import React from 'react';
import "./Featured.css";
import ProductsCard from '../productsCard/ProductsCard';

export default function Featured({type, products1}) {
    
    return (
        <div className='featuredproducts'>
          <div className="top">
            <h1>{type} products</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor iste tempora laborum aliquid laudantium. Velit a omnis ut eveniet quos corporis, doloremque tempora explicabo! Alias quidem earum eveniet labore deserunt.</p>
          </div>
          <div className="flex">
                {
                    products1.map(item => {
                        return(
                            <ProductsCard key={item.id} product={item} />
                        )
                    })
                }
            </div>
        </div>
      )
}
