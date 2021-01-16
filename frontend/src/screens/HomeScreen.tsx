import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product, { IProduct } from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listProducts} from "../actions/productActions";

interface IProductList {
    error: string;
    loading: boolean;
    products: IProduct[];
}

interface IProductDetails {
    error: string;
    loading: boolean;
    product: IProduct;
}

export interface IState {
    productList: IProductList;
    productDetails: IProductDetails;
}

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state: IState) => state.productList);
    const { products, loading, error } = productList;

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    <Row>
                        {
                            products.map((product: IProduct) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}/>
                                </Col>
                            ))
                        }
                    </Row>
            }

        </>
    );
};

export default memo(HomeScreen);