import React from 'react'

export default function SingleProduct({ product }) {
    return (
        <div className='single-product'>
            <div className='product-img'>
                <img src={product?.image} alt="" />
            </div>
            <div className='product-info'>
                <div className='title'>
                    {product?.prod_name}
                </div>
                <div className='info'>
                    <div className='price'>
                        <div>${Number(product?.price) * 2}</div>
                        <div>${product?.price}</div>
                    </div>
                    <div>Metal-{product?.metal_type}</div>
                </div>
                <div className='category'>
                    Ideal For-{product?.prodmeta_section}
                </div>

            </div>
        </div>
    )
}
