import React, { useEffect, useState } from 'react'
import "../styles/product.scss"
import SingleProduct from '../components/SingleProduct'
import Filter from '../components/Filter'
import { getProducts } from '../api/products'


import { Spin } from 'antd';
import Sort from '../components/Sort'

export default function Product() {
    const [products, setProducts] = useState(null)
    const [total, setTotal] = useState(0)
    const [filters, setFilters] = useState({
        min_price: null,
        max_price: null,
        section: null,
        ship_days: null,
        side_diamonds_count: null,
        metal_type: null,
    })
    const [sort, setSort] = useState(null)
    const [isFilterApplied, setIsFilterApplied] = useState(false)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);
        getProducts(filters, sort, page).then(res => {
            if (products) {
                setProducts([...products, ...res?.data?.products])
            } else {
                setProducts(res?.data?.products)
            }

            setTotal(res?.data?.total)
            setHasMore(res?.data?.remainingProducts > 0)

        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false);
        })


    }, [isFilterApplied, sort, page])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if (hasMore && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    const getFilters = (value, key) => {
        if (key === "price") {
            setFilters({
                ...filters,
                min_price: value[0],
                max_price: value[1]
            })
        }
        else {
            setFilters({
                ...filters,
                [key]: value
            })
        }
    }

    const applyFilters = () => {
        setIsFilterApplied(!isFilterApplied)
        setPage(1);
        setProducts([])
    }

    const resetFilters = () => {
        setFilters({
            min_price: null,
            max_price: null,
            section: null,
            ship_days: null,
            side_diamonds_count: null,
            metal_type: null,
        })
        setIsFilterApplied(!isFilterApplied)
        setPage(1);
        setProducts([])
    }

    const sortProducts = () => {
        if (sort === "high") {
            setSort("low")
        }
        else {
            setSort("high")
        }
        setPage(1);
        setProducts([])
    }

    return (
        <div className='product-main'>
            <div className='product-container'>
                <div className='header-container'>
                    <div className='header'>
                        <div className='title'>
                            <div>Shop Wedding Bands</div>
                            <div> & </div>
                            <div>Wedding Rings</div>
                        </div>
                    </div>
                </div>
                {
                    !loading &&
                    <Filter changeHandler={getFilters} filters={filters} applyFilters={applyFilters} resetFilters={resetFilters} />
                }

            </div>
            {
                !loading &&
                <>
                    <Sort sort={sort} sortProducts={sortProducts} />
                    <div className='total'>
                        Total - {total}
                    </div>
                    <div className='products-container'>
                        {
                            products?.map(product => (
                                <SingleProduct product={product} />
                            ))
                        }
                    </div>
                </>
            }
            {
                loading &&
                <div className='loader'>
                    <Spin size='large' />
                </div>
            }
            {
                products?.length === 0 && !loading &&
                <div className='no-data'>
                    <h1>No Data Found</h1>
                </div>
            }


            <div className='circle1'></div>
            <div className='circle2'></div>
            <div className='circle3'></div>
        </div >
    )
}
