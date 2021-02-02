import React, { memo, useState, useEffect } from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Form, Button, Row, Col, FormGroup, FormLabel, FormControl} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { IState } from './HomeScreen';

interface ILoginScreenProps extends RouteComponentProps {}

const LoginScreen = ({ location, history }: ILoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector((state: IState) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(login(email, password))
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            { error && <Message variant='danger'>{error}</Message> }
            { loading && <Loader /> }
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='email'>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={handleEmail}
                    />
                </FormGroup>
                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={handlePassword}
                    />
                </FormGroup>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default memo(LoginScreen);