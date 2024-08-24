import React from 'react'
import { Button, Select, Slider } from "antd"
import { SendOutlined, RedoOutlined } from "@ant-design/icons"

export default function Filter({ changeHandler, applyFilters, resetFilters, filters }) {
    const genderOptions = [
        { "label": "Mens", "value": "Mens" },
        { "label": "Womens", "value": "Womens" }
    ]
    const metalOptions = [
        { "label": "14k", "value": "14k" },
        { "label": "18k", "value": "18k" },
        { "label": "platinum", "value": "platinum" }
    ]
    const deliveryOptions = [
        { "label": "less than 5 days", value: 5 },
        { "label": "less than 15 days", value: 15 },
        { "label": "less than 30 days", value: 30 }
    ]
    const diamondsOptions = [
        { "label": "greater than 5", value: 5 },
        { "label": "greater than 15", value: 15 },
        { "label": "greater than 20", value: 20 }
    ]
    return (
        <div className='filter-container'>
            <div className='single-filter'>
                <label>Gender</label>
                <Select options={genderOptions} value={filters?.section} onChange={(e) => changeHandler(e, "section")} />
            </div>
            <div className='single-filter'>
                <label>Metal type</label>
                <Select options={metalOptions} value={filters?.metal_type} onChange={(e) => changeHandler(e, "metal_type")} />
            </div>
            <div className='single-filter'>
                <label>Delivery Within</label>
                <Select options={deliveryOptions} value={filters?.ship_days} onChange={(e) => changeHandler(e, "ship_days")} />
            </div>
            <div className='single-filter'>
                <label>Diamonds Count</label>
                <Select options={diamondsOptions} value={filters?.side_diamonds_count} onChange={(e) => changeHandler(e, "side_diamonds_count")} />
            </div>
            <div className='single-filter'>
                <label>Price Range</label>
                <Slider
                    range={{
                        draggableTrack: true,
                    }}
                    value={[filters?.min_price, filters?.max_price]}
                    max={10000}
                    min={500}
                    onChange={(e) => changeHandler(e, "price")}
                />
            </div>
            <div className='button-container'>
                <Button icon={<SendOutlined />} onClick={applyFilters} />
                <Button icon={<RedoOutlined />} onClick={resetFilters} />
            </div>
        </div>
    )
}
