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

interface ICart {
    cartItems: ICartItem[];
};

export interface ICartItem {
    productId: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
}

interface IUser {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
}

interface IUserLogin {
    error: string;
    loading: boolean;
    userInfo: IUser;
}

export interface IState {
    productList: IProductList;
    productDetails: IProductDetails;
    cart: ICart;
    userLogin: IUserLogin;
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