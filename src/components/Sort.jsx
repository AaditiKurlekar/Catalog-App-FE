import React from 'react'
import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons"
import { Tooltip } from 'antd'

export default function Sort({ sort, sortProducts }) {
    return (
        <div className='sort-container'>

            <div className='sort'>
                Sort By :
                <Tooltip placement='top' title={sort === "high" && "Descending" || sort === "low" && "Ascending"}>
                    <span onClick={sortProducts}>Price {sort === "high" && <SortAscendingOutlined /> || sort === "low" && <SortDescendingOutlined />}</span>
                </Tooltip>
            </div>

        </div>
    )
}
