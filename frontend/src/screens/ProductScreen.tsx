import React, {memo, useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails, clearProductDetails } from "../actions/productActions";
import { IState } from './HomeScreen';
import Loader from "../components/Loader";
import Message from "../components/Message";

interface IProductScreenProps extends RouteComponentProps<{ id: string }> {}

const ProductScreen = ({ match, history }: IProductScreenProps) => {
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const productDetails = useSelector((state: IState) => state.productDetails);
    const { product, loading, error } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));

        return () => dispatch(clearProductDetails())
    }, [dispatch, match.params.id]);

    const isButtonDisabled = useCallback(() => {
        return product?.countInStock === 0;
    }, [product?.countInStock]);

    const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value))
    }

    const chooseQuantity = useCallback(() => {
        return (
            [...Array(product?.countInStock).keys()].map(option => (
                <option key={option + 1} value={option + 1}>
                    {option + 1}
                </option>
            ))
        )
    }, [product.countInStock])

    const addToCartHandler = useCallback(() => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }, [match.params.id, quantity, history])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                    <Row>
                        <Col md={6}>
                            <Image src={product?.image} alt={product?.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h3>{product?.name}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    Price: ${product?.price}
                                </ListGroupItem>
                                <ListGroupItem>
                                    Price: ${product?.description}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                <strong>${product?.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    {product?.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Quantity</Col>
                                                <Col>
                                                    <FormControl
                                                        as='select'
                                                        value={quantity}
                                                        onChange={handleQuantity}
                                                    >
                                                        { chooseQuantity() }
                                                    </FormControl>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}
                                    <ListGroupItem>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'
                                            disabled={isButtonDisabled()}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }
        </>
    );
};

export default memo(ProductScreen);