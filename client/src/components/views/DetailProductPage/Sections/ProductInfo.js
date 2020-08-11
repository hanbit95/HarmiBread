import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
function ProductInfo(props) {
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(addToCart(props.detail._id))
        
    }

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Available On">{props.detail.daysAvailable}</Descriptions.Item>
                <Descriptions.Item label="Quantity left">{props.detail.initialQuantity}</Descriptions.Item>
                <Descriptions.Item label="Storing method">{props.detail.storingMethod}</Descriptions.Item>
                <Descriptions.Item label="Expiration">{props.detail.expiration}</Descriptions.Item>
                <Descriptions.Item label="Ingredient">{props.detail.ingredient}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
                <Descriptions.Item label="Category">{props.detail.category}</Descriptions.Item>
            </Descriptions> 

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
