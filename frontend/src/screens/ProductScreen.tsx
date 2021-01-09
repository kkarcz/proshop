import React, {memo, useCallback, useState, useEffect} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

interface ProductScreenProps extends RouteComponentProps<{ id: string }> {}

const ProductScreen = ({ match }: ProductScreenProps) => {
    const [product, setProduct] = useState(null);

    const fetchProduct = useCallback(async () => {
        const { data } = await axios.get(`/api/products/${match.params.id}`);
        setProduct(data);
    }, [match])

    useEffect(() => {
        fetchProduct();
    }, [match.params.id]);

    const isButtonDisabled = useCallback(() => {
        return product?.countInStock === 0;
    }, []);

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
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
                            <ListGroupItem>
                                <Button className='btn-block' type='button' disabled={isButtonDisabled()}>
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default memo(ProductScreen);