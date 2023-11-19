import React, { useEffect, useState } from 'react'
import "./WomenFeatured.css";
import Helment from '../../../components/helment/Helment';
import ProductsCard from '../../../components/productsCard/ProductsCard';
import ProductList from '../../../components/productlist/ProductList';
import Search from '../../../components/search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, FITER_BY_CATEGORY, FITER_BY_PRICE, SORT_PRODUCT, selectFilteredProducts } from '../../../../redux/slice/filterSlice';
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../../redux/slice/productSlice';

export default function WomenFeatured({data, Images, number, pages}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("All Products");
  const [price, setPrice] = useState(number);
  const [filterActives, setFilterActives] = useState('combined-filter');
  const [filterToggle, setfilterToggle] = useState("nav-toggle");

  const filteredProducts = useSelector(selectFilteredProducts);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({data, search }))
  },[dispatch, data, search])

  useEffect(() => {
    dispatch(SORT_PRODUCT({data, sort }))
  },[dispatch, data, sort])

  useEffect(() => {
    dispatch(FITER_BY_PRICE({products, price}))
  },[dispatch, products, price])

  const allCategories = [
    "All Products",
    ...new Set(products.map((product) => product.tags))
  ]

  const filterProduct = (cat) => {
    setCategory(cat)
    dispatch(FITER_BY_CATEGORY({data, category: cat}))
  }

  const clearFilters = () => {
    setCategory("All Product");
    setPrice(maxPrice)
  }

  const filterToggles = () => {
    filterActives === 'combined-filter' ? setFilterActives('combined-filter filed') : setFilterActives('combined-filter');
    // navToggle === "nav-toggle" ? setNavToggle("nav-toggle  toggless") : setNavToggle("nav-toggle")
  }


  return (
    <Helment title={pages}>
      <div className='products'>
        <div className="left">
            <div className="sharps">
              <div className="filterItem" >
                <h3>Product Categories</h3>
                <div className="inpuusts">
                  <div className="inputItem">
                    {
                      allCategories.map((catt, index) => {
                        return(
                          <label htmlFor='#products' 
                            key={index}
                            onClick={() => filterProduct(catt)}
                            className={category === catt ? "active" : null}
                          >
                          {catt}</label>

                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className={filterActives}>
                <div className="filterItem1">
                  <h3>Filter by Price</h3>
                  <div className="inputItems">
                    <span>${minPrice}</span>
                    <input 
                      type="range" 
                      min={minPrice}
                      max={maxPrice} 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      name='price' 
                    />
                    <span>${price}</span>
                  </div>
                </div>
                <div className="filterItem2">
                  <h3>Sort by</h3>
                  <select 
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="latest">Latest</option>
                    <option value="lowest-price">Lowest Price</option>
                    <option value="highest-price">Highest Price</option>
                    <option value="a-z">A - Z</option>
                    <option value="z-a">Z - A</option>
                  </select>
                </div>
              </div>
              <div className='filters-slide' onClick={filterToggles}>
                filters
              </div>

              {/* <button onClick={clearFilters}>Clear Filter</button> */}
            </div>
          
        </div>
        <div className="right" id='#products'>
          <div className="image_box">
            <img src={Images} alt="banner" className='catImg' />
          </div>
          <div className="spans">
            <p>
              {/* <span>{filteredProducts.length}</span> */}
              Results</p>
            <Search 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex">
            <ProductList data={data} filteredProducts={filteredProducts}/>
          </div>
        </div>
      </div>
    </Helment>
  )
}
