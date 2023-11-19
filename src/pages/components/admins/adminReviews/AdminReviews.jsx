import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { STORE_REVIEWS, selectReviews } from '../../../../redux/slice/reviewSlice';
import "./AdminReviews.css"
import useFetchCollection from '../../../../customHooks/useFetchCollection';

export default function AdminReviews() {
    const {data} = useFetchCollection("reviews");

    const reviews = useSelector(selectReviews);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(STORE_REVIEWS(data))
    },[dispatch, data]);

    return (
        <>
          <div className="tablea">
            <h2>ALL Reviews</h2>
            {
              reviews.length === 0 ? (
                <>
                  <p>No Order found</p>
                </>
              )
              :
              (
                <>
                  <div className="bondings">
                    <table>
                      <thead>
                        <tr>
                          <th>s/n</th>
                          <th>Date</th>
                          <th>PRoduct ID</th>
                          <th>Username</th>
                          <th>Reviews</th>
                          <th>Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          reviews.map((reviewss, index) => {
                            const { productID, reviewDate, rate, review, userName} = reviewss;
                            return(
                              <tr key={productID}>
                                <td>
                                  {index + 1}
                                </td>
                                <td>
                                  {reviewDate}
                                </td>
                                <td>
                                  {productID}
                                </td>
                                <td>
                                  {userName}
                                </td>
                                <td>
                                  {review}
                                </td>
                                <td>
                                  {rate}
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>

                  </div>
                </>
              )
            }
          </div>
        </>
      )
}
