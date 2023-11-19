import React from 'react'
import "./ProductsCard.css";
import { Link, useNavigate } from 'react-router-dom';

export default function ProductsCard({ item, id, img, cat, title, oldprice, price}) {
    // const shortenText = (text, n) => {
    //   if(text.length > n) {
    //     const shortenedText = text.substring(0, n).concat("...");
    //     return shortenedText
    //   }
    //   return text
    // }
    // const navigate = useNavigate()
    // const _id = item.title;
    // const idStrings = (_id) => {
    //     return String(_id).toLowerCase().split(" ").join("");
    // }
    // const rootId  = idStrings(_id);

    // const handleDetails = () => {
    //   navigate(`/shop/${rootId}`,{
    //     state : {
    //       item : item
    //     }
    //   })
    // }
    
  return (
    <div>
        <div className="boxss">
          <Link to={`/shop/${id}`}>
              <div>
                  <div className="img_box11" >
                    <img src={img} alt={cat} />
                  </div>
                  <div className="detailed">
                      <h2>{title}</h2>
                      {/* <h2>{shortenText(title, 20)}</h2> */}
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
