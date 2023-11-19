import React, { useEffect } from 'react'
import Clock from '../clock/Clock'
import { Link } from 'react-router-dom'
import "./Offers.css";
import useFetchCollection from '../../../../customHooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_OFFERS, selectOffers } from '../../../../redux/slice/offersSlice';

export default function Offers() {
    const {data} = useFetchCollection("offer-Products");

    const offers = useSelector(selectOffers);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(STORE_OFFERS(data))
    },[dispatch, data]);


  return (
    <>
        <div className="offers-dis">
            {
                offers.length === 0 ? null
                :
                (
                    <div className='back'>
                        {
                            offers.map((disp) => {
                                const {productId, name, startTime, img} = disp
                                return(
                                    <div className='background' key={productId}>
                                        <div className="left">
                                            <div className="imgbox">
                                                <img src={img} alt="bags" />
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="limit">
                                                <div className="limited">Limited Offers</div>
                                                <div className="limited1">{name}</div>
                                            </div>
                                            <Clock time={startTime}/>
                                            <button>
                                                <Link  className="links" to={`shop/${productId}`}>Shop Now</Link>
                                            </button>
                                        </div>
                                        {/* <div className="left">
                                            <div className="imgbox">
                                                <img src={img} alt="bags" />
                                            </div>
                                        </div> */}
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    
                )
            }
        </div>
    </>
  )
}
