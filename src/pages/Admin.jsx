import React, { useState } from 'react'
import "../styles/admin.scss"
import { Button, Input, notification } from 'antd';
import { DeleteOutlined } from "@ant-design/icons"
import { deleteAllProducts, uploadProducts } from '../api/products';

export default function Admin() {
    const [file, setFile] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const deleteNotification = () => {
        api.open({
            message: 'Products Deleted',
        })
    }

    const uploadProductNotification = () => {
        api.open({
            message: 'Products Uploaded',
        })
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        uploadProducts(formData).then(res => {
            uploadProductNotification()
        }).catch(err => {
            console.log(err)
        })
    };

    const deleteProducts = () => {
        deleteAllProducts().then(res => {
            deleteNotification()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>{contextHolder}
            <div className='product-main admin'>
                <div className='product-container'>
                    <div className='header-container admin-header'>
                        <div className='header'>
                            <div className="title">Uplaod Product</div>

                        </div>
                        <div className='upload-contianer'>
                            <form>
                                <Input type="file" accept=".csv" onChange={handleFileChange} />
                                <Button onClick={handleSubmit}>Upload CSV</Button>

                            </form>
                        </div>
                        <div className='delete-container'>
                            Delete existing products  <span> <DeleteOutlined onClick={deleteProducts} /></span>
                        </div>
                    </div>
                </div>
                <div className='circle1 admin-circle'></div>
            </div>
        </>
    )
}
