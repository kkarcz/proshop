import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Row, Col, ListGroup, Image, Button, Card, ListGroupItem, FormControl} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from '../actions/cartActions';
import { IState, ICartItem } from './HomeScreen';

interface ICartScreenProps extends RouteComponentProps<{ id: string }> {}

const CartScreen = ({ match, location, history }: ICartScreenProps) => {
    const productId = match.params.id;
    const quantity = parseInt(location?.search?.split('=')[1]) || 1;

    const dispatch = useDispatch();

    const cart = useSelector((state: IState) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity))
        }
    }, [productId, quantity, dispatch]);

    const handleQuantity = useCallback((item: ICartItem) => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(addToCart(item.productId, parseInt(event.target.value)))
    }, [dispatch])

    const chooseQuantity = useCallback((item: ICartItem) => {
        return (
            [...Array(item?.countInStock).keys()].map(option => (
                <option key={option + 1} value={option + 1}>
                    {option + 1}
                </option>
            ))
        )
    }, []);

    const removeFromCartHandler = useCallback((id: string) => {
        dispatch(removeFromCart(id))
    }, [])

    const checkoutHandler = () => {
        history.push(`/login?redirect=shipping`)
    }

    const totalItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.qty, 0), [cartItems]);
    const totalCost = useMemo(() => cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2), [cartItems]);

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> :
                        (
                            <ListGroup variant='flush'>
                                {
                                    cartItems.map(item => (
                                        <ListGroupItem key={item.productId}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={2}>${item.price}</Col>
                                                <Col md={2}>
                                                    <FormControl
                                                        as='select'
                                                        value={item.qty}
                                                        onChange={handleQuantity(item)}
                                                    >
                                                        { chooseQuantity(item) }
                                                    </FormControl>
                                                </Col>
                                                <Col md={2}>
                                                    <Button
                                                        onClick={() => removeFromCartHandler(item.productId)}
                                                        type='button'
                                                        variant='light'
                                                    >
                                                        <i className='fas fa-trash' />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))
                                }
                            </ListGroup>
                        )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Subtotal ({ totalItems }) items</h2>
                            ${ totalCost }
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button
                                onClick={checkoutHandler}
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default memo(CartScreen);