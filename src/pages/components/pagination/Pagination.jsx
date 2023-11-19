import React, { useState } from 'react';
import "./Pagination.css";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function Pagination({currentPage, setCurrentPage, productPerPage, totalProducts}) {
    const pageNumbers = [];
    const totalPages = totalProducts / productPerPage;
    // Limit the page Numbers shown
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    for(let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
        pageNumbers.push(i)
    }

    // Paginate
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    // Go to the next page
    const paginateNext = () => {
        setCurrentPage(currentPage + 1);
        // show Next set of page Numbers
        if(currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }

    }
    // Go to the previous page
    const paginatePrev = () => {
        setCurrentPage(currentPage - 1);
        // show Next set of page Numbers
        if((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }


  return (
    <div className='placer'>
        <ul className='pagination'>
            <li 
                onClick={paginatePrev}
                className={currentPage === pageNumbers[0] ? "hidden" : null}
            >
                <div className="sidePrev">
                    <FaAngleLeft />
                    <span>Prev</span>
                </div>
            </li>
        {
            pageNumbers.map((number) => {
                if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                    return(
                        <li 
                            key={number}
                            onClick={() => paginate(number)}
                            className={currentPage === number ? "actives" : null}
                        >
                            {number}
                        </li>
        
                    )
                }
            })
        }
            <li 
                onClick={paginateNext}
                className={currentPage === pageNumbers[pageNumbers.length - 1] ? "hidden" : null}
            >
                <div className="sideNext">
                    <span>Next</span>
                    <FaAngleRight />
                </div>
            </li>
        </ul>
        <div className='pages'>
            <div className="page"> <span>Page</span>{` ${currentPage}`}</div>
            <span>{` of `}</span>
            <div className="totalpages">{`${Math.ceil(totalPages)}`}</div>
        </div>
    </div>
  )
}
